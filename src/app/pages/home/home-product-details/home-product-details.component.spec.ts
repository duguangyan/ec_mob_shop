import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeProductDetailsComponent } from './home-product-details.component';

describe('HomeProductDetailsComponent', () => {
  let component: HomeProductDetailsComponent;
  let fixture: ComponentFixture<HomeProductDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeProductDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
