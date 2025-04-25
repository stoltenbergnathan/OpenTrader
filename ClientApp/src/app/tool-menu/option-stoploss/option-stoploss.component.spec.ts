import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionStoplossComponent } from './option-stoploss.component';

describe('OptionStoplossComponent', () => {
  let component: OptionStoplossComponent;
  let fixture: ComponentFixture<OptionStoplossComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptionStoplossComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OptionStoplossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('stopsAbove', () => {
    it('should return an empty array when optionPrice is not valid', () => {});
    it('should return values in correct order (highest stop first)', () => {});
    it('should calculate values correctly', () => {});
    it('should return an array with one value when incrementsToShow is set to 1', () => {});
  });

  describe('stopsBelow', () => {
    it('should return an empty array when optionPrice is not valid', () => {});
    it('should return values in correct order (lowest stop first)', () => {});
    it('should calculate values correctly', () => {});
    it('should return an array with one value when incrementsToShow is set to 1', () => {});
  });

  describe('hasValidOptionPrice', () => {
    it('should return false when option price is 0', () => {});
    it('should return false when option price is negative', () => {});
    it('should return true when option price is positive', () => {});
  });
});
