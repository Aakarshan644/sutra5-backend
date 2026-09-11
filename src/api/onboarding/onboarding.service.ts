import { randomUUID } from 'crypto';
import { BirthDataInput, BirthDataRecord } from './onboarding.types';

// Temporary in-memory store — will be replaced by a PostgreSQL repository
// once the database is set up. Data does not persist across server restarts.
const records = new Map<string, BirthDataRecord>();

export function saveBirthData(input: BirthDataInput): BirthDataRecord {
  const record: BirthDataRecord = {
    ...input,
    id: randomUUID(),
    createdAt: new Date().toISOString(),
  };
  records.set(record.id, record);
  return record;
}

export function getBirthDataById(id: string): BirthDataRecord | undefined {
  return records.get(id);
}
