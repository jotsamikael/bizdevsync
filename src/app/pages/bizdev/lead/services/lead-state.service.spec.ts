import { TestBed } from '@angular/core/testing';

import { LeadStateService } from './lead-state.service';

describe('LeadStateService', () => {
  let service: LeadStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeadStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
