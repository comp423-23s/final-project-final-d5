import { TestBed } from '@angular/core/testing';

import { GetforumService } from './getforum.service';

describe('GetforumService', () => {
  let service: GetforumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetforumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
