import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingOrderListDetailComponent } from './shopping-order-list-detail.component';

describe('ShoppingOrderListDetailComponent', () => {
  let component: ShoppingOrderListDetailComponent;
  let fixture: ComponentFixture<ShoppingOrderListDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingOrderListDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingOrderListDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
