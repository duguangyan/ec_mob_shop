import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WxLoginCallbackComponent } from './wx-login-callback.component';

describe('WxLoginCallbackComponent', () => {
  let component: WxLoginCallbackComponent;
  let fixture: ComponentFixture<WxLoginCallbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WxLoginCallbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WxLoginCallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
