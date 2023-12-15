import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CoursesListComponent } from './courses-list.component';
import { CoursesService } from '../../services/courses.service';

describe('CoursesListComponent', () => {
  let fixture: ComponentFixture<CoursesListComponent>;
  let component: CoursesListComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientModule, CommonModule, RouterTestingModule],
      providers: [CoursesService],
    });

    fixture = TestBed.createComponent(CoursesListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call applyFilters on input change', () => {
    spyOn(component, 'applyFilters');
    component.searchTerm = 'test';
    fixture.detectChanges();

    expect(component.applyFilters).toHaveBeenCalled();
  });

  it('should call clearFilters on clear button click', () => {
    spyOn(component, 'clearFilters');

    const clearButton = fixture.nativeElement.querySelector('.filter-block-clear');
    clearButton.click();

    expect(component.clearFilters).toHaveBeenCalled();
  });

  it('should call applyFilters on search input change', () => {
    spyOn(component, 'applyFilters');

    component.selectedFilter = 'in progress';
    fixture.detectChanges();

    expect(component.applyFilters).toHaveBeenCalled();
  });

  it('should navigate to course detail', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    const course = { id: 1, name: 'Course 1', status: 'completed' };

    component.navigateToCourseDetail(course.id);

    expect(router.navigate).toHaveBeenCalledWith(['/courses', course.id]);
  });
});
