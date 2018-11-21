import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPicShowComponent } from './product-pic-show.component';

describe('ProductPicShowComponent', () => {
  let component: ProductPicShowComponent;
  let fixture: ComponentFixture<ProductPicShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductPicShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPicShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
