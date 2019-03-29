import { TestBed } from '@angular/core/testing';

import { NgxFilemanagerCoreService } from './ngx-filemanager-core.service';

describe('NgxFilemanagerCoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxFilemanagerCoreService = TestBed.get(NgxFilemanagerCoreService);
    expect(service).toBeTruthy();
  });
});
