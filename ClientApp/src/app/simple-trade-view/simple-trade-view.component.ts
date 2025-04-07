import { Component, Input } from '@angular/core';
import { Trade, TradeEntry } from '../shared/models/trade.model';
import { CurrencyPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { TradeService } from '../trade.service';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';

@Component({
  selector: '[app-simple-trade-view]',
  imports: [DatePipe, CurrencyPipe, MatDialogModule, NgFor, NgIf],
  templateUrl: './simple-trade-view.component.html'
})
export class SimpleTradeViewComponent {
  @Input() tradeEntry!: TradeEntry;

  constructor(private tradeService: TradeService, private dialog: MatDialog) {}

  get lastTrade(): Trade {
    return this.tradeEntry.trades[this.tradeEntry.trades.length - 1];
  }

  get tags(): string[] {
    return this.tradeEntry.tags.map(t => t.name);
  }

  get totalQuantity(): number {
    return this.tradeEntry.trades.reduce((total, trade) => {
      if (trade.action === "buy")
      {
        return total + trade.quantity 
      }
      else
      {
        return total - trade.quantity
      }
    }, 0);
  }

  get entryTotal(): number {
    return this.tradeEntry.trades.reduce((total, trade) => total + (trade.action === 'buy' ? trade.quantity * trade.price : 0), 0);
  }

  get exitTotal(): number {
    return this.tradeEntry.trades.reduce((total, trade) => total + (trade.action === 'sell' ? trade.quantity * trade.price : 0), 0);
  }

  get profit(): number {
    const difference = this.exitTotal - this.entryTotal;
    if (this.tradeEntry.type === 'stock')
      return difference;
    else
      return difference * 100;
  }

  deleteTrade() {
    const modalRef = this.dialog.open(ConfirmationModalComponent);
    modalRef.componentInstance.confirmationText = "Are you sure you want to delete this trade?";

    modalRef.afterClosed().subscribe((reason) => {
      if (reason === "confirm")
      {
        this.tradeService.deleteTrade(this.tradeEntry).subscribe({
          next: (response) => {
            console.log("Deleted trade: ", response)
          },
          error: (error) => {
            console.log("Error: ", error)
          }
        });
      }
    });
  }
}
