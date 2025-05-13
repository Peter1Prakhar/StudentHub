import React from 'react';
import { Layout } from '../components/layout/Layout';
import { StudentList } from '../components/students/StudentList';

export const Students: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Students</h1>
          <p className="mt-2 text-gray-600">
            View and manage all students
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-card p-6">
          <StudentList />
        </div>
      </div>
    </Layout>
  );
};