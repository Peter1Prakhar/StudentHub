import React from 'react';
import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  description?: string;
  trend?: {
    value: number;
    label: string;
  };
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  description,
  trend,
  className,
}) => {
  const isPositiveTrend = trend ? trend.value > 0 : false;
  
  return (
    <motion.div 
      className={cn('card', className)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
            {trend && (
              <span
                className={cn(
                  'ml-2 text-sm font-medium',
                  isPositiveTrend ? 'text-success-600' : 'text-error-600'
                )}
              >
                {isPositiveTrend ? '+' : ''}{trend.value}% {trend.label}
              </span>
            )}
          </div>
          {description && (
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          )}
        </div>
        {icon && (
          <div className="h-10 w-10 rounded-full bg-primary-50 flex items-center justify-center text-primary-500">
            {icon}
          </div>
        )}
      </div>
    </motion.div>
  );
};