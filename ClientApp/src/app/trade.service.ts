import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TradeEntry } from './shared/models/trade.model';
import { environment } from '../environments/environment';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TradeService {
  constructor(private http: HttpClient) { }

  getTrades(): Observable<TradeEntry[]> {
    return this.http.get<TradeEntry[]>(`${environment.apiUrl}/api/trades`).pipe(
      map(tradeEntries => tradeEntries.map(entry => ({ 
        ...entry, 
        trades: entry.trades.map(trade => ({ ...trade, date: new Date(trade.date) })) 
      })))
    )
  }

  addTrade(tradeEntry: TradeEntry): Observable<TradeEntry> {
    const formattedTrade = { ...tradeEntry, date: new Date().toISOString() };
    return this.http.post<TradeEntry>(`${environment.apiUrl}/api/trades`, formattedTrade);
  }

  updateTrade(tradeEntry: TradeEntry): Observable<TradeEntry> {
    const formattedTrade = { ...tradeEntry, date: new Date().toISOString() };
    return this.http.put<TradeEntry>(`${environment.apiUrl}/api/trades/${tradeEntry.id}`, formattedTrade);
  }

  deleteTrade(tradeEntry: TradeEntry): Observable<TradeEntry> {
    const formattedTrade = { ...tradeEntry, date: new Date().toISOString() };
    return this.http.delete<TradeEntry>(`${environment.apiUrl}/api/trades/${tradeEntry.id}`, { body: formattedTrade });
  }
}
