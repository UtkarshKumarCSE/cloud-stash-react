
import React from 'react';
import { FolderOpen } from 'lucide-react';

interface EmptyStateProps {
  message?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  message = "No files or folders have been added yet" 
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-10 text-center">
      <div className="bg-gray-100 p-6 rounded-full mb-4">
        <FolderOpen size={40} className="text-gray-400" />
      </div>
      <h3 className="text-lg font-medium">It's empty here</h3>
      <p className="text-gray-500 mt-2 max-w-md">{message}</p>
    </div>
  );
};

export default EmptyState;
