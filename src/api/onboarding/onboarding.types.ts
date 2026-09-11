export interface BirthDataInput {
  firstName: string;
  dob: string;        // YYYY-MM-DD
  birthplace: string;
  birthTime?: string; // HH:MM, optional (approximate/unknown allowed)
}

export interface BirthDataRecord extends BirthDataInput {
  id: string;
  createdAt: string;
}
