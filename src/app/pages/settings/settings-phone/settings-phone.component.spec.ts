import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsPhoneComponent } from './settings-phone.component';

describe('SettingsPhoneComponent', () => {
  let component: SettingsPhoneComponent;
  let fixture: ComponentFixture<SettingsPhoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsPhoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
