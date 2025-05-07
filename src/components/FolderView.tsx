
import React from 'react';
import { Folder } from '@/lib/types';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbProps {
  currentPath: Folder[];
  onNavigate: (index: number) => void;
}

const FolderBreadcrumb: React.FC<BreadcrumbProps> = ({ currentPath, onNavigate }) => {
  return (
    <div className="flex items-center text-sm text-gray-600 mb-4 overflow-x-auto pb-2">
      <button 
        onClick={() => onNavigate(-1)}
        className="hover:text-primary transition-colors"
      >
        Home
      </button>
      
      {currentPath.map((folder, index) => (
        <React.Fragment key={folder.id}>
          <ChevronRight size={16} className="mx-1" />
          <button 
            onClick={() => onNavigate(index)}
            className={index === currentPath.length - 1 
              ? "font-semibold text-primary" 
              : "hover:text-primary transition-colors"
            }
          >
            {folder.name}
          </button>
        </React.Fragment>
      ))}
    </div>
  );
};

export default FolderBreadcrumb;
