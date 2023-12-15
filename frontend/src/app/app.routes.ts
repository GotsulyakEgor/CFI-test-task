import { Routes } from '@angular/router';
import {CoursesListComponent} from "./components/courses-list/courses-list.component";
import {CourseInfoComponent} from "./components/course-info/course-info.component";

export const routes: Routes = [
    { path: '', redirectTo: '/courses', pathMatch: 'full' },
    { path: 'courses', component: CoursesListComponent },
    { path: 'courses/:id', component: CourseInfoComponent },

];
