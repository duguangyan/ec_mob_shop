import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessYouLikeComponent } from './guess-you-like.component';

describe('GuessYouLikeComponent', () => {
  let component: GuessYouLikeComponent;
  let fixture: ComponentFixture<GuessYouLikeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuessYouLikeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuessYouLikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
