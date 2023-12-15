import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private baseUrl = 'http://localhost:3000';
  private coursesSubject = new BehaviorSubject<any[]>([]);
  courses$ = this.coursesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadCourses();
  }

  private loadCourses() {
    this.http.get<any[]>(`${this.baseUrl}/courses`).subscribe(courses => {
      this.coursesSubject.next(courses);
    });
  }

  getCourseById(courseId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/courses/${courseId}`);
  }
}
