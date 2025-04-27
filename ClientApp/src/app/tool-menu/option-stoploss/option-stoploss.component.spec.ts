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
    it('should return an empty array when optionPrice is not valid', () => {
      component.optionPrice = 0;
      component.stopLossIncrements = 5;
      component.incrementsToShow = 2;

      var stopsAbove = component.stopsAbove;

      expect(stopsAbove.length).toBe(0);
    });
    it('should return values in decending order', () => {
      component.optionPrice = 1;
      component.stopLossIncrements = 5;
      component.incrementsToShow = 2;

      var stopsAbove = component.stopsAbove;

      expect(stopsAbove[0]).toBeGreaterThan(stopsAbove[1]);
    });
    it('should calculate values correctly', () => {
      component.optionPrice = 1;
      component.stopLossIncrements = 5;
      component.incrementsToShow = 2;

      var stopsAbove = component.stopsAbove;

      expect(stopsAbove[0]).toBe(1.1);
      expect(stopsAbove[1]).toBe(1.05);
    });
    it('should return an array with one value when incrementsToShow is set to 1', () => {
      component.optionPrice = 1;
      component.stopLossIncrements = 5;
      component.incrementsToShow = 1;

      var stopsAbove = component.stopsAbove;

      expect(stopsAbove.length).toBe(1);
    });
  });

  describe('stopsBelow', () => {
    it('should return an empty array when optionPrice is not valid', () => {
      component.optionPrice = 0;
      component.stopLossIncrements = 5;
      component.incrementsToShow = 1;

      var stopsBelow = component.stopsBelow;

      expect(stopsBelow.length).toBe(0);
    });
    it('should return values in decending order', () => {
      component.optionPrice = 1;
      component.stopLossIncrements = 5;
      component.incrementsToShow = 2;

      var stopsBelow = component.stopsBelow;

      expect(stopsBelow[0]).toBeGreaterThan(stopsBelow[1]);
    });
    it('should calculate values correctly', () => {
      component.optionPrice = 1;
      component.stopLossIncrements = 5;
      component.incrementsToShow = 2;

      var stopsBelow = component.stopsBelow;

      expect(stopsBelow[0]).toBe(0.95);
      expect(stopsBelow[1]).toBe(0.9);
    });
    it('should return an array with one value when incrementsToShow is set to 1', () => {
      component.optionPrice = 1;
      component.stopLossIncrements = 5;
      component.incrementsToShow = 1;

      var stopsBelow = component.stopsBelow;

      expect(stopsBelow.length).toBe(1);
    });
  });

  describe('hasValidOptionPrice', () => {
    it('should return false when option price is 0', () => {
      component.optionPrice = 0;

      let isValidOptionPrice = component.hasValidOptionPrice();

      expect(isValidOptionPrice).toBe(false);
    });
    it('should return false when option price is negative', () => {
      component.optionPrice = -1;

      let isValidOptionPrice = component.hasValidOptionPrice();

      expect(isValidOptionPrice).toBe(false);
    });
    it('should return true when option price is positive', () => {
      component.optionPrice = 1;

      let isValidOptionPrice = component.hasValidOptionPrice();

      expect(isValidOptionPrice).toBe(true);
    });
  });
});
