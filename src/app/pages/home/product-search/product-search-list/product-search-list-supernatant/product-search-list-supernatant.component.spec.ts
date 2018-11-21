import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSearchListSupernatantComponent } from './product-search-list-supernatant.component';

describe('ProductSearchListSupernatantComponent', () => {
  let component: ProductSearchListSupernatantComponent;
  let fixture: ComponentFixture<ProductSearchListSupernatantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSearchListSupernatantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSearchListSupernatantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
