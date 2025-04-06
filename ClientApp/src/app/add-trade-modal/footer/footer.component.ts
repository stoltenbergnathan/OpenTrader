import { Component, Input } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Trade, TradeEntry } from '../../shared/models/trade.model';
import { TradeService } from '../../trade.service';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AddTradeModalComponent } from '../add-trade-modal.component';
import { NgIf } from '@angular/common';

@Component({
    selector: 'addt-modal-footer',
    imports: [MatDialogModule, NgIf],
    templateUrl: './footer.component.html'
})
export class FooterComponent {
    @Input() tradeEntry!: TradeEntry;
    @Input() tradeEntryForm!: FormGroup;

    constructor(private tradeService: TradeService, private dialog: MatDialogRef<AddTradeModalComponent>) { }

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
            tags: []
            };

            if (!this.tradeEntry)
            {
            this.tradeService.addTrade(tradeEntry).subscribe({
                next: (response) => {
                    console.log('Trade entry added successfully:', response);
                    this.dialog.close('Trade entry added');
                },
                error: (error) => {
                    console.error('Error updating trade entry:', error);
                }
            });
            }
            else {
            this.tradeService.updateTrade(tradeEntry).subscribe({
                next: (response) => {
                    console.log('Trade entry updated successfully:', response);
                    this.dialog.close('Trade entry updated');
                },
                error: (error) => {
                    console.error('Error adding trade entry:', error);
                }
            });       
            }
        }
    }

    cancel() {
        this.tradeEntryForm.reset();
        this.dialog.close();
    }
}