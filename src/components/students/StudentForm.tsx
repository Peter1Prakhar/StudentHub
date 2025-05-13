import React, { useState } from 'react';
import { useStudents } from '../../contexts/StudentContext';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { StudentInput } from '../../types';
import { Loader } from '../ui/Loader';
import { AlertCircle } from 'lucide-react';

export const StudentForm: React.FC = () => {
  const { addStudent, courses, loading } = useStudents();
  const [formError, setFormError] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StudentInput>();
  
  const onSubmit = async (data: StudentInput) => {
    try {
      setFormError(null);
      await addStudent(data);
      navigate('/students');
    } catch (err) {
      setFormError('Failed to add student. Please try again.');
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {formError && (
        <div className="rounded-md bg-error-50 p-4 mb-6">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-error-400" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-error-800">Error</h3>
              <div className="mt-1 text-sm text-error-700">{formError}</div>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
            First Name *
          </label>
          <input
            id="firstName"
            type="text"
            className={`input ${errors.firstName ? 'border-error-500 focus:ring-error-500 focus:border-error-500' : ''}`}
            {...register('firstName', { required: 'First name is required' })}
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-error-600">{errors.firstName.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
            Last Name *
          </label>
          <input
            id="lastName"
            type="text"
            className={`input ${errors.lastName ? 'border-error-500 focus:ring-error-500 focus:border-error-500' : ''}`}
            {...register('lastName', { required: 'Last name is required' })}
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-error-600">{errors.lastName.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <input
            id="email"
            type="email"
            className={`input ${errors.email ? 'border-error-500 focus:ring-error-500 focus:border-error-500' : ''}`}
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
          <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-1">
            Course *
          </label>
          <select
            id="course"
            className={`select ${errors.course ? 'border-error-500 focus:ring-error-500 focus:border-error-500' : ''}`}
            {...register('course', { required: 'Course is required' })}
          >
            <option value="">Select a course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.name}>
                {course.name}
              </option>
            ))}
          </select>
          {errors.course && (
            <p className="mt-1 text-sm text-error-600">{errors.course.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="studentId" className="block text-sm font-medium text-gray-700 mb-1">
            Student ID *
          </label>
          <input
            id="studentId"
            type="text"
            className={`input ${errors.studentId ? 'border-error-500 focus:ring-error-500 focus:border-error-500' : ''}`}
            {...register('studentId', { required: 'Student ID is required' })}
          />
          {errors.studentId && (
            <p className="mt-1 text-sm text-error-600">{errors.studentId.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="enrollmentDate" className="block text-sm font-medium text-gray-700 mb-1">
            Enrollment Date *
          </label>
          <input
            id="enrollmentDate"
            type="date"
            className={`input ${errors.enrollmentDate ? 'border-error-500 focus:ring-error-500 focus:border-error-500' : ''}`}
            {...register('enrollmentDate', { required: 'Enrollment date is required' })}
          />
          {errors.enrollmentDate && (
            <p className="mt-1 text-sm text-error-600">{errors.enrollmentDate.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-1">
            Grade
          </label>
          <input
            id="grade"
            type="number"
            min="0"
            max="100"
            className="input"
            {...register('grade', { 
              min: { value: 0, message: 'Grade must be at least 0' },
              max: { value: 100, message: 'Grade cannot exceed 100' },
              valueAsNumber: true,
            })}
          />
          {errors.grade && (
            <p className="mt-1 text-sm text-error-600">{errors.grade.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            id="phoneNumber"
            type="tel"
            className="input"
            {...register('phoneNumber')}
          />
        </div>
        
        <div>
          <label htmlFor="avatar" className="block text-sm font-medium text-gray-700 mb-1">
            Avatar URL
          </label>
          <input
            id="avatar"
            type="url"
            className="input"
            placeholder="https://example.com/avatar.jpg"
            {...register('avatar')}
          />
          <p className="mt-1 text-xs text-gray-500">
            Leave empty to use a generated avatar
          </p>
        </div>
      </div>
      
      <div className="flex justify-end space-x-3 mt-8">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate('/students')}
        >
          Cancel
        </button>
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader size="sm" className="mr-2" />
              Saving...
            </>
          ) : (
            'Add Student'
          )}
        </button>
      </div>
    </form>
  );
};