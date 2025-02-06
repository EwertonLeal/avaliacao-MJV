import { TestBed } from '@angular/core/testing';

import { DummyapiService } from './dummyapi.service';

describe('DummyapiService', () => {
  let service: DummyapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DummyapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
