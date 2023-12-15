import {Component} from '@angular/core';
import {CoursesService} from "../../services/courses.service";
import {HttpClient} from "@angular/common/http";
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {CommonModule} from "@angular/common";
import { Router } from '@angular/router';
import {Course} from "../../interfaces/course";
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';



@Component({
  selector: 'app-courses-list',
  standalone: true,
  imports: [
    HttpClientModule,
    FormsModule,
    CommonModule],
  providers: [CoursesService, HttpClient],
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.scss'
})
export class CoursesListComponent {
  private courses: Course[];
  public filteredCourses: Course[];
  public selectedFilter: string = 'all';
  public searchTerm: string = '';

  constructor(private courseService: CoursesService, private router: Router) {}

  ngOnInit(): void {
    this.subscribeToCourses();
    this.setupSearchObservable();
  }

  private subscribeToCourses(): void {
    this.courseService.courses$.subscribe(courses => {
      this.courses = courses;
      this.applyFilters();
    });
  }

  private setupSearchObservable(): void {
    this.courseService.courses$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(courses => {
          this.courses = courses;
          this.applyFilters();
          return new Observable();
        })
      )
      .subscribe();
  }

  applyFilters(): void {
    this.filteredCourses = this.courses.filter(course => this.filterByStatus(course) && this.filterByName(course));
  }

  filterByStatus(course: Course): boolean {
    return this.selectedFilter === 'all' || course.status.toLowerCase().includes(this.selectedFilter.toLowerCase());
  }

  filterByName(course: Course): boolean {
    return !this.searchTerm || course.name.toLowerCase().includes(this.searchTerm.toLowerCase());
  }

  clearFilters(): void {
    this.selectedFilter = 'all';
    this.searchTerm = '';
    this.applyFilters();
  }

  navigateToCourseDetail(courseId: number): void {
    this.router.navigate(['/courses', courseId]);
  }
}
