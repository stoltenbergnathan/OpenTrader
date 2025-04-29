import { NgFor, NgIf } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  FormsModule,
  FormControl,
} from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { Tag } from '../../shared/models/trade.model';
import { TagService } from '../../tag-service';

@Component({
  selector: 'addt-modal-notes',
  imports: [QuillModule, ReactiveFormsModule, NgFor, NgIf, FormsModule],
  templateUrl: './notes.component.html',
})
export class NotesComponent implements OnInit {
  @Input() tradeEntryForm!: FormGroup;

  tagEntryControl!: FormControl;
  existingTags: Tag[] = [];
  filteredTags: Tag[] = [];
  showTagSuggestions = false;

  @ViewChild('tagInputContainer') tagInputContainer!: ElementRef;

  constructor(private fb: FormBuilder, private tagService: TagService) {}

  ngOnInit(): void {
    this.tagEntryControl = this.fb.control('');

    this.tagService.tradeEntries$.subscribe((returnedTags) => {
      this.existingTags = returnedTags;
    });
    this.tagService.getTags().subscribe();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.showTagSuggestions) return;

    if (
      this.tagInputContainer &&
      !this.tagInputContainer.nativeElement.contains(event.target)
    ) {
      this.showTagSuggestions = false;
    }
  }

  get tags(): FormArray {
    return this.tradeEntryForm.get('tags') as FormArray;
  }

  removeTag(index: number) {
    this.tags.removeAt(index);
  }

  onAddTag() {
    const tagName: string = this.tagEntryControl.value?.trim();
    this.addTag(tagName);
  }

  addTag(tagName: string) {
    const existingTag: Tag | undefined = this.existingTags.find(
      (tag) => tag.name === tagName
    );
    if (existingTag) {
      this.tags.push(
        this.fb.group({
          id: [existingTag.id],
          name: [existingTag.name],
        })
      );
    } else {
      this.tags.push(
        this.fb.group({
          id: [0],
          name: [tagName],
        })
      );
    }
    this.tagEntryControl.reset();
    this.showTagSuggestions = false;
  }

  onTagSuggestionsFocus() {
    this.filteredTags = this.existingTags.filter(
      (tag) =>
        !this.tags.controls.some(
          (current_tag) => current_tag.get('name')?.value === tag.name
        )
    );
    this.showTagSuggestions = true;
  }

  selectTag(tag: Tag) {
    this.addTag(tag.name);
    this.showTagSuggestions = false;
  }
}
