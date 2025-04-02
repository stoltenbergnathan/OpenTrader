import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { Trade, TradeEntry } from '../shared/models/trade.model';
import { HeaderComponent } from './header/header.component';
import { TabComponent } from './tab/tab.component';
import { FooterComponent } from './footer/footer.component';
import { NotesComponent } from './notes/notes.component';
import { FormComponent } from "./form/form.component";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-add-trade-modal',
  imports: [
    NgIf,
    ReactiveFormsModule,
    HeaderComponent,
    TabComponent,
    FooterComponent,
    NotesComponent,
    FormComponent
],
  standalone: true,
  templateUrl: './add-trade-modal.component.html'
})
export class AddTradeModalComponent {
  @Input() tradeEntry!: TradeEntry;
  tradeEntryForm: FormGroup;
  currentTab: number = 0;

  constructor(private fb: FormBuilder) {
    this.tradeEntryForm = this.fb.group({
      type: ['', Validators.required],
      symbol: ['', Validators.required],
      trades: this.fb.array([this.createEmptyTradeRow()]),
      notes: ['']
    });
  }

  ngOnInit() {
    if (this.tradeEntry) {
      this.tradeEntryForm.patchValue(this.tradeEntry);
      const tradesArray = this.tradeEntry.trades.length
        ? this.tradeEntry.trades.map(trade => this.createTradeFormGroup(trade))
        : [this.createEmptyTradeRow()];
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

  switchTab(tab: number) {
    this.currentTab = tab;
  }

  get trades(): FormArray {
    return this.tradeEntryForm.get('trades') as FormArray;
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
