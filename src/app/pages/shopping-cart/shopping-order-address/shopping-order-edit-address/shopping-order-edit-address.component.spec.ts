import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingOrderEditAddressComponent } from './shopping-order-edit-address.component';

describe('ShoppingOrderEditAddressComponent', () => {
  let component: ShoppingOrderEditAddressComponent;
  let fixture: ComponentFixture<ShoppingOrderEditAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingOrderEditAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingOrderEditAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
