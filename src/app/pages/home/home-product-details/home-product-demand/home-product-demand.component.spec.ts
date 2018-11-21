import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeProductDemandComponent } from './home-product-demand.component';

describe('HomeProductDemandComponent', () => {
  let component: HomeProductDemandComponent;
  let fixture: ComponentFixture<HomeProductDemandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeProductDemandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeProductDemandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
