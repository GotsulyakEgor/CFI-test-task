import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { CourseInfoComponent } from './course-info.component';
import { CoursesService } from '../../services/courses.service';
import { HttpClientModule } from '@angular/common/http';

describe('CourseInfoComponent', () => {
  let component: CourseInfoComponent;
  let fixture: ComponentFixture<CourseInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        CoursesService,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 1 }),
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
