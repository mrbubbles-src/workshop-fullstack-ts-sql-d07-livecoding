import { sql } from 'drizzle-orm';
import {
  numeric,
  pgEnum,
  pgTable,
  timestamp,
  text,
  check,
} from 'drizzle-orm/pg-core';

export const operatorRole = pgEnum('role', ['admin', 'operator']);

export const memoryStatus = pgEnum('status', [
  'unclassified',
  'classified',
  'in_progress',
  'restored',
]);

export const operatorsTable = pgTable(
  'operators',
  {
    id: text()
      .primaryKey()
      .default(sql`gen_random_uuid()`)
      .notNull(),
    operator_name: text().notNull().unique(),
    email: text().notNull().unique(),
    password: text().notNull(),
    role: operatorRole().default('operator'),
    memory_level: numeric({ precision: 5, scale: 2 }).default('0.00'),
    created_at: timestamp({ precision: 3, mode: 'string' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updated_at: timestamp({ precision: 3, mode: 'string' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    check('password_min_length', sql`char_length(${table.password}) >= 8`),
  ],
);

export const unclassifiedMemoriesTable = pgTable('unclassifiedMemories', {
  id: text()
    .primaryKey()
    .default(sql`gen_random_uuid()`)
    .notNull(),
  memory: text().notNull(),
  status: memoryStatus().default('unclassified').notNull(),
  created_at: timestamp({ precision: 3, mode: 'string' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updated_at: timestamp({ precision: 3, mode: 'string' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const classifiedMemoriesTable = pgTable('classifiedMemories', {
  id: text().primaryKey().notNull(),
  memory: text().notNull(),
  status: memoryStatus().default('classified').notNull(),
  created_at: timestamp({ precision: 3, mode: 'string' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updated_at: timestamp({ precision: 3, mode: 'string' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const restoredMemoriesTable = pgTable('restoredMemories', {
  id: text().primaryKey().notNull(),
  memory: text().notNull(),
  operator_id: text()
    .references(() => operatorsTable.id)
    .notNull(),
  status: memoryStatus().default('restored').notNull(),
  created_at: timestamp({ precision: 3, mode: 'string' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updated_at: timestamp({ precision: 3, mode: 'string' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});
