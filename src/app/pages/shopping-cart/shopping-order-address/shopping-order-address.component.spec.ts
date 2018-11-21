import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingOrderAddressComponent } from './shopping-order-address.component';

describe('ShoppingOrderAddressComponent', () => {
  let component: ShoppingOrderAddressComponent;
  let fixture: ComponentFixture<ShoppingOrderAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingOrderAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingOrderAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
