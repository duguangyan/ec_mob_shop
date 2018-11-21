import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindListDetailComponent } from './find-list-detail.component';

describe('FindListDetailComponent', () => {
  let component: FindListDetailComponent;
  let fixture: ComponentFixture<FindListDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindListDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindListDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
