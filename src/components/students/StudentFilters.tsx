import React from 'react';
import { useStudents } from '../../contexts/StudentContext';
import { motion } from 'framer-motion';
import { Filter, X } from 'lucide-react';
import { cn } from '../../utils/cn';

export const StudentFilters: React.FC = () => {
  const { 
    courses, 
    selectedCourse, 
    setSelectedCourse,
    loading,
  } = useStudents();
  
  const handleCourseSelect = (courseName: string) => {
    if (selectedCourse === courseName) {
      setSelectedCourse(null); // Toggle off if already selected
    } else {
      setSelectedCourse(courseName);
    }
  };
  
  const handleClearFilters = () => {
    setSelectedCourse(null);
  };
  
  const hasActiveFilters = selectedCourse !== null;
  
  if (loading || courses.length === 0) {
    return null;
  }
  
  return (
    <div className="mb-6">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex items-center">
          <Filter className="h-4 w-4 text-gray-500 mr-2" />
          <h3 className="text-sm font-medium text-gray-700">Filter by</h3>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {courses.map((course) => (
            <motion.button
              key={course.id}
              onClick={() => handleCourseSelect(course.name)}
              className={cn(
                'px-3 py-1.5 text-xs font-medium rounded-full transition-colors',
                selectedCourse === course.name
                  ? 'bg-primary-100 text-primary-700 border border-primary-200'
                  : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {course.name}
            </motion.button>
          ))}
          
          {hasActiveFilters && (
            <motion.button
              onClick={handleClearFilters}
              className="px-3 py-1.5 text-xs font-medium rounded-full bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200 flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <X className="h-3 w-3 mr-1" />
              Clear
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};