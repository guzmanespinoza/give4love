import { TestBed } from '@angular/core/testing';

import { ApiPartnerService } from './api-partner.service';

describe('ApiPartnerService', () => {
  let service: ApiPartnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiPartnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
