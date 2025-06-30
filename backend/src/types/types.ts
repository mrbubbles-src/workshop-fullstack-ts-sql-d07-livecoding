export interface GlobalError extends Error {
  statusCode?: number;
}

export type operatorRole = 'admin' | 'operator';

export interface Operator {
  id: string;
  operator_name: string;
  email: string;
  password: string;
  role: operatorRole;
  memory_level: number;
  created_at: string;
  updated_at: string;
}

export type JWTPayload = Pick<
  Operator,
  'id' | 'operator_name' | 'role' | 'memory_level'
> & { iat?: number; exp?: number };
