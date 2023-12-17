import { Component } from '@angular/core';
import { NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CoursesService } from '../../services/courses.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Course } from '../../interfaces/course';

@Component({
  selector: 'app-course-info',
  standalone: true,
  imports: [
    HttpClientModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    NgOptimizedImage,
  ],
  providers: [CoursesService, HttpClient],
  templateUrl: './course-info.component.html',
  styleUrl: './course-info.component.scss',
})
export class CourseInfoComponent {
  public course: Course;

  constructor(
    private courseService: CoursesService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const courseId = +params['id'];
      this.getCourseDetails(courseId);
    });
  }

  getCourseDetails(courseId: number): void {
    this.courseService.getCourseById(courseId).subscribe((course) => {
      this.course = course;
    });
  }
}
