import { db } from '../db/index.js';
import {
  classifiedMemoriesTable,
  operatorsTable,
  restoredMemoriesTable,
  unclassifiedMemoriesTable,
} from '../db/schema.js';
import { MemoryStatus, UnclassifiedMemory } from '../types/types.js';
import { eq, sql } from 'drizzle-orm';

export const restoreMemory = async (
  memory: UnclassifiedMemory,
  operatorId: string,
) => {
  const restoredMemory = {
    ...memory,
    operator_id: operatorId,
    status: 'restored' as MemoryStatus,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  try {
    await db.insert(restoredMemoriesTable).values(restoredMemory);

    await db
      .update(operatorsTable)
      .set({ memory_level: sql`${operatorsTable.memory_level} + 0.01` })
      .where(eq(operatorsTable.id, operatorId));

    await db
      .delete(unclassifiedMemoriesTable)
      .where(eq(unclassifiedMemoriesTable.id, memory.id));
  } catch (error) {
    throw new Error(`Error restoring memory or updating operator: ${error}`);
  }
};

export const classifyMemory = async (memory: UnclassifiedMemory) => {
  const splitMemory = memory.memory.split(' ');

  const classifiedMemory = splitMemory
    .map((word) => {
      const classifyWord = Math.random() < 0.5;

      if (classifyWord) {
        const notClassfiedChars = [' ', '.', ',', '!', '?', "'", '"', '-', '_'];

        const classifiedWord = word
          .split('')
          .map((char) => {
            if (!notClassfiedChars.includes(char)) {
              char = '*';
            }
            return char;
          })
          .join('');

        return classifiedWord;
      }
      return word;
    })
    .join(' ');

  try {
    await db.insert(classifiedMemoriesTable).values({
      ...memory,
      memory: classifiedMemory,
      status: 'classified' as MemoryStatus,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    await db
      .delete(unclassifiedMemoriesTable)
      .where(eq(unclassifiedMemoriesTable.id, memory.id));
  } catch (error) {
    console.error('Error inserting classified memory:', error);
  }
};
