import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleTradeViewComponent } from './simple-trade-view.component';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, EMPTY, of } from 'rxjs';
import { TradeEntry } from '../shared/models/trade.model';
import { TradeService } from '../trade.service';

class MockTradeService {
  tradeEntries$ = new BehaviorSubject<TradeEntry[]>([]);

  getTrades = jasmine.createSpy('getTrades').and.returnValue(of(EMPTY));
}

describe('SimpleTradeViewComponent', () => {
  let component: SimpleTradeViewComponent;
  let fixture: ComponentFixture<SimpleTradeViewComponent>;
  let dialogMock = jasmine.createSpyObj('MatDialog', ['open']);
  let mockTradeService: MockTradeService;

  const mockTradeEntry: TradeEntry = {
    id: 1,
    symbol: 'TEST',
    type: 'stock',
    trades: [{ action: 'buy', id: 1, date: new Date(), price: 1, quantity: 1 }],
    tags: [],
    notes: '',
  };

  beforeEach(async () => {
    const tradeServiceInstance = new MockTradeService();

    await TestBed.configureTestingModule({
      imports: [SimpleTradeViewComponent],
      providers: [
        { provide: MatDialog, useValue: dialogMock },
        { provide: TradeService, useValue: tradeServiceInstance },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SimpleTradeViewComponent);
    component = fixture.componentInstance;

    component.tradeEntry = mockTradeEntry;

    mockTradeService = TestBed.inject(
      TradeService
    ) as unknown as MockTradeService;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
