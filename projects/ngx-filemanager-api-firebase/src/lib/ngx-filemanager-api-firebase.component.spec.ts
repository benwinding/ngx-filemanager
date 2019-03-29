import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxFilemanagerApiFirebaseComponent } from './ngx-filemanager-api-firebase.component';

describe('NgxFilemanagerApiFirebaseComponent', () => {
  let component: NgxFilemanagerApiFirebaseComponent;
  let fixture: ComponentFixture<NgxFilemanagerApiFirebaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxFilemanagerApiFirebaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxFilemanagerApiFirebaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
