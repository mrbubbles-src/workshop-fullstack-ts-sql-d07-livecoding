import { db } from '../db/index.js';
import { operatorsTable, unclassifiedMemoriesTable } from '../db/schema.js';
import { GlobalError, operatorRole } from '../types/types.js';
import { or, eq } from 'drizzle-orm';
import { hashPassword } from '../lib/auth/auth.js';

export interface RegisterUserDataProps {
  operator_name: string;
  email: string;
  password: string;
  role?: operatorRole;
  memory_level?: number;
}

export const registerUser = async (data: RegisterUserDataProps) => {
  try {
    const user = await db
      .select()
      .from(operatorsTable)
      .where(
        or(
          eq(operatorsTable.operator_name, data.operator_name),
          eq(operatorsTable.email, data.email),
        ),
      );

    if (user.length > 0) {
      const error: GlobalError = new Error(
        'Operatorname or email already exists',
      );
      error.statusCode = 400;
      throw error;
    }
    if (data.password.length < 8) {
      const error: GlobalError = new Error(
        'Password must be at least 8 characters long',
      );
      error.statusCode = 400;
      throw error;
    }

    const hashedPassword = await hashPassword(data.password, 16);

    const newUser = await db.insert(operatorsTable).values({
      operator_name: data.operator_name,
      email: data.email,
      password: hashedPassword,
      ...(data.role && { role: data.role }),
      ...(data.memory_level && { memory_level: data.memory_level.toString() }),
    });

    if (!newUser) {
      const error: GlobalError = new Error('Failed to create Operator');
      error.statusCode = 500;
      throw error;
    }

    console.log('Operator created successfully:', data.operator_name);
    return newUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createMemories = async (memories: string[]) => {
  try {
    for (const memory of memories) {
      await db.insert(unclassifiedMemoriesTable).values({
        memory: memory,
      });
    }
    console.log('Memories created successfully');
  } catch (error) {
    console.error('Error creating memories:', error);
    throw error;
  }
};
