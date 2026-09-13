export interface RegisterInput {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface UserRecord {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  createdAt: string;
}
