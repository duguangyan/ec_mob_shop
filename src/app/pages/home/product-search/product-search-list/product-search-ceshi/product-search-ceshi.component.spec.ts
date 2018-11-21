import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSearchCeshiComponent } from './product-search-ceshi.component';

describe('ProductSearchCeshiComponent', () => {
  let component: ProductSearchCeshiComponent;
  let fixture: ComponentFixture<ProductSearchCeshiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSearchCeshiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSearchCeshiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
