import { TestBed } from '@angular/core/testing';

import { viewforumService } from './viewforum.service';

describe('makeforumService', () => {
  let service: viewforumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(viewforumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
