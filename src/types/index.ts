export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  course: string;
  enrollmentDate: string;
  grade?: number;
  avatar?: string;
  phoneNumber?: string;
  studentId: string;
}

export type StudentInput = Omit<Student, 'id'>;

export interface Course {
  id: string;
  name: string;
  code: string;
}

export interface StudentStats {
  total: number;
  byCourse: Record<string, number>;
  averageGrade: number;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}