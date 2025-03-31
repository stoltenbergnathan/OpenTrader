import { Component, inject } from '@angular/core';
import { TradeEntry } from '../shared/models/trade.model';
import { TradeService } from '../trade.service';
import { NgFor } from '@angular/common';
import { SimpleTradeViewComponent } from '../simple-trade-view/simple-trade-view.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddTradeModalComponent } from '../add-trade-modal/add-trade-modal.component';

@Component({
  selector: 'app-trade-list',
  imports: [NgFor, SimpleTradeViewComponent],
  templateUrl: './trade-list.component.html',
  styleUrl: './trade-list.component.css'
})
export class TradeListComponent {
  private modalService = inject(NgbModal);

  tradeEntries: TradeEntry[] = [];
  constructor(private tradeService: TradeService) { }

  ngOnInit() {
    this.tradeService.tradeEntries$.subscribe(tradeEntries => {
      this.tradeEntries = tradeEntries
    });
    this.tradeService.getTrades().subscribe();
  }

  onTradeClick(trade: TradeEntry) {
    const modalRef = this.modalService.open(AddTradeModalComponent, { size: 'lg' });
    modalRef.componentInstance.tradeEntry = trade;
  }
}
