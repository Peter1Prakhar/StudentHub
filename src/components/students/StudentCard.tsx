import React from 'react';
import { Student } from '../../types';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface StudentCardProps {
  student: Student;
  isAuthenticated: boolean;
  className?: string;
}

export const StudentCard: React.FC<StudentCardProps> = ({ 
  student, 
  isAuthenticated,
  className 
}) => {
  return (
    <motion.div 
      className={cn('card', className)}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-start">
        <div className="mr-4 flex-shrink-0">
          <img
            src={student.avatar || `https://ui-avatars.com/api/?name=${student.firstName}+${student.lastName}&background=3b82f6&color=fff`}
            alt={`${student.firstName} ${student.lastName}`}
            className="h-12 w-12 rounded-full object-cover border-2 border-white shadow-sm"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {student.firstName} {student.lastName}
          </h3>
          <p className="mt-1 text-sm text-gray-500">{student.email}</p>
          
          <div className="mt-3 flex flex-wrap gap-2">
            <div className="inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary-50 text-primary-700">
              <BookOpen className="mr-1 h-3 w-3" />
              {student.course}
            </div>
            <div className="inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-700">
              <Calendar className="mr-1 h-3 w-3" />
              {new Date(student.enrollmentDate).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 flex justify-end">
        {isAuthenticated ? (
          <Link
            to={`/students/${student.id}`}
            className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700"
          >
            View Details
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        ) : (
          <Link
            to="/login"
            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            Login to View Details
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        )}
      </div>
    </motion.div>
  );
};