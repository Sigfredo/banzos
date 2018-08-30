import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeHorariaComponent } from './grade-horaria.component';

describe('GradeHorariaComponent', () => {
  let component: GradeHorariaComponent;
  let fixture: ComponentFixture<GradeHorariaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradeHorariaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradeHorariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
