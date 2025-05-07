
import { FileItem, Folder } from './types';

// Format file size to be human readable
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Get file type icon based on mimetype or extension
export const getFileType = (fileName: string): string => {
  const extension = fileName.split('.').pop()?.toLowerCase() || '';
  
  if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(extension)) {
    return 'image';
  } else if (['mp4', 'webm', 'mov', 'avi'].includes(extension)) {
    return 'video';
  } else if (['mp3', 'wav', 'ogg'].includes(extension)) {
    return 'audio';
  } else if (['doc', 'docx', 'txt', 'pdf'].includes(extension)) {
    return 'document';
  } else if (['xls', 'xlsx', 'csv'].includes(extension)) {
    return 'spreadsheet';
  } else if (['zip', 'rar', '7z', 'tar', 'gz'].includes(extension)) {
    return 'archive';
  } else {
    return 'other';
  }
};

// Generate a unique ID
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Create a file object from a File object
export const createFileItem = (file: File): FileItem => {
  return {
    id: generateId(),
    name: file.name,
    type: getFileType(file.name),
    size: file.size,
    lastModified: new Date(file.lastModified),
    url: URL.createObjectURL(file)
  };
};
