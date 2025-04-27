import { Component } from '@angular/core';
import { TradeEntry } from '../shared/models/trade.model';
import { TradeService } from '../trade.service';
import { NgFor, NgIf } from '@angular/common';
import { SimpleTradeViewComponent } from '../simple-trade-view/simple-trade-view.component';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-trade-list',
  standalone: true,
  imports: [NgFor, NgIf, SimpleTradeViewComponent, MatDialogModule],
  templateUrl: './trade-list.component.html',
})
export class TradeListComponent {
  tradeEntries: TradeEntry[] = [];
  constructor(private tradeService: TradeService) {}

  ngOnInit() {
    this.tradeService.tradeEntries$.subscribe((tradeEntries) => {
      this.tradeEntries = tradeEntries;
    });
    this.tradeService.getTrades().subscribe();
  }
}
