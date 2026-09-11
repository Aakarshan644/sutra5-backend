import multer from 'multer';
import path from 'path';
import { randomUUID } from 'crypto';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = req.params.type === 'face' ? 'uploads/face' : 'uploads/palm';
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${randomUUID()}${ext}`);
  },
});

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export const upload = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024 }, // 8MB cap
  fileFilter: (req, file, cb) => {
    if (!ALLOWED_TYPES.includes(file.mimetype)) {
      return cb(new Error('Only JPEG, PNG, or WEBP images are allowed.'));
    }
    cb(null, true);
  },
});
