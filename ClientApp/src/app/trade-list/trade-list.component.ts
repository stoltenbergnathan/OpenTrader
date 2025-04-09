import { Component } from '@angular/core';
import { TradeEntry } from '../shared/models/trade.model';
import { TradeService } from '../trade.service';
import { NgFor } from '@angular/common';
import { SimpleTradeViewComponent } from '../simple-trade-view/simple-trade-view.component';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { AddTradeModalComponent } from '../add-trade-modal/add-trade-modal.component';

@Component({
  selector: 'app-trade-list',
  imports: [NgFor, SimpleTradeViewComponent, MatDialogModule],
  templateUrl: './trade-list.component.html'
})
export class TradeListComponent {
  tradeEntries: TradeEntry[] = [];
  constructor(private tradeService: TradeService, private dialog: MatDialog) { }

  ngOnInit() {
    this.tradeService.tradeEntries$.subscribe(tradeEntries => {
      this.tradeEntries = tradeEntries
    });
    this.tradeService.getTrades().subscribe();
  }

  onTradeClick(trade: TradeEntry) {
    const modalRef = this.dialog.open(AddTradeModalComponent, {width: '60%', maxWidth: 'none'});
    modalRef.componentInstance.tradeEntry = trade;
  }
}
