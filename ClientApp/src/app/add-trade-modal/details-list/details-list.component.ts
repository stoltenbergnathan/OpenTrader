import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import {  FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TooltipComponent } from "../../shared/tooltip/tooltip.component";

@Component({
    selector: 'addt-modal-details-list',
    imports: [NgFor, NgIf, ReactiveFormsModule, TooltipComponent],
    templateUrl: './details-list.component.html'
})
export class DetailsListComponent {
    @Input() tradeEntryForm!: FormGroup;

    constructor(private fb: FormBuilder) {}

    get trades(): FormArray {
        return this.tradeEntryForm.get('trades') as FormArray
    }

    removeTradeRow(index: number) {
        this.trades.removeAt(index);
    }
    
    addTradeRow() {
        this.trades.push(this.createEmptyTradeRow());
    }

    private formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

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