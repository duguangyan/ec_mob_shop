import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingOrderMessageComponent } from './shopping-order-message.component';

describe('ShoppingOrderMessageComponent', () => {
  let component: ShoppingOrderMessageComponent;
  let fixture: ComponentFixture<ShoppingOrderMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingOrderMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingOrderMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
