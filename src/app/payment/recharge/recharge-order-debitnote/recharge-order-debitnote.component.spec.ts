import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RechargeOrderDebitnoteComponent } from './recharge-order-debitnote.component';

describe('RechargeOrderDebitnoteComponent', () => {
  let component: RechargeOrderDebitnoteComponent;
  let fixture: ComponentFixture<RechargeOrderDebitnoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RechargeOrderDebitnoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RechargeOrderDebitnoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
