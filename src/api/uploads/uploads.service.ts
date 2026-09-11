import { randomUUID } from 'crypto';
import { UploadRecord } from './uploads.types';

// Temporary in-memory store — will move to the database once PostgreSQL is set up.
const records = new Map<string, UploadRecord>();

export function saveUploadRecord(type: 'palm' | 'face', filename: string, filepath: string): UploadRecord {
  const record: UploadRecord = {
    id: randomUUID(),
    type,
    filename,
    path: filepath,
    uploadedAt: new Date().toISOString(),
  };
  records.set(record.id, record);
  return record;
}
