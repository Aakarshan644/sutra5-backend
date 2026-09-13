import { Request, Response } from 'express';
import { validateBirthData } from './onboarding.validation';
import { saveBirthData, getBirthDataById } from './onboarding.service';

export async function submitBirthData(req: Request, res: Response) {
  const validation = validateBirthData(req.body);

  if (!validation.valid) {
    return res.status(400).json({ errors: validation.errors });
  }

  try {
    const record = await saveBirthData(req.body);
    res.status(201).json(record);
  } catch (err) {
    console.error('Failed to save birth data:', err);
    res.status(500).json({ error: 'Failed to save birth data.' });
  }
}

export async function fetchBirthData(req: Request, res: Response) {
  try {
    const record = await getBirthDataById(req.params.id);

    if (!record) {
      return res.status(404).json({ error: 'Birth data record not found.' });
    }

    res.json(record);
  } catch (err) {
    console.error('Failed to fetch birth data:', err);
    res.status(500).json({ error: 'Failed to fetch birth data.' });
  }
}
