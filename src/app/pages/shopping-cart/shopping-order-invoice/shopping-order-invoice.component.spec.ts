import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingOrderInvoiceComponent } from './shopping-order-invoice.component';

describe('ShoppingOrderInvoiceComponent', () => {
  let component: ShoppingOrderInvoiceComponent;
  let fixture: ComponentFixture<ShoppingOrderInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingOrderInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingOrderInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
