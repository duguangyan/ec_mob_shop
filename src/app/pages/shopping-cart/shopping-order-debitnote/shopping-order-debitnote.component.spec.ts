import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingOrderDebitnoteComponent } from './shopping-order-debitnote.component';

describe('ShoppingOrderDebitnoteComponent', () => {
  let component: ShoppingOrderDebitnoteComponent;
  let fixture: ComponentFixture<ShoppingOrderDebitnoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingOrderDebitnoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingOrderDebitnoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
