import { Component, Input } from '@angular/core';
import { AddTradeModalDetailsListComponent } from "./add-trade-modal-details-list.component";
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-add-trade-modal-form',
    templateUrl: './add-trade-modal-form.component.html',
    imports: [AddTradeModalDetailsListComponent, ReactiveFormsModule],
})
export class AddTradeModalFormComponent {
    @Input() tradeEntryForm!: FormGroup;
}