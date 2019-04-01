import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxFilemanagerClientFirebaseComponent } from './ngx-filemanager-client-firebase.component';

describe('NgxFilemanagerClientFirebaseComponent', () => {
  let component: NgxFilemanagerClientFirebaseComponent;
  let fixture: ComponentFixture<NgxFilemanagerClientFirebaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxFilemanagerClientFirebaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxFilemanagerClientFirebaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
