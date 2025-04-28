import { TestBed } from '@angular/core/testing';

import { TradeService } from './trade.service';
import { HttpClient } from '@angular/common/http';

describe('TradeService', () => {
  let service: TradeService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      providers: [
        TradeService,
        { provide: HttpClient, useValue: httpClientSpy },
      ],
    });
    service = TestBed.inject(TradeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
