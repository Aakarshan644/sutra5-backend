import { pool } from '../../config/db';
import { SlotAvailability } from './slots.types';

const DAILY_CAPACITY = parseInt(process.env.DAILY_SLOT_CAPACITY || '349', 10);
const HOLD_MINUTES = parseInt(process.env.HOLD_DURATION_MINUTES || '10', 10);

// A slot counts as "taken" if it's confirmed, or held with a hold that hasn't expired yet.
async function getTakenCount(date: string): Promise<number> {
  const result = await pool.query(
    `SELECT COUNT(*) FROM slot_reservations
     WHERE slot_date = $1
       AND (status = 'confirmed' OR (status = 'held' AND hold_expires_at > now()))`,
    [date]
  );
  return parseInt(result.rows[0].count, 10);
}

export async function getAvailability(dates: string[]): Promise<SlotAvailability[]> {
  const results: SlotAvailability[] = [];
  for (const date of dates) {
    const taken = await getTakenCount(date);
    const remaining = Math.max(0, DAILY_CAPACITY - taken);
    results.push({ date, remaining, soldOut: remaining === 0 });
  }
  return results;
}

export async function createHold(date: string, sessionId: string) {
  const taken = await getTakenCount(date);
  if (taken >= DAILY_CAPACITY) {
    throw new Error('SOLD_OUT');
  }

  const expiresAt = new Date(Date.now() + HOLD_MINUTES * 60 * 1000);
  const result = await pool.query(
    `INSERT INTO slot_reservations (slot_date, session_id, status, hold_expires_at)
     VALUES ($1, $2, 'held', $3)
     RETURNING id, slot_date::text AS "slotDate", status, hold_expires_at AS "holdExpiresAt"`,
    [date, sessionId, expiresAt]
  );
  return result.rows[0];
}

export async function confirmHold(reservationId: string) {
  const result = await pool.query(
    `UPDATE slot_reservations SET status = 'confirmed'
     WHERE id = $1 AND status = 'held' AND hold_expires_at > now()
     RETURNING id, slot_date::text AS "slotDate", status`,
    [reservationId]
  );
  return result.rows[0];
}
