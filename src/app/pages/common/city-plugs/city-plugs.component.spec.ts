import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CityPlugsComponent } from './city-plugs.component';

describe('CityPlugsComponent', () => {
  let component: CityPlugsComponent;
  let fixture: ComponentFixture<CityPlugsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CityPlugsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityPlugsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
