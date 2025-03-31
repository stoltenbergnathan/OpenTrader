import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { TradeService } from '../trade.service';
import { Trade, TradeEntry } from '../shared/models/trade.model';
import { QuillModule } from 'ngx-quill';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AddTradeModalDetailsListComponent } from './add-trade-modal-details-list.component';
import { AddTradeModalHeaderComponent } from './add-trade-modal-header.component';

@Component({
  selector: 'app-add-trade-modal',
  imports: [ReactiveFormsModule, QuillModule, AddTradeModalDetailsListComponent, AddTradeModalHeaderComponent],
  standalone: true,
  templateUrl: './add-trade-modal.component.html'
})
export class AddTradeModalComponent {
  @Input() tradeEntry!: TradeEntry;
  tradeEntryForm: FormGroup;

  constructor(private fb: FormBuilder, private tradeService: TradeService, private activeModal: NgbActiveModal) {
    this.tradeEntryForm = this.fb.group({
      type: ['', Validators.required],
      symbol: ['', Validators.required],
      trades: this.fb.array([this.createEmptyTradeRow()]), // Ensure at least one trade row
      notes: ['']
    });
  }

  ngOnInit() {
    if (this.tradeEntry) {
      this.tradeEntryForm.patchValue(this.tradeEntry);
      const tradesArray = this.tradeEntry.trades.length
        ? this.tradeEntry.trades.map(trade => this.createTradeFormGroup(trade))
        : [this.createEmptyTradeRow()]; // Ensure at least one trade row
      this.tradeEntryForm.setControl('trades', this.fb.array(tradesArray));
    }
  }

  private formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  createTradeFormGroup(trade: Trade): any {
    return this.fb.group({
      id: [trade.id],
      action: [trade.action, Validators.required],
      date: [this.formatDate(new Date(trade.date)), Validators.required],
      quantity: [trade.quantity, [Validators.required, Validators.min(1)]],
      price: [trade.price, [Validators.required, Validators.min(0)]],
    });
  }

  get trades(): FormArray {
    return this.tradeEntryForm.get('trades') as FormArray;
  }

  submitTradeEntry() {
    if (this.tradeEntryForm.valid) {
      let tradeEntry: TradeEntry = {
        id: this.tradeEntry ? this.tradeEntry.id : 0,
        type: this.tradeEntryForm.value.type,
        symbol: this.tradeEntryForm.value.symbol,
        trades: this.tradeEntryForm.value.trades.map((trade: Trade) => ({
          id: trade.id !== 0 ? trade.id : 0,
          action: trade.action,
          date: new Date(trade.date),
          quantity: trade.quantity,
          price: trade.price
        })),
        notes: this.tradeEntryForm.value.notes,
      };

      if (!this.tradeEntry)
      {
        this.tradeService.addTrade(tradeEntry).subscribe({
          next: (response) => {
            // Handle successful response here
            console.log('Trade entry added successfully:', response);
            this.activeModal.close('Trade entry added');
          }
          , error: (error) => {
            // Handle error response here
            console.error('Error adding trade entry:', error);
            // Optionally, you can show an error message to the user
          }
        });
      }
      else {
        this.tradeService.updateTrade(tradeEntry).subscribe({
          next: (response) => {
            // Handle successful response here
            console.log('Trade entry updated successfully:', response);
            this.activeModal.close('Trade entry updated');
          }
          , error: (error) => {
            // Handle error response here
            console.error('Error adding trade entry:', error);
            // Optionally, you can show an error message to the user
          }
        });       
      }
    }
  }

  cancel() {
    this.tradeEntryForm.reset();
    this.activeModal.dismiss('Cross click');
  }

  private createEmptyTradeRow() {
    return this.fb.group({
      id: [0],
      action: ['', Validators.required],
      date: [this.formatDate(new Date(Date.now())), Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(0)]],
    });
  }
}
