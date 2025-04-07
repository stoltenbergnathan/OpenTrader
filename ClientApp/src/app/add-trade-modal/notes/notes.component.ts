import { NgFor } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';
import { QuillModule } from 'ngx-quill';

@Component({
    selector: 'addt-modal-notes',
    imports: [QuillModule, ReactiveFormsModule, NgFor, FormsModule],
    templateUrl: './notes.component.html',
})
export class NotesComponent implements OnInit {
    @Input() tradeEntryForm!: FormGroup;
    
    tagEntryControl!: FormControl;

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.tagEntryControl = this.fb.control('');
    }

    get tags(): FormArray {
        return this.tradeEntryForm.get('tags') as FormArray;
    }

    removeTag(index: number) {
        this.tags.removeAt(index);
    }

    addTag() {
        const tag: string = this.tagEntryControl.value?.trim();
        this.tags.push(this.fb.control(tag));
        this.tagEntryControl.reset();
    }
}