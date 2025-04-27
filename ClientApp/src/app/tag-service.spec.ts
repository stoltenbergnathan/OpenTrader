import { TestBed } from '@angular/core/testing';

import { TagService } from './tag-service';
import { HttpClient } from '@angular/common/http';

describe('TagService', () => {
  let service: TagService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      providers: [TagService, { provide: HttpClient, useValue: httpClientSpy }],
    });
    service = TestBed.inject(TagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
