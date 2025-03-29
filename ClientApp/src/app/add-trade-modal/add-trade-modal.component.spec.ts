import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTradeModalComponent } from './add-trade-modal.component';

describe('AddTradeModalComponent', () => {
  let component: AddTradeModalComponent;
  let fixture: ComponentFixture<AddTradeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTradeModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTradeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
