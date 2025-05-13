import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { StudentDetails } from './pages/StudentDetails';
import { NewStudent } from './pages/NewStudent';
import { Login } from './pages/Login';
import { PrivateRoute } from './components/auth/PrivateRoute';
import { useAuth } from './contexts/AuthContext';
import { Loader } from './components/ui/Loader';

function App() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route 
        path="/students/:id" 
        element={
          <PrivateRoute>
            <StudentDetails />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/students/new" 
        element={
          <PrivateRoute>
            <NewStudent />
          </PrivateRoute>
        } 
      />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;