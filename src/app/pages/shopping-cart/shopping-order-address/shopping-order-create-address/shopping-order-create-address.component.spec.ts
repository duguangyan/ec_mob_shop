import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingOrderCreateAddressComponent } from './shopping-order-create-address.component';

describe('ShoppingOrderCreateAddressComponent', () => {
  let component: ShoppingOrderCreateAddressComponent;
  let fixture: ComponentFixture<ShoppingOrderCreateAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingOrderCreateAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingOrderCreateAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
