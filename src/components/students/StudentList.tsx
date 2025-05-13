import React, { useState, useEffect } from 'react';
import { useStudents } from '../../contexts/StudentContext';
import { useAuth } from '../../contexts/AuthContext';
import { StudentCard } from './StudentCard';
import { StudentFilters } from './StudentFilters';
import { Loader } from '../ui/Loader';
import { EmptyState } from '../ui/EmptyState';
import { Search, UserPlus, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export const StudentList: React.FC = () => {
  const { students, loading, error, selectedCourse } = useStudents();
  const { currentUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredStudents, setFilteredStudents] = useState(students);
  
  useEffect(() => {
    // Filter students based on search query
    const filtered = students.filter((student) => {
      const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
      const email = student.email.toLowerCase();
      const query = searchQuery.toLowerCase();
      
      return fullName.includes(query) || email.includes(query);
    });
    
    setFilteredStudents(filtered);
  }, [students, searchQuery]);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader size="lg" />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="py-6">
        <EmptyState
          title="Error loading students"
          description={error}
          icon={<Users className="h-6 w-6" />}
          action={
            <button 
              onClick={() => window.location.reload()}
              className="btn btn-primary"
            >
              Try Again
            </button>
          }
        />
      </div>
    );
  }
  
  return (
    <div>
      <div className="mb-6 flex flex-col md:flex-row md:items-center gap-4 justify-between">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="input pl-10"
            placeholder="Search students..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        
        {currentUser && (
          <Link to="/students/new" className="btn btn-primary whitespace-nowrap">
            <UserPlus className="h-4 w-4 mr-2" />
            Add Student
          </Link>
        )}
      </div>
      
      <StudentFilters />
      
      {filteredStudents.length === 0 ? (
        <EmptyState
          title={selectedCourse ? `No students in ${selectedCourse}` : "No students found"}
          description={searchQuery ? "Try adjusting your search criteria" : "No students match the current filters"}
          icon={<Users className="h-6 w-6" />}
          className="my-8"
        />
      ) : (
        <AnimatePresence>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
          >
            {filteredStudents.map((student, index) => (
              <motion.div
                key={student.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <StudentCard 
                  student={student}
                  isAuthenticated={!!currentUser}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};