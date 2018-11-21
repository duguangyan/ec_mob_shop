import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingOrderSubmitSuccessComponent } from './shopping-order-submit-success.component';

describe('ShoppingOrderSubmitSuccessComponent', () => {
  let component: ShoppingOrderSubmitSuccessComponent;
  let fixture: ComponentFixture<ShoppingOrderSubmitSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingOrderSubmitSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingOrderSubmitSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
