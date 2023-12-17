import { Component } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';
import { Course, CourseStatus } from '../../interfaces/course';
import { map } from 'rxjs';

@Component({
  selector: 'app-courses-list',
  standalone: true,
  imports: [FormsModule, CommonModule, NgOptimizedImage],
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.scss',
})
export class CoursesListComponent {
  public selectedFilter: CourseStatus = 'All';
  public searchTerm: string = '';
  public courses$ = this.courseService.loadCourses();

  constructor(
    private courseService: CoursesService,
    private router: Router,
  ) {}

  applyFilters(): void {
    this.courses$ = this.courseService
      .loadCourses()
      .pipe(
        map((courses) =>
          courses.filter(
            (course) =>
              this.filterByStatus(course) && this.filterByName(course),
          ),
        ),
      );
  }

  filterByStatus(course: Course): boolean {
    return (
      this.selectedFilter === 'All' ||
      course.status.toLowerCase().includes(this.selectedFilter.toLowerCase())
    );
  }

  filterByName(course: Course): boolean {
    return (
      !this.searchTerm ||
      course.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  clearFilters(): void {
    this.selectedFilter = 'All';
    this.searchTerm = '';
    this.applyFilters();
  }

  navigateToCourseDetail(courseId: number): void {
    this.router.navigate(['/courses', courseId]);
  }
}
