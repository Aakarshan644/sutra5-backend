import { Request, Response } from 'express';
import { getAvailability, createHold, confirmHold } from './slots.service';

export async function checkAvailability(req: Request, res: Response) {
  const days = parseInt(req.query.days as string) || 4;
  const dates: string[] = [];
  for (let i = 0; i < days; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    dates.push(d.toISOString().split('T')[0]);
  }

  try {
    const availability = await getAvailability(dates);
    res.json(availability);
  } catch (err) {
    console.error('Failed to check availability:', err);
    res.status(500).json({ error: 'Failed to check availability.' });
  }
}

export async function holdSlot(req: Request, res: Response) {
  const { date, sessionId } = req.body;

  if (!date || !sessionId) {
    return res.status(400).json({ error: 'date and sessionId are required.' });
  }

  try {
    const hold = await createHold(date, sessionId);
    res.status(201).json(hold);
  } catch (err: any) {
    if (err.message === 'SOLD_OUT') {
      return res.status(409).json({ error: 'This date is sold out.' });
    }
    console.error('Failed to hold slot:', err);
    res.status(500).json({ error: 'Failed to hold slot.' });
  }
}

export async function confirmSlot(req: Request, res: Response) {
  try {
    const confirmed = await confirmHold(req.params.reservationId);
    if (!confirmed) {
      return res.status(400).json({ error: 'Hold not found or expired.' });
    }
    res.json(confirmed);
  } catch (err) {
    console.error('Failed to confirm slot:', err);
    res.status(500).json({ error: 'Failed to confirm slot.' });
  }
}
