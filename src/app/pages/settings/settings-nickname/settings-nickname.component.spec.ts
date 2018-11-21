import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsNicknameComponent } from './settings-nickname.component';

describe('SettingsNicknameComponent', () => {
  let component: SettingsNicknameComponent;
  let fixture: ComponentFixture<SettingsNicknameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsNicknameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsNicknameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
