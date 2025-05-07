
export interface FileItem {
  id: string;
  name: string;
  type: string;
  size: number;
  lastModified: Date;
  url: string;
}

export interface Folder {
  id: string;
  name: string;
  files: FileItem[];
  folders: Folder[];
}
