import { pool } from '../../config/db';
import { UploadRecord } from './uploads.types';

export async function saveUploadRecord(type: 'palm' | 'face', filename: string, filepath: string): Promise<UploadRecord> {
  const result = await pool.query(
    `INSERT INTO uploads (type, filename, path)
     VALUES ($1, $2, $3)
     RETURNING id, type, filename, path, uploaded_at AS "uploadedAt"`,
    [type, filename, filepath]
  );
  return result.rows[0];
}
