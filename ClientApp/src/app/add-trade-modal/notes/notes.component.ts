import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';

@Component({
    selector: 'addt-modal-notes',
    imports: [QuillModule, ReactiveFormsModule],
    templateUrl: './notes.component.html',
})
export class NotesComponent {
    @Input() tradeEntryForm!: FormGroup;
}