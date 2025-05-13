import React from 'react';
import { cn } from '../../utils/cn';
import { FileX } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  action,
  className,
}) => {
  return (
    <div className={cn(
      'flex flex-col items-center justify-center text-center p-8 rounded-lg border border-gray-200 bg-white',
      className
    )}>
      <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-4">
        {icon || <FileX className="h-6 w-6" />}
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-gray-500 mb-4 max-w-sm">{description}</p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
};