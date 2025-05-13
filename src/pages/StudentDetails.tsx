import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { useStudents } from '../contexts/StudentContext';
import { Student } from '../types';
import { Loader } from '../components/ui/Loader';
import { EmptyState } from '../components/ui/EmptyState';
import { ArrowLeft, User, Mail, Phone, Calendar, Bookmark, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

export const StudentDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getStudent } = useStudents();
  
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchStudent = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        const data = await getStudent(id);
        setStudent(data);
      } catch (err) {
        setError('Failed to load student details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchStudent();
  }, [id, getStudent]);
  
  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-center items-center h-64">
            <Loader size="lg" />
          </div>
        </div>
      </Layout>
    );
  }
  
  if (error || !student) {
    return (
      <Layout>
        <div className="container mx-auto px-4 md:px-6">
          <EmptyState
            title="Student Not Found"
            description={error || "The student you're looking for doesn't exist or was removed"}
            icon={<User className="h-6 w-6" />}
            action={
              <button 
                onClick={() => navigate('/students')}
                className="btn btn-primary"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Students
              </button>
            }
            className="mt-8"
          />
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8">
          <button
            onClick={() => navigate('/students')}
            className="flex items-center text-sm font-medium text-gray-600 hover:text-primary-600 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Students
          </button>
          <h1 className="text-3xl font-bold text-gray-900">
            {student.firstName} {student.lastName}
          </h1>
          <p className="mt-2 text-gray-600">{student.studentId}</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="card text-center">
              <div className="flex flex-col items-center">
                <img
                  src={student.avatar || `https://ui-avatars.com/api/?name=${student.firstName}+${student.lastName}&background=3b82f6&color=fff&size=200`}
                  alt={`${student.firstName} ${student.lastName}`}
                  className="h-32 w-32 rounded-full object-cover border-4 border-white shadow"
                />
                <h2 className="mt-4 text-xl font-semibold text-gray-900">
                  {student.firstName} {student.lastName}
                </h2>
                <p className="text-gray-600">{student.course}</p>
                
                {student.grade !== undefined && (
                  <div className="mt-4">
                    <div 
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        student.grade >= 90 
                          ? 'bg-success-100 text-success-800' 
                          : student.grade >= 80 
                          ? 'bg-primary-100 text-primary-800'
                          : student.grade >= 70
                          ? 'bg-warning-100 text-warning-800'
                          : 'bg-error-100 text-error-800'
                      }`}
                    >
                      Grade: {student.grade}%
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Student Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-md bg-primary-100 flex items-center justify-center text-primary-600">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p className="mt-1">{student.email}</p>
                  </div>
                </div>
                
                {student.phoneNumber && (
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-md bg-primary-100 flex items-center justify-center text-primary-600">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">Phone</p>
                      <p className="mt-1">{student.phoneNumber}</p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-md bg-primary-100 flex items-center justify-center text-primary-600">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Enrollment Date</p>
                    <p className="mt-1">{new Date(student.enrollmentDate).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-md bg-primary-100 flex items-center justify-center text-primary-600">
                    <Bookmark className="h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Student ID</p>
                    <p className="mt-1">{student.studentId}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-md bg-primary-100 flex items-center justify-center text-primary-600">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Course</p>
                    <p className="mt-1">{student.course}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};