import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsPassworldComponent } from './settings-passworld.component';

describe('SettingsPassworldComponent', () => {
  let component: SettingsPassworldComponent;
  let fixture: ComponentFixture<SettingsPassworldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsPassworldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsPassworldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
