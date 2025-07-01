import { eq, or } from 'drizzle-orm';
import { db } from '../db/index.js';
import { operatorTable, unclassifiedMemoriesTable } from '../db/schema.js';
import { GlobalError, operatorRole } from '../types/types.js';
import { hashPassword } from './auth/auth.js';

export interface RegisterUserDataProps {
  operator_name: string;
  email: string;
  password: string;
  role?: operatorRole;
  memory_level?: number;
}

export const registerUser = async (data: RegisterUserDataProps) => {
  try {
    const operator = await db
      .select()
      .from(operatorTable)
      .where(
        or(
          eq(operatorTable.email, data.email),
          eq(operatorTable.operator_name, data.operator_name),
        ),
      );

    if (operator.length > 0) {
      const error: GlobalError = new Error(
        'Operatorname or email already exists',
      );
      error.statusCode = 400;
      throw error;
    }
    if (data.password.length <= 8) {
      const error: GlobalError = new Error(
        'Password must be at least 8 characters long',
      );
      error.statusCode = 400;
      throw error;
    }

    const hashedPassword = await hashPassword(data.password, 12);

    const newOperator = await db.insert(operatorTable).values({
      operator_name: data.operator_name,
      email: data.email,
      password: hashedPassword,
      ...(data.role && { role: data.role }),
      ...(data.memory_level && { memory_level: data.memory_level.toString() }),
    });

    if (!newOperator) {
      const error: GlobalError = new Error('Failed to create Operator');
      error.statusCode = 500;
      throw error;
    }

    console.log('Operator created successfully:', data.operator_name);
    return newOperator;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createMemories = async (memories: Array<string>) => {
  try {
    for (const memory of memories) {
      await db.insert(unclassifiedMemoriesTable).values({ memory: memory });
    }
    console.log('Memories created successfully');
  } catch (error) {
    console.error('Error creating memories:', error);
    throw error;
  }
};
