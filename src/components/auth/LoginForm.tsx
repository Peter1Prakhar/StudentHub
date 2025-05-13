import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { AlertCircle, Loader, LogIn, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';

interface LoginFormData {
  email: string;
  password: string;
}

export const LoginForm: React.FC = () => {
  const { signIn, signUp, loading, error } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  
  const from = location.state?.from?.pathname || '/';
  
  const onSubmit = async (data: LoginFormData) => {
    try {
      if (isSignUp) {
        await signUp(data.email, data.password);
      } else {
        await signIn(data.email, data.password);
      }
      navigate(from);
    } catch (err) {
      // Error is handled by the auth context
    }
  };
  
  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };
  
  return (
    <motion.div 
      className="card max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-bold text-center mb-6">
        {isSignUp ? 'Create Account' : 'Sign In'}
      </h2>
      
      {error && (
        <motion.div 
          className="rounded-md bg-error-50 p-4 mb-6"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
        >
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-error-400" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-error-800">Error</h3>
              <div className="mt-1 text-sm text-error-700">{error}</div>
            </div>
          </div>
        </motion.div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            className={`input ${errors.email ? 'border-error-500 focus:ring-error-500 focus:border-error-500' : ''}`}
            placeholder="your.email@example.com"
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-error-600">{errors.email.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            className={`input ${errors.password ? 'border-error-500 focus:ring-error-500 focus:border-error-500' : ''}`}
            placeholder="••••••••"
            {...register('password', { 
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-error-600">{errors.password.message}</p>
          )}
        </div>
        
        <div className="pt-2">
          <button 
            type="submit" 
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader size="sm" className="mr-2" />
                {isSignUp ? 'Creating Account...' : 'Signing In...'}
              </>
            ) : (
              <>
                {isSignUp ? (
                  <>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Create Account
                  </>
                ) : (
                  <>
                    <LogIn className="h-4 w-4 mr-2" />
                    Sign In
                  </>
                )}
              </>
            )}
          </button>
        </div>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          <button
            type="button"
            onClick={toggleForm}
            className="ml-1 text-primary-600 hover:text-primary-500 font-medium"
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
      </div>
    </motion.div>
  );
};