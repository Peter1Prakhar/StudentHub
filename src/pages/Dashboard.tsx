import React from 'react';
import { Layout } from '../components/layout/Layout';
import { useStudents } from '../contexts/StudentContext';
import { StudentList } from '../components/students/StudentList';
import { StatCard } from '../components/ui/StatCard';
import { Loader } from '../components/ui/Loader';
import { Users, BookOpen, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export const Dashboard: React.FC = () => {
  const { students, stats, loading } = useStudents();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Monitor and manage student information
          </p>
        </motion.div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader size="lg" />
          </div>
        ) : (
          <>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants}>
                <StatCard
                  title="Total Students"
                  value={stats?.total || students.length}
                  icon={<Users className="h-5 w-5" />}
                  trend={{ value: 12, label: "from last month" }}
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <StatCard
                  title="Average Grade"
                  value={stats?.averageGrade ? `${stats.averageGrade}%` : "N/A"}
                  icon={<TrendingUp className="h-5 w-5" />}
                  trend={{ value: 3, label: "from last semester" }}
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <StatCard
                  title="Active Courses"
                  value={Object.keys(stats?.byCourse || {}).length}
                  icon={<BookOpen className="h-5 w-5" />}
                />
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="bg-white rounded-xl shadow-card p-6">
                <StudentList />
              </div>
            </motion.div>
          </>
        )}
      </div>
    </Layout>
  );
};