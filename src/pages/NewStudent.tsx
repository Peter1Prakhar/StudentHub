import React from 'react';
import { Layout } from '../components/layout/Layout';
import { StudentForm } from '../components/students/StudentForm';

export const NewStudent: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Add New Student</h1>
          <p className="mt-2 text-gray-600">
            Enter student information to add them to the system
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-card p-6">
          <StudentForm />
        </div>
      </div>
    </Layout>
  );
};