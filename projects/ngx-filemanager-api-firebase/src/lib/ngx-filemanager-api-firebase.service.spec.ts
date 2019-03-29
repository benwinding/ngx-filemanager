import { TestBed } from '@angular/core/testing';

import { NgxFilemanagerApiFirebaseService } from './ngx-filemanager-api-firebase.service';

describe('NgxFilemanagerApiFirebaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxFilemanagerApiFirebaseService = TestBed.get(NgxFilemanagerApiFirebaseService);
    expect(service).toBeTruthy();
  });
});
