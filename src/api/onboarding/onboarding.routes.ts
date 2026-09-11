import { Router } from 'express';
import { submitBirthData, fetchBirthData } from './onboarding.controller';

const router = Router();

router.post('/', submitBirthData);
router.get('/:id', fetchBirthData);

export default router;
