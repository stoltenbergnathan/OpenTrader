import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTradeModalComponent } from './add-trade-modal.component';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TradeEntry } from '../shared/models/trade.model';
import { HeaderComponent } from './header/header.component';
import { TabComponent } from './tab/tab.component';
import { FooterComponent } from './footer/footer.component';
import { NotesComponent } from './notes/notes.component';
import { FormComponent } from './form/form.component';
import { CommonModule } from '@angular/common';

// Create a mock component for FormComponent
@Component({
  selector: 'addt-modal-header',
  template: '',
  standalone: true,
})
class MockHeaderComponent implements Partial<HeaderComponent> {}

@Component({
  selector: 'addt-modal-tab',
  template: '',
  standalone: true,
})
class MockTabComponent implements Partial<TabComponent> {
  @Output() switchTabEvent = new EventEmitter<number>();
}

@Component({
  selector: 'addt-modal-footer',
  template: '',
  standalone: true,
})
class MockFooterComponent implements Partial<FooterComponent> {
  @Input() tradeEntry!: TradeEntry;
  @Input() tradeEntryForm!: FormGroup;
}

@Component({
  selector: 'addt-modal-notes',
  template: '',
  standalone: true,
})
class MockNotesComponent implements Partial<NotesComponent> {
  @Input() tradeEntryForm!: FormGroup;
}

@Component({
  selector: 'addt-modal-form',
  template: '',
  standalone: true,
})
class MockFormComponent implements Partial<FormComponent> {
  @Input() tradeEntryForm!: FormGroup;
}

describe('AddTradeModalComponent', () => {
  let component: AddTradeModalComponent;
  let fixture: ComponentFixture<AddTradeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTradeModalComponent],
    }).compileComponents();

    TestBed.overrideComponent(AddTradeModalComponent, {
      set: {
        imports: [
          CommonModule,
          MockHeaderComponent,
          MockTabComponent,
          MockFooterComponent,
          MockNotesComponent,
          MockFormComponent,
        ],
      },
    });

    fixture = TestBed.createComponent(AddTradeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
