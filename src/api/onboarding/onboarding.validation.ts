import { BirthDataInput } from './onboarding.types';

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export function validateBirthData(input: Partial<BirthDataInput>): ValidationResult {
  const errors: string[] = [];

  if (!input.firstName || input.firstName.trim().length === 0) {
    errors.push('First name is required.');
  }

  if (!input.dob || !/^\d{4}-\d{2}-\d{2}$/.test(input.dob)) {
    errors.push('Date of birth must be provided in YYYY-MM-DD format.');
  } else {
    const date = new Date(input.dob);
    if (isNaN(date.getTime()) || date > new Date()) {
      errors.push('Date of birth is not a valid past date.');
    }
  }

  if (!input.birthplace || input.birthplace.trim().length === 0) {
    errors.push('Birthplace is required.');
  }

  if (input.birthTime && !/^\d{2}:\d{2}$/.test(input.birthTime)) {
    errors.push('Birth time must be in HH:MM format if provided.');
  }

  return { valid: errors.length === 0, errors };
}
