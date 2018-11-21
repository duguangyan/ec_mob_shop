import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingOrderPaymentSuccessComponent } from './shopping-order-payment-success.component';

describe('ShoppingOrderPaymentSuccessComponent', () => {
  let component: ShoppingOrderPaymentSuccessComponent;
  let fixture: ComponentFixture<ShoppingOrderPaymentSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingOrderPaymentSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingOrderPaymentSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
