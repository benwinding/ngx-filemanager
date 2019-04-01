import { TestBed } from '@angular/core/testing';

import { NgxFilemanagerClientFirebaseService } from './ngx-filemanager-client-firebase.service';

describe('NgxFilemanagerClientFirebaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxFilemanagerClientFirebaseService = TestBed.get(NgxFilemanagerClientFirebaseService);
    expect(service).toBeTruthy();
  });
});
