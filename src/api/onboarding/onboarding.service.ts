import { pool } from '../../config/db';
import { BirthDataInput, BirthDataRecord } from './onboarding.types';

export async function saveBirthData(input: BirthDataInput): Promise<BirthDataRecord> {
  const result = await pool.query(
    `INSERT INTO birth_inputs (first_name, dob, birthplace, birth_time)
     VALUES ($1, $2, $3, $4)
     RETURNING id, first_name AS "firstName", dob::text, birthplace, birth_time AS "birthTime", created_at AS "createdAt"`,
    [input.firstName, input.dob, input.birthplace, input.birthTime || null]
  );
  return result.rows[0];
}

export async function getBirthDataById(id: string): Promise<BirthDataRecord | undefined> {
  const result = await pool.query(
    `SELECT id, first_name AS "firstName", dob::text, birthplace, birth_time AS "birthTime", created_at AS "createdAt"
     FROM birth_inputs WHERE id = $1`,
    [id]
  );
  return result.rows[0];
}
