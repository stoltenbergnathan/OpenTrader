import { NgFor, NgIf } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  ElementRef,
  HostListener,
  ViewChild,
  OnDestroy,
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
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'addt-modal-notes',
  imports: [QuillModule, ReactiveFormsModule, NgFor, NgIf, FormsModule],
  templateUrl: './notes.component.html',
})
export class NotesComponent implements OnInit, OnDestroy {
  @Input() tradeEntryForm!: FormGroup;

  tagEntryControl!: FormControl;
  existingTags: Tag[] = [];
  filteredTags: Tag[] = [];
  showTagSuggestions = false;

  @ViewChild('tagInputContainer') tagInputContainer!: ElementRef;

  private readonly destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder, private tagService: TagService) {}

  ngOnInit(): void {
    this.tagEntryControl = this.fb.control('');

    this.tagService.tradeEntries$.subscribe((returnedTags) => {
      this.existingTags = returnedTags;
    });
    this.tagService.getTags().subscribe();

    this.tagEntryControl.valueChanges
      .pipe(debounceTime(200), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe(() => this.filterAvailableTags());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
    this.filterAvailableTags();
    this.showTagSuggestions = true;
  }

  selectTag(tag: Tag) {
    this.addTag(tag.name);
    this.showTagSuggestions = false;
  }

  private filterAvailableTags() {
    const searchTerm = this.tagEntryControl.value?.toLowerCase() || '';
    this.filteredTags = this.existingTags.filter((tag) => {
      const alreadyAdded = this.tags.controls.some(
        (currentTagControl) =>
          currentTagControl.get('name')?.value?.toLowerCase() ===
          tag.name.toLowerCase()
      );
      const matchesSearchTerm = tag.name.toLowerCase().includes(searchTerm);
      return !alreadyAdded && matchesSearchTerm;
    });
  }
}
