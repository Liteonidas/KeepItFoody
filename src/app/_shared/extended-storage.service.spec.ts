import { TestBed } from '@angular/core/testing';

import { ExtendedStorageService } from './extended-storage.service';

describe('ExtendedStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExtendedStorageService = TestBed.get(ExtendedStorageService);
    expect(service).toBeTruthy();
  });
});
