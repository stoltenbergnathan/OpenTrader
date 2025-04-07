import { NgFor } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { Tag } from '../../shared/models/trade.model';
import { TagService } from '../../tag-service';

@Component({
    selector: 'addt-modal-notes',
    imports: [QuillModule, ReactiveFormsModule, NgFor, FormsModule],
    templateUrl: './notes.component.html',
})
export class NotesComponent implements OnInit {
    @Input() tradeEntryForm!: FormGroup;
    
    tagEntryControl!: FormControl;
    existingTags: Tag[] = [];

    constructor(private fb: FormBuilder, private tagService: TagService) {}

    ngOnInit(): void {
        this.tagEntryControl = this.fb.control('');

        this.tagService.tradeEntries$.subscribe(tags => {
            this.existingTags = tags;
        });
        this.tagService.getTags().subscribe();
    }

    get tags(): FormArray {
        return this.tradeEntryForm.get('tags') as FormArray;
    }

    removeTag(index: number) {
        this.tags.removeAt(index);
    }

    addTag() {
        const tagName: string = this.tagEntryControl.value?.trim();
        const existingTag: Tag | undefined = this.existingTags.find(tag => tag.name === tagName);
        if (existingTag)
        {
            this.tags.push(this.fb.group({
                id: [existingTag.id],
                name: [existingTag.name]
            }));
        }
        else
        {
            this.tags.push(this.fb.group({
                id: [0],
                name: [tagName]
            }));  
        }
        this.tagEntryControl.reset();
    }
}