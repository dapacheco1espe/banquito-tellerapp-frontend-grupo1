import { TestBed } from '@angular/core/testing';

import { TransferencesService } from './transferences.service';

describe('TransferencesService', () => {
  let service: TransferencesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransferencesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
