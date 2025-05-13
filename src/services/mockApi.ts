import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Student, Course, StudentStats } from '../types';

// Create axios instance
const api = axios.create({
  baseURL: '/api',
  timeout: 1000,
});

// Create mock adapter
const mock = new MockAdapter(api, { delayResponse: 800 });

// Initial data
const courses: Course[] = [
  { id: '1', name: 'Computer Science', code: 'CS101' },
  { id: '2', name: 'Mathematics', code: 'MATH101' },
  { id: '3', name: 'Physics', code: 'PHYS101' },
  { id: '4', name: 'Biology', code: 'BIO101' },
  { id: '5', name: 'Chemistry', code: 'CHEM101' },
];

const students: Student[] = [
  {
    id: '1',
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice@example.com',
    course: 'Computer Science',
    enrollmentDate: '2023-09-05',
    grade: 95,
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    phoneNumber: '(555) 123-4567',
    studentId: 'CS20230001',
  },
  {
    id: '2',
    firstName: 'Bob',
    lastName: 'Smith',
    email: 'bob@example.com',
    course: 'Mathematics',
    enrollmentDate: '2023-08-20',
    grade: 88,
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    phoneNumber: '(555) 234-5678',
    studentId: 'MATH20230002',
  },
  {
    id: '3',
    firstName: 'Charlie',
    lastName: 'Davis',
    email: 'charlie@example.com',
    course: 'Physics',
    enrollmentDate: '2023-09-10',
    grade: 91,
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    phoneNumber: '(555) 345-6789',
    studentId: 'PHYS20230003',
  },
  {
    id: '4',
    firstName: 'Diana',
    lastName: 'Miller',
    email: 'diana@example.com',
    course: 'Biology',
    enrollmentDate: '2023-08-15',
    grade: 94,
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    phoneNumber: '(555) 456-7890',
    studentId: 'BIO20230004',
  },
  {
    id: '5',
    firstName: 'Evan',
    lastName: 'Williams',
    email: 'evan@example.com',
    course: 'Chemistry',
    enrollmentDate: '2023-09-01',
    grade: 86,
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    phoneNumber: '(555) 567-8901',
    studentId: 'CHEM20230005',
  },
  {
    id: '6',
    firstName: 'Fiona',
    lastName: 'Brown',
    email: 'fiona@example.com',
    course: 'Computer Science',
    enrollmentDate: '2023-08-25',
    grade: 92,
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    phoneNumber: '(555) 678-9012',
    studentId: 'CS20230006',
  },
  {
    id: '7',
    firstName: 'George',
    lastName: 'Jones',
    email: 'george@example.com',
    course: 'Mathematics',
    enrollmentDate: '2023-09-07',
    grade: 85,
    avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
    phoneNumber: '(555) 789-0123',
    studentId: 'MATH20230007',
  },
  {
    id: '8',
    firstName: 'Hannah',
    lastName: 'Garcia',
    email: 'hannah@example.com',
    course: 'Physics',
    enrollmentDate: '2023-08-10',
    grade: 89,
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    phoneNumber: '(555) 890-1234',
    studentId: 'PHYS20230008',
  },
];

// Calculate stats
const calculateStats = (): StudentStats => {
  const total = students.length;
  
  // Count students by course
  const byCourse: Record<string, number> = {};
  students.forEach(student => {
    if (byCourse[student.course]) {
      byCourse[student.course]++;
    } else {
      byCourse[student.course] = 1;
    }
  });
  
  // Calculate average grade
  const totalGrades = students.reduce((sum, student) => sum + (student.grade || 0), 0);
  const averageGrade = total > 0 ? Math.round((totalGrades / total) * 10) / 10 : 0;
  
  return { total, byCourse, averageGrade };
};

// Mock endpoints
mock.onGet('/students').reply((config) => {
  const { course } = config.params || {};

  let filteredStudents = [...students];
  
  if (course) {
    filteredStudents = filteredStudents.filter(student => student.course === course);
  }
  
  return [200, filteredStudents];
});

mock.onGet(/\/students\/\d+/).reply((config) => {
  const id = config.url?.split('/').pop();
  const student = students.find(s => s.id === id);
  
  if (student) {
    return [200, student];
  }
  
  return [404, { message: 'Student not found' }];
});

mock.onPost('/students').reply((config) => {
  const newStudent = JSON.parse(config.data);
  const studentWithId = {
    ...newStudent,
    id: (students.length + 1).toString(),
  };
  
  students.push(studentWithId);
  
  return [201, studentWithId];
});

mock.onGet('/courses').reply(200, courses);

mock.onGet('/stats').reply(200, calculateStats());

export default api;