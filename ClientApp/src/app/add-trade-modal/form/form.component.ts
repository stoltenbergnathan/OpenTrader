import { Component, Input } from '@angular/core';
import { DetailsListComponent } from "../details-list/details-list.component";
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'addt-modal-form',
    templateUrl: './form.component.html',
    imports: [DetailsListComponent, ReactiveFormsModule],
})
export class FormComponent {
    @Input() tradeEntryForm!: FormGroup;
}