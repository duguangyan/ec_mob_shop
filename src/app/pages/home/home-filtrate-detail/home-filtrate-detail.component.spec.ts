import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFiltrateDetailComponent } from './home-filtrate-detail.component';

describe('HomeFiltrateDetailComponent', () => {
  let component: HomeFiltrateDetailComponent;
  let fixture: ComponentFixture<HomeFiltrateDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeFiltrateDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeFiltrateDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
