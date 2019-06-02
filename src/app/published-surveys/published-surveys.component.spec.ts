import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishedSurveysComponent } from './published-surveys.component';

describe('PublishedSurveysComponent', () => {
  let component: PublishedSurveysComponent;
  let fixture: ComponentFixture<PublishedSurveysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishedSurveysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishedSurveysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
