import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxFilemanagerCoreComponent } from './ngx-filemanager-core.component';

describe('NgxFilemanagerCoreComponent', () => {
  let component: NgxFilemanagerCoreComponent;
  let fixture: ComponentFixture<NgxFilemanagerCoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxFilemanagerCoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxFilemanagerCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
