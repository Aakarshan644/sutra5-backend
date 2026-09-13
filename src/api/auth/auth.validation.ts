import { RegisterInput, LoginInput } from './auth.types';

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

const REQUIRED_FIELDS: (keyof RegisterInput)[] = [
  'firstName', 'lastName', 'username', 'email', 'phone', 'address', 'city', 'district', 'password',
];

export function validateRegister(input: Partial<RegisterInput>): ValidationResult {
  const errors: string[] = [];

  for (const field of REQUIRED_FIELDS) {
    if (!input[field] || input[field]!.trim().length === 0) {
      errors.push(`${field} is required.`);
    }
  }

  if (input.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
    errors.push('Email is not valid.');
  }

  if (input.password && input.password.length < 8) {
    errors.push('Password must be at least 8 characters.');
  }

  return { valid: errors.length === 0, errors };
}

export function validateLogin(input: Partial<LoginInput>): ValidationResult {
  const errors: string[] = [];
  if (!input.email) errors.push('Email is required.');
  if (!input.password) errors.push('Password is required.');
  return { valid: errors.length === 0, errors };
}
