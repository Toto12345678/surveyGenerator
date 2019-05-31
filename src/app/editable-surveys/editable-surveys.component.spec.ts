import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableSurveysComponent } from './editable-surveys.component';

describe('EditableSurveysComponent', () => {
  let component: EditableSurveysComponent;
  let fixture: ComponentFixture<EditableSurveysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditableSurveysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableSurveysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
