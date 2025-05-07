
import React from 'react';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface HeaderProps {
  onCreateFolder: () => void;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
}

const Header: React.FC<HeaderProps> = ({ onCreateFolder, viewMode, setViewMode }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6 w-full">
      <div className="text-2xl font-semibold">CloudStash</div>
      
      <div className="relative w-full md:w-1/3">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input 
          className="pl-8" 
          placeholder="Search files and folders" 
        />
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          variant={viewMode === 'grid' ? 'default' : 'outline'} 
          onClick={() => setViewMode('grid')} 
          size="sm"
        >
          Grid
        </Button>
        <Button 
          variant={viewMode === 'list' ? 'default' : 'outline'} 
          onClick={() => setViewMode('list')} 
          size="sm"
        >
          List
        </Button>
        <Button onClick={onCreateFolder}>
          New Folder
        </Button>
      </div>
    </div>
  );
};

export default Header;
