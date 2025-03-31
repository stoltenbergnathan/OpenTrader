import { Component, Input } from '@angular/core';
import { Trade, TradeEntry } from '../shared/models/trade.model';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { TradeService } from '../trade.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';

@Component({
  selector: '[app-simple-trade-view]',
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './simple-trade-view.component.html',
  styleUrl: './simple-trade-view.component.css'
})
export class SimpleTradeViewComponent {
  @Input() tradeEntry!: TradeEntry;

  constructor(private tradeService: TradeService, private modalService: NgbModal) {}

  get lastTrade(): Trade {
    return this.tradeEntry.trades[this.tradeEntry.trades.length - 1];
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
    return this.exitTotal - this.entryTotal;
  }

  deleteTrade() {
    const modalRef = this.modalService.open(ConfirmationModalComponent);
    modalRef.componentInstance.confirmationText = "Are you sure you want to delete this trade?";

    modalRef.closed.subscribe((reason) => {
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
