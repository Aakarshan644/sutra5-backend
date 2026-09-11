export interface UploadRecord {
  id: string;
  type: 'palm' | 'face';
  filename: string;
  path: string;
  uploadedAt: string;
}
