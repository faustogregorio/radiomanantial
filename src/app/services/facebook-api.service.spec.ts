import { TestBed } from '@angular/core/testing';

import { FacebookAPIService } from './facebook-api.service';

describe('FacebookAPIService', () => {
  let service: FacebookAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacebookAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
