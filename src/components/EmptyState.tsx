
import React from 'react';
import { FolderOpen, Code } from 'lucide-react';

interface EmptyStateProps {
  message?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  message = "No files or folders have been added yet" 
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-10 text-center">
      <div className="bg-secondary/80 p-6 rounded-lg mb-4 border border-white/10 shadow-cyan-glow">
        <FolderOpen size={40} className="text-primary" />
      </div>
      <h3 className="text-lg font-mono font-medium text-foreground">
        <span className="glow-text">{'<'}</span>
        Empty
        <span className="glow-text">{'/>'}</span>
      </h3>
      <p className="text-muted-foreground mt-2 max-w-md font-mono text-sm">{message}</p>
      <div className="mt-4 flex gap-1 items-center text-xs text-muted-foreground/70 font-mono">
        <Code size={14} />
        <span>Drag files here to upload</span>
      </div>
    </div>
  );
};

export default EmptyState;
