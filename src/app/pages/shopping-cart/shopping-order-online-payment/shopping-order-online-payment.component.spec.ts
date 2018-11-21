import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingOrderOnlinePaymentComponent } from './shopping-order-online-payment.component';

describe('ShoppingOrderOnlinePaymentComponent', () => {
  let component: ShoppingOrderOnlinePaymentComponent;
  let fixture: ComponentFixture<ShoppingOrderOnlinePaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingOrderOnlinePaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingOrderOnlinePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
