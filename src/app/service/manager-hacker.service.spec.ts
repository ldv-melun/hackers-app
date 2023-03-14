import { TestBed } from '@angular/core/testing';

import { ManagerHackerService } from './manager-hacker.service';

describe('ManagerHackerService', () => {
  let service: ManagerHackerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagerHackerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
