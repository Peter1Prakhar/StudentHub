import React from 'react';
import { Layout } from '../components/layout/Layout';
import { LoginForm } from '../components/auth/LoginForm';

export const Login: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6 pt-8">
        <div className="max-w-md mx-auto text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome to StudentHub</h1>
          <p className="mt-2 text-gray-600">
            Sign in to manage student records and access detailed information
          </p>
        </div>
        
        <LoginForm />
      </div>
    </Layout>
  );
};