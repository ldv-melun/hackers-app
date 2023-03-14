import { TestBed } from '@angular/core/testing';

import { LookupIpService } from './lookup-ip.service';

describe('LookupIpService', () => {
  let service: LookupIpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LookupIpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
