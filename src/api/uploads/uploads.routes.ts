import { Router } from 'express';
import { upload } from './uploads.middleware';
import { handleUpload } from './uploads.controller';

const router = Router();

router.post('/:type', upload.single('file'), handleUpload);

export default router;
