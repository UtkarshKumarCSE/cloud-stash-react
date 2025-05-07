
import React, { useState } from 'react';
import Header from '@/components/Header';
import FileUploader from '@/components/FileUploader';
import FileList from '@/components/FileList';
import FolderBreadcrumb from '@/components/FolderView';
import EmptyState from '@/components/EmptyState';
import { FileItem, Folder } from '@/lib/types';
import { generateId } from '@/lib/fileUtils';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';

const Index = () => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPath, setCurrentPath] = useState<Folder[]>([]);
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  // Get current folder or root
  const getCurrentFolder = (): Folder | null => {
    if (currentPath.length === 0) return null;
    return currentPath[currentPath.length - 1];
  };

  // Get files and folders for current location
  const getCurrentFiles = (): FileItem[] => {
    const currentFolder = getCurrentFolder();
    return currentFolder ? currentFolder.files : files;
  };

  const getCurrentFolders = (): Folder[] => {
    const currentFolder = getCurrentFolder();
    return currentFolder ? currentFolder.folders : folders;
  };

  // Handle file upload
  const handleFileUpload = (file: FileItem) => {
    const currentFolder = getCurrentFolder();
    
    if (currentFolder) {
      // Add file to current folder
      setCurrentPath(prevPath => {
        const newPath = [...prevPath];
        const lastFolder = { ...newPath[newPath.length - 1] };
        lastFolder.files = [...lastFolder.files, file];
        newPath[newPath.length - 1] = lastFolder;
        return updatePathRecursively(newPath);
      });
    } else {
      // Add file to root
      setFiles(prevFiles => [...prevFiles, file]);
    }
    
    toast({
      title: "File Added",
      description: `${file.name} has been added to your storage.`
    });
  };

  // Handle file download
  const handleDownload = (file: FileItem) => {
    const a = document.createElement('a');
    a.href = file.url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    toast({
      title: "Download Started",
      description: `${file.name} is being downloaded to your device.`
    });
  };

  // Handle file deletion
  const handleDeleteFile = (fileId: string) => {
    const currentFolder = getCurrentFolder();
    
    if (currentFolder) {
      // Delete from current folder
      setCurrentPath(prevPath => {
        const newPath = [...prevPath];
        const lastFolder = { ...newPath[newPath.length - 1] };
        lastFolder.files = lastFolder.files.filter(file => file.id !== fileId);
        newPath[newPath.length - 1] = lastFolder;
        return updatePathRecursively(newPath);
      });
    } else {
      // Delete from root
      setFiles(prevFiles => prevFiles.filter(file => file.id !== fileId));
    }
    
    toast({
      title: "File Deleted",
      description: "The file has been removed from your storage."
    });
  };

  // Handle folder deletion
  const handleDeleteFolder = (folderId: string) => {
    const currentFolder = getCurrentFolder();
    
    if (currentFolder) {
      // Delete from current folder
      setCurrentPath(prevPath => {
        const newPath = [...prevPath];
        const lastFolder = { ...newPath[newPath.length - 1] };
        lastFolder.folders = lastFolder.folders.filter(folder => folder.id !== folderId);
        newPath[newPath.length - 1] = lastFolder;
        return updatePathRecursively(newPath);
      });
    } else {
      // Delete from root
      setFolders(prevFolders => prevFolders.filter(folder => folder.id !== folderId));
    }
    
    toast({
      title: "Folder Deleted",
      description: "The folder has been removed from your storage."
    });
  };

  // Create new folder
  const handleCreateFolder = () => {
    if (!newFolderName.trim()) {
      toast({
        title: "Error",
        description: "Folder name cannot be empty.",
        variant: "destructive"
      });
      return;
    }
    
    const newFolder: Folder = {
      id: generateId(),
      name: newFolderName,
      files: [],
      folders: []
    };
    
    const currentFolder = getCurrentFolder();
    
    if (currentFolder) {
      // Add to current folder
      setCurrentPath(prevPath => {
        const newPath = [...prevPath];
        const lastFolder = { ...newPath[newPath.length - 1] };
        lastFolder.folders = [...lastFolder.folders, newFolder];
        newPath[newPath.length - 1] = lastFolder;
        return updatePathRecursively(newPath);
      });
    } else {
      // Add to root
      setFolders(prevFolders => [...prevFolders, newFolder]);
    }
    
    setNewFolderName('');
    setIsCreateFolderOpen(false);
    
    toast({
      title: "Folder Created",
      description: `Folder "${newFolderName}" has been created.`
    });
  };

  // Helper to update folder path recursively
  const updatePathRecursively = (path: Folder[]): Folder[] => {
    if (path.length <= 1) return path;
    
    const newPath = [...path];
    let currentIndex = newPath.length - 2;
    
    while (currentIndex >= 0) {
      const parentFolder = { ...newPath[currentIndex] };
      const childFolderId = newPath[currentIndex + 1].id;
      
      parentFolder.folders = parentFolder.folders.map(folder => 
        folder.id === childFolderId ? newPath[currentIndex + 1] : folder
      );
      
      newPath[currentIndex] = parentFolder;
      currentIndex--;
    }
    
    return newPath;
  };

  // Navigate to a folder
  const handleOpenFolder = (folder: Folder) => {
    setCurrentPath(prevPath => [...prevPath, folder]);
  };

  // Navigate to a specific level in the path
  const handleNavigate = (index: number) => {
    if (index === -1) {
      // Navigate to root
      setCurrentPath([]);
    } else {
      // Navigate to specific folder in path
      setCurrentPath(prevPath => prevPath.slice(0, index + 1));
    }
  };

  const displayFiles = getCurrentFiles();
  const displayFolders = getCurrentFolders();
  const isEmpty = displayFiles.length === 0 && displayFolders.length === 0;

  return (
    <div className="container mx-auto py-6 px-4 max-w-6xl">
      <Header 
        onCreateFolder={() => setIsCreateFolderOpen(true)}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />
      
      <Separator className="my-6" />
      
      {currentPath.length > 0 && (
        <FolderBreadcrumb 
          currentPath={currentPath} 
          onNavigate={handleNavigate} 
        />
      )}
      
      <div className="grid md:grid-cols-[1fr_350px] gap-6">
        <div>
          {isEmpty ? (
            <EmptyState />
          ) : (
            <FileList 
              files={displayFiles}
              folders={displayFolders}
              viewMode={viewMode}
              onDownload={handleDownload}
              onDeleteFile={handleDeleteFile}
              onDeleteFolder={handleDeleteFolder}
              onOpenFolder={handleOpenFolder}
            />
          )}
        </div>
        
        <div>
          <FileUploader onFileUpload={handleFileUpload} />
        </div>
      </div>
      
      <Dialog open={isCreateFolderOpen} onOpenChange={setIsCreateFolderOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Folder</DialogTitle>
            <DialogDescription>
              Enter a name for your new folder.
            </DialogDescription>
          </DialogHeader>
          
          <Input
            placeholder="Folder name"
            value={newFolderName}
            onChange={e => setNewFolderName(e.target.value)}
            className="mt-4"
            autoFocus
          />
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateFolderOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateFolder}>
              Create Folder
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
