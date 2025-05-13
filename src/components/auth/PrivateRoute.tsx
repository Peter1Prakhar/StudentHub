import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Loader } from '../ui/Loader';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const location = useLocation();
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader size="lg" />
      </div>
    );
  }
  
  if (!currentUser) {
    // Redirect to login page but save the location they were trying to visit
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return <>{children}</>;
};