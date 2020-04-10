import { TestBed } from '@angular/core/testing';

import { StorageProviderService } from './storage-provider.service';

describe('StorageProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StorageProviderService = TestBed.get(StorageProviderService);
    expect(service).toBeTruthy();
  });
});
