
import React from 'react';
import { Button } from '@/components/ui/button';
import { Search, Grid, List, FolderPlus, Code, UserCircle, LogOut } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  onCreateFolder: () => void;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
}

const Header: React.FC<HeaderProps> = ({ onCreateFolder, viewMode, setViewMode }) => {
  const { user, logout } = useAuth();
  
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6 w-full">
      <div className="flex items-center gap-2">
        <Code className="h-7 w-7 text-primary animate-pulse-glow" />
        <div className="text-2xl font-mono font-bold tracking-tight">
          <span className="text-primary glow-text">Cloud</span>
          <span className="text-primary/80">Stash</span>
        </div>
      </div>
      
      <div className="relative w-full md:w-1/3">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input 
          className="pl-8 tech-input font-mono text-sm" 
          placeholder="Search files and folders" 
        />
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          variant={viewMode === 'grid' ? 'default' : 'outline'} 
          onClick={() => setViewMode('grid')} 
          size="sm"
          className="font-mono text-xs"
        >
          <Grid size={16} />
          Grid
        </Button>
        <Button 
          variant={viewMode === 'list' ? 'default' : 'outline'} 
          onClick={() => setViewMode('list')} 
          size="sm"
          className="font-mono text-xs"
        >
          <List size={16} />
          List
        </Button>
        <Button 
          onClick={onCreateFolder}
          className="font-mono text-xs"
        >
          <FolderPlus size={16} />
          New Folder
        </Button>
        
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="ml-2">
                <UserCircle size={16} className="mr-1" />
                {user.email.split('@')[0]}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="font-mono text-xs">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export default Header;
