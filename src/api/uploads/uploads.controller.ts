import { Request, Response } from 'express';
import { saveUploadRecord } from './uploads.service';

export async function handleUpload(req: Request, res: Response) {
  const type = req.params.type as 'palm' | 'face';

  if (type !== 'palm' && type !== 'face') {
    return res.status(400).json({ error: 'Upload type must be "palm" or "face".' });
  }

  if (!req.file) {
    return res.status(400).json({ error: 'No file was uploaded.' });
  }

  try {
    const record = await saveUploadRecord(type, req.file.filename, req.file.path);
    res.status(201).json(record);
  } catch (err) {
    console.error('Failed to save upload record:', err);
    res.status(500).json({ error: 'Failed to save upload record.' });
  }
}
