import { Request, Response } from 'express';
import { validateRegister, validateLogin } from './auth.validation';
import { createUser, findUserByEmail, verifyPassword, generateToken } from './auth.service';

export async function register(req: Request, res: Response) {
  const validation = validateRegister(req.body);
  if (!validation.valid) {
    return res.status(400).json({ errors: validation.errors });
  }

  try {
    const user = await createUser(req.body);
    const token = generateToken(user.id);
    res.status(201).json({ user, token });
  } catch (err: any) {
    if (err.code === '23505') { // Postgres unique violation
      return res.status(409).json({ error: 'Email or username already in use.' });
    }
    console.error('Registration failed:', err);
    res.status(500).json({ error: 'Registration failed.' });
  }
}

export async function login(req: Request, res: Response) {
  const validation = validateLogin(req.body);
  if (!validation.valid) {
    return res.status(400).json({ errors: validation.errors });
  }

  try {
    const user = await findUserByEmail(req.body.email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const passwordMatches = await verifyPassword(req.body.password, user.passwordHash);
    if (!passwordMatches) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const token = generateToken(user.id);
    const { passwordHash, ...safeUser } = user;
    res.json({ user: safeUser, token });
  } catch (err) {
    console.error('Login failed:', err);
    res.status(500).json({ error: 'Login failed.' });
  }
}
