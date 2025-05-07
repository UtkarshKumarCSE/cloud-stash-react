
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Upload, X } from 'lucide-react';
import { createFileItem } from '@/lib/fileUtils';
import { FileItem } from '@/lib/types';
import { toast } from '@/components/ui/use-toast';

interface FileUploaderProps {
  onFileUpload: (file: FileItem) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [currentUploads, setCurrentUploads] = useState<{ file: File; id: string }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (files: File[]) => {
    files.forEach(file => {
      const id = Date.now().toString() + Math.random().toString(36).substring(2);
      setCurrentUploads(prev => [...prev, { file, id }]);
      
      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          
          // Complete upload
          setTimeout(() => {
            const fileItem = createFileItem(file);
            onFileUpload(fileItem);
            setCurrentUploads(prev => prev.filter(upload => upload.id !== id));
            setUploadProgress(prev => {
              const newProgress = { ...prev };
              delete newProgress[id];
              return newProgress;
            });
            toast({
              title: "Upload Complete",
              description: `${file.name} has been uploaded successfully.`
            });
          }, 500);
        }
        
        setUploadProgress(prev => ({
          ...prev,
          [id]: progress
        }));
      }, 200);
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const cancelUpload = (id: string) => {
    setCurrentUploads(prev => prev.filter(upload => upload.id !== id));
    setUploadProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[id];
      return newProgress;
    });
  };

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging ? 'border-primary bg-primary/5' : 'border-gray-200'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          multiple
        />
        
        <div className="flex flex-col items-center justify-center space-y-2">
          <Upload size={40} className="text-gray-400" />
          <h3 className="text-lg font-medium">Drag & Drop files here</h3>
          <p className="text-sm text-gray-500">or</p>
          <Button onClick={openFileDialog} variant="outline">
            Browse Files
          </Button>
        </div>
      </div>

      {currentUploads.length > 0 && (
        <div className="space-y-2 mt-4">
          <h4 className="font-medium">Uploading {currentUploads.length} file(s)</h4>
          {currentUploads.map(({ file, id }) => (
            <div key={id} className="border rounded-md p-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7" 
                  onClick={() => cancelUpload(id)}
                >
                  <X size={16} />
                </Button>
              </div>
              <Progress value={uploadProgress[id] || 0} className="h-2" />
              <span className="text-xs text-gray-500 mt-1 inline-block">
                {Math.round(uploadProgress[id] || 0)}%
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUploader;
