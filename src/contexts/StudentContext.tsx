import React, { createContext, useContext, useState, useEffect } from 'react';
import { Student, Course, StudentStats } from '../types';
import api from '../services/mockApi';

interface StudentContextType {
  students: Student[];
  courses: Course[];
  stats: StudentStats | null;
  loading: boolean;
  error: string | null;
  selectedCourse: string | null;
  setSelectedCourse: (course: string | null) => void;
  getStudent: (id: string) => Promise<Student | null>;
  addStudent: (student: Omit<Student, 'id'>) => Promise<void>;
  refreshData: () => Promise<void>;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export const StudentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [stats, setStats] = useState<StudentStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const fetchStudents = async () => {
    try {
      const params = selectedCourse ? { course: selectedCourse } : {};
      const response = await api.get('/students', { params });
      setStudents(response.data);
    } catch (err) {
      setError('Failed to fetch students');
      console.error('Error fetching students:', err);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await api.get('/courses');
      setCourses(response.data);
    } catch (err) {
      setError('Failed to fetch courses');
      console.error('Error fetching courses:', err);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await api.get('/stats');
      setStats(response.data);
    } catch (err) {
      setError('Failed to fetch stats');
      console.error('Error fetching stats:', err);
    }
  };

  const refreshData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      await Promise.all([
        fetchStudents(),
        fetchCourses(),
        fetchStats()
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    refreshData();
  }, []);

  // Re-fetch students when selected course changes
  useEffect(() => {
    fetchStudents();
  }, [selectedCourse]);

  const getStudent = async (id: string): Promise<Student | null> => {
    try {
      const response = await api.get(`/students/${id}`);
      return response.data;
    } catch (err) {
      setError('Failed to fetch student details');
      console.error('Error fetching student:', err);
      return null;
    }
  };

  const addStudent = async (student: Omit<Student, 'id'>) => {
    try {
      setLoading(true);
      await api.post('/students', student);
      await refreshData();
    } catch (err) {
      setError('Failed to add student');
      console.error('Error adding student:', err);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    students,
    courses,
    stats,
    loading,
    error,
    selectedCourse,
    setSelectedCourse,
    getStudent,
    addStudent,
    refreshData,
  };

  return <StudentContext.Provider value={value}>{children}</StudentContext.Provider>;
};

export const useStudents = () => {
  const context = useContext(StudentContext);
  if (context === undefined) {
    throw new Error('useStudents must be used within a StudentProvider');
  }
  return context;
};