import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { TradeService } from '../trade.service';
import { Trade, TradeEntry } from '../shared/models/trade.model';
import { QuillModule } from 'ngx-quill';
import { NgFor } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-trade-modal',
  imports: [ReactiveFormsModule, QuillModule, NgFor],
  standalone: true,
  templateUrl: './add-trade-modal.component.html',
  styleUrl: './add-trade-modal.component.css'
})
export class AddTradeModalComponent {
  activeModal = inject(NgbActiveModal);

  @Input() tradeEntry!: TradeEntry;
  tradeEntryForm: FormGroup;

  constructor(private fb: FormBuilder, private tradeService: TradeService) {
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

  createTradeFormGroup(trade: Trade): any {
    const formatDate = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    return this.fb.group({
      action: [trade.action, Validators.required],
      date: [formatDate(new Date(trade.date)), Validators.required],
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
        id: -1,
        type: this.tradeEntryForm.value.type,
        symbol: this.tradeEntryForm.value.symbol,
        trades: this.tradeEntryForm.value.trades.map((trade: Trade) => ({
          action: trade.action,
          date: new Date(trade.date).toISOString(),
          quantity: trade.quantity,
          price: trade.price
        })),
        notes: this.tradeEntryForm.value.notes,
      };

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
  }

  cancel() {
    this.tradeEntryForm.reset();
    this.activeModal.dismiss('Cross click');
  }

  addTradeRow() {
    this.trades.push(this.createEmptyTradeRow());
  }

  removeTradeRow(index: number) {
    this.trades.removeAt(index);
  }

  private createEmptyTradeRow() {
    return this.fb.group({
      action: ['', Validators.required],
      date: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(0)]],
    });
  }
}
