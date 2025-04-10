import { TestBed } from '@angular/core/testing';

import { SeriveService } from './serive.service';

describe('SeriveService', () => {
  let service: SeriveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeriveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
