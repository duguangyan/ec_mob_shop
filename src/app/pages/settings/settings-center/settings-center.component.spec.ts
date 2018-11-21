import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsCenterComponent } from './settings-center.component';

describe('SettingsCenterComponent', () => {
  let component: SettingsCenterComponent;
  let fixture: ComponentFixture<SettingsCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
