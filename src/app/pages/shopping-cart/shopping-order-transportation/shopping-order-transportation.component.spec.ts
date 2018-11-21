import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingOrderTransportationComponent } from './shopping-order-transportation.component';

describe('ShoppingOrderTransportationComponent', () => {
  let component: ShoppingOrderTransportationComponent;
  let fixture: ComponentFixture<ShoppingOrderTransportationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingOrderTransportationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingOrderTransportationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
