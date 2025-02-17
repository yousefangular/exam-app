import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewExamComponent } from './new-exam.component';

describe('NewExamComponent', () => {
  let component: NewExamComponent;
  let fixture: ComponentFixture<NewExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewExamComponent]
    }) 
    .compileComponents();

    fixture = TestBed.createComponent(NewExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
