import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../../config/db';
import { RegisterInput, UserRecord } from './auth.types';

const JWT_SECRET = process.env.JWT_SECRET || 'insecure-fallback-secret';
const SALT_ROUNDS = 10;

export async function createUser(input: RegisterInput): Promise<UserRecord> {
  const passwordHash = await bcrypt.hash(input.password, SALT_ROUNDS);

  const result = await pool.query(
    `INSERT INTO users (first_name, last_name, username, email, phone, address, city, district, password_hash)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     RETURNING id, first_name AS "firstName", last_name AS "lastName", username, email, phone, address, city, district, created_at AS "createdAt"`,
    [input.firstName, input.lastName, input.username, input.email, input.phone, input.address, input.city, input.district, passwordHash]
  );
  return result.rows[0];
}

export async function findUserByEmail(email: string) {
  const result = await pool.query(
    `SELECT id, first_name AS "firstName", last_name AS "lastName", username, email, password_hash AS "passwordHash"
     FROM users WHERE email = $1`,
    [email]
  );
  return result.rows[0];
}

export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

export function generateToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
}
