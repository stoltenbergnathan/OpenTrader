import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleTradeViewComponent } from './simple-trade-view.component';

describe('SimpleTradeViewComponent', () => {
  let component: SimpleTradeViewComponent;
  let fixture: ComponentFixture<SimpleTradeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimpleTradeViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleTradeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
