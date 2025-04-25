import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionStoplossComponent } from './option-stoploss.component';

describe('OptionStoplossComponent', () => {
  let component: OptionStoplossComponent;
  let fixture: ComponentFixture<OptionStoplossComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptionStoplossComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptionStoplossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
