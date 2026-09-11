import { Request, Response } from 'express';
import { validateBirthData } from './onboarding.validation';
import { saveBirthData, getBirthDataById } from './onboarding.service';

export function submitBirthData(req: Request, res: Response) {
  const validation = validateBirthData(req.body);

  if (!validation.valid) {
    return res.status(400).json({ errors: validation.errors });
  }

  const record = saveBirthData(req.body);
  res.status(201).json(record);
}

export function fetchBirthData(req: Request, res: Response) {
  const record = getBirthDataById(req.params.id);

  if (!record) {
    return res.status(404).json({ error: 'Birth data record not found.' });
  }

  res.json(record);
}
