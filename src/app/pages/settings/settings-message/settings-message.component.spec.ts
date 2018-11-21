import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsMessageComponent } from './settings-message.component';

describe('SettingsMessageComponent', () => {
  let component: SettingsMessageComponent;
  let fixture: ComponentFixture<SettingsMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
