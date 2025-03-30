import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TradeEntry } from './shared/models/trade.model';
import { environment } from '../environments/environment';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TradeService {
  private trades: TradeEntry[] = [];

  constructor(private http: HttpClient) { }

  getTrades(): Observable<TradeEntry[]> {
    return this.http.get<TradeEntry[]>(`${environment.apiUrl}/api/trades`).pipe(
      map(tradeEntries => tradeEntries.map(entry => ({ 
        ...entry, 
        trades: entry.trades.map(trade => ({ ...trade, date: new Date(trade.date) })) 
      })))
    )
  }

  addTrade(trade: TradeEntry): Observable<TradeEntry> {
    const formattedTrade = { ...trade, date: new Date().toISOString() };
    return this.http.post<TradeEntry>(`${environment.apiUrl}/api/trades`, formattedTrade);
  }
}
