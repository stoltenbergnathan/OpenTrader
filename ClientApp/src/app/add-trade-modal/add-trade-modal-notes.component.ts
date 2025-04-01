import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';

@Component({
    selector: 'app-add-trade-modal-notes',
    imports: [QuillModule, ReactiveFormsModule],
    templateUrl: './add-trade-modal-notes.component.html',
})
export class AddTradeModalNotesComponent {
    @Input() tradeEntryForm!: FormGroup;
}