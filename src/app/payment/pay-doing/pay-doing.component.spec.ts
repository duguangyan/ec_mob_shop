import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayDoingComponent } from './pay-doing.component';

describe('PayDoingComponent', () => {
  let component: PayDoingComponent;
  let fixture: ComponentFixture<PayDoingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayDoingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayDoingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
