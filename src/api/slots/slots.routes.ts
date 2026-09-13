import { Router } from 'express';
import { checkAvailability, holdSlot, confirmSlot } from './slots.controller';

const router = Router();

router.get('/', checkAvailability);
router.post('/hold', holdSlot);
router.post('/:reservationId/confirm', confirmSlot);

export default router;
