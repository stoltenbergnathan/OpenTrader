import { Component, Input } from '@angular/core';
import { Trade, TradeEntry } from '../shared/models/trade.model';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { TradeService } from '../trade.service';

@Component({
  selector: '[app-simple-trade-view]',
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './simple-trade-view.component.html',
  styleUrl: './simple-trade-view.component.css'
})
export class SimpleTradeViewComponent {
  @Input() tradeEntry!: TradeEntry;

  constructor(private tradeService: TradeService) {}

  get lastTrade(): Trade {
    return this.tradeEntry.trades[this.tradeEntry.trades.length - 1];
  }

  get totalQuantity(): number {
    return this.tradeEntry.trades.reduce((total, trade) => total + trade.quantity, 0);
  }

  get entryTotal(): number {
    return this.tradeEntry.trades.reduce((total, trade) => total + (trade.action === 'buy' ? trade.quantity * trade.price : 0), 0);
  }

  get exitTotal(): number {
    return this.tradeEntry.trades.reduce((total, trade) => total + (trade.action === 'sell' ? trade.quantity * trade.price : 0), 0);
  }

  get profit(): number {
    return this.exitTotal - this.entryTotal;
  }

  deleteTrade() {
    this.tradeService.deleteTrade(this.tradeEntry).subscribe({
      next: (response) => {
        console.log("Deleted trade: ", response)
      },
      error: (error) => {
        console.log("Error: ", error)
      }
    });
  }
}
