import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TradeEntry } from './shared/models/trade.model';
import { environment } from '../environments/environment';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TradeService {
  private tradeEntries: TradeEntry[] = [];
  private tradeEntrySubject  = new BehaviorSubject<TradeEntry[]>(this.tradeEntries);

  tradeEntries$ = this.tradeEntrySubject.asObservable();

  constructor(private http: HttpClient) { }

  getTrades(): Observable<TradeEntry[]> {
    return this.http.get<TradeEntry[]>(`${environment.apiUrl}/api/trades`)
      .pipe(
        map(tradeEntries => tradeEntries.map(entry => ({ 
          ...entry, 
          trades: entry.trades.map(trade => ({ ...trade, date: new Date(new Date(trade.date).toLocaleString()) })) 
        }))),
        tap(tradeEntries => {
          this.tradeEntries = tradeEntries;
          this.tradeEntrySubject.next(this.tradeEntries);
        })
      );
  }

  addTrade(tradeEntry: TradeEntry): Observable<TradeEntry> {
    return this.http.post<TradeEntry>(`${environment.apiUrl}/api/trades`, tradeEntry)
    .pipe(
      tap((addedTradeEntry) => {
        this.tradeEntries.push(addedTradeEntry);
        this.tradeEntrySubject.next([...this.tradeEntries]);
      })
    );
  }

  updateTrade(tradeEntry: TradeEntry): Observable<TradeEntry> {
    return this.http.put<TradeEntry>(`${environment.apiUrl}/api/trades/${tradeEntry.id}`, tradeEntry)
    .pipe(
      tap((updatedTradeEntry) => {
        this.tradeEntries = this.tradeEntries.map((tradeEntry) => {
          if (tradeEntry.id === updatedTradeEntry.id)
          {
            return updatedTradeEntry;
          }
          else
          {
            return tradeEntry;
          }
        });
        this.tradeEntrySubject.next([...this.tradeEntries]);
      })
    );
  }

  deleteTrade(tradeEntry: TradeEntry): Observable<TradeEntry> {
    return this.http.delete<TradeEntry>(`${environment.apiUrl}/api/trades/${tradeEntry.id}`, { body: tradeEntry })
    .pipe(
      tap((deletedTradeEntry) => {
        this.tradeEntries = this.tradeEntries.filter((tradeEntry) => tradeEntry.id !== deletedTradeEntry.id);
        this.tradeEntrySubject.next([...this.tradeEntries]);
      })
    );
  }
}
