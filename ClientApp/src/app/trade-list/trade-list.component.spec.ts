import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeListComponent } from './trade-list.component';
import { BehaviorSubject, EMPTY, of } from 'rxjs';
import { TradeEntry } from '../shared/models/trade.model';
import { TradeService } from '../trade.service';

class MockTradeService {
  tradeEntries$ = new BehaviorSubject<TradeEntry[]>([]);

  getTrades = jasmine.createSpy('getTrades').and.returnValue(of(EMPTY));
}

describe('TradeListComponent', () => {
  let component: TradeListComponent;
  let fixture: ComponentFixture<TradeListComponent>;
  let mockTradeService: MockTradeService;

  beforeEach(async () => {
    const tradeServiceInstance = new MockTradeService();

    await TestBed.configureTestingModule({
      imports: [TradeListComponent],
      providers: [{ provide: TradeService, useValue: tradeServiceInstance }],
    }).compileComponents();

    fixture = TestBed.createComponent(TradeListComponent);
    component = fixture.componentInstance;
    mockTradeService = TestBed.inject(
      TradeService
    ) as unknown as MockTradeService;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
