import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingOrderListComponent } from './shopping-order-list.component';

describe('ShoppingOrderListComponent', () => {
  let component: ShoppingOrderListComponent;
  let fixture: ComponentFixture<ShoppingOrderListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingOrderListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
