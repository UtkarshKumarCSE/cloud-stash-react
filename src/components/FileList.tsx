
import React from 'react';
import { FileItem, Folder } from '@/lib/types';
import FileCard from './FileCard';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatFileSize } from '@/lib/fileUtils';
import { MoreHorizontal, Download, File, Folder as FolderIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface FileListProps {
  files: FileItem[];
  folders: Folder[];
  viewMode: 'grid' | 'list';
  onDownload: (file: FileItem) => void;
  onDeleteFile: (fileId: string) => void;
  onDeleteFolder: (folderId: string) => void;
  onOpenFolder: (folder: Folder) => void;
}

const FileList: React.FC<FileListProps> = ({
  files,
  folders,
  viewMode,
  onDownload,
  onDeleteFile,
  onDeleteFolder,
  onOpenFolder,
}) => {
  if (viewMode === 'grid') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {folders.map((folder) => (
          <FileCard
            key={folder.id}
            item={{
              id: folder.id,
              name: folder.name,
              type: 'folder',
              size: 0,
              lastModified: new Date(),
              url: '',
            }}
            isFolder
            onDownload={onDownload}
            onDelete={onDeleteFolder}
            onOpen={() => onOpenFolder(folder)}
          />
        ))}
        
        {files.map((file) => (
          <FileCard
            key={file.id}
            item={file}
            onDownload={onDownload}
            onDelete={onDeleteFile}
          />
        ))}
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[300px]">Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Size</TableHead>
          <TableHead>Modified</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {folders.map((folder) => (
          <TableRow 
            key={folder.id}
            className="cursor-pointer hover:bg-gray-50"
            onClick={() => onOpenFolder(folder)}
          >
            <TableCell className="font-medium">
              <div className="flex items-center space-x-2">
                <FolderIcon size={20} className="text-blue-500" />
                <span>{folder.name}</span>
              </div>
            </TableCell>
            <TableCell>Folder</TableCell>
            <TableCell>-</TableCell>
            <TableCell>-</TableCell>
            <TableCell className="text-right">
              <div onClick={(e) => e.stopPropagation()}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem 
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteFolder(folder.id);
                      }}
                      className="text-red-500"
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </TableCell>
          </TableRow>
        ))}
        
        {files.map((file) => (
          <TableRow key={file.id}>
            <TableCell className="font-medium">
              <div className="flex items-center space-x-2">
                <File size={20} className="text-gray-500" />
                <span>{file.name}</span>
              </div>
            </TableCell>
            <TableCell>{file.type}</TableCell>
            <TableCell>{formatFileSize(file.size)}</TableCell>
            <TableCell>{file.lastModified.toLocaleDateString()}</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onDownload(file)}>
                    <Download size={16} className="mr-2" /> Download
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => onDeleteFile(file.id)}
                    className="text-red-500"
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default FileList;
