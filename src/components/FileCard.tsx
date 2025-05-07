
import React from 'react';
import { FileItem } from '@/lib/types';
import { formatFileSize } from '@/lib/fileUtils';
import { Card } from '@/components/ui/card';
import { MoreHorizontal, Download, File, Folder } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface FileCardProps {
  item: FileItem;
  isFolder?: boolean;
  onDownload: (file: FileItem) => void;
  onDelete: (fileId: string) => void;
  onOpen?: () => void;
}

const FileCard: React.FC<FileCardProps> = ({ 
  item, 
  isFolder = false, 
  onDownload, 
  onDelete,
  onOpen
}) => {
  const Icon = isFolder ? Folder : File;
  const fileExtension = !isFolder ? item.name.split('.').pop()?.toLowerCase() : '';
  
  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDownload(item);
  };
  
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(item.id);
  };

  return (
    <Card 
      className="p-4 hover:shadow-md transition-shadow cursor-pointer flex flex-col"
      onClick={onOpen}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="p-2 bg-gray-100 rounded-md">
          <Icon size={24} className={isFolder ? 'text-blue-500' : 'text-gray-500'} />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {!isFolder && (
              <DropdownMenuItem onClick={handleDownload}>
                <Download size={16} className="mr-2" /> Download
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={handleDelete} className="text-red-500">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="flex-grow">
        <h3 className="font-medium truncate">{item.name}</h3>
        {!isFolder && (
          <div className="text-xs text-gray-500 mt-1">
            {formatFileSize(item.size)}
            {fileExtension && <span className="ml-2 uppercase">{fileExtension}</span>}
          </div>
        )}
      </div>
      
      <div className="text-xs text-gray-400 mt-3">
        {item.lastModified.toLocaleDateString()}
      </div>
    </Card>
  );
};

export default FileCard;
