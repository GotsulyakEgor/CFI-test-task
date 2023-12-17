import { Instructor } from './instructor';

export interface Course {
  id: number;
  name: string;
  imageUrl: string;
  instructors: Instructor[];
  status: CourseStatus;
}

export type CourseStatus = 'Completed' | 'New' | 'In Progress' | 'All';
