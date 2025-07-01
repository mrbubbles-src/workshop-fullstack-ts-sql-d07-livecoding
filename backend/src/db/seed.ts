import {
  createMemories,
  registerUser,
  RegisterUserDataProps,
} from '../lib/utils.js';
import { db } from '../db/index.js';
import { operatorsTable, unclassifiedMemoriesTable } from '../db/schema.js';
import { memories } from '../data/memories.js';

const seedMemoriesDatabase = async () => {
  try {
    await db.delete(unclassifiedMemoriesTable);
    console.log('✅ All unclassified memories deleted');

    console.log('Seeding unclassified memories...');

    await createMemories(memories);
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

const seedOperatorsDatabase = async () => {
  const operatorNumber = () => Math.floor(Math.random() * 10000);
  try {
    await db.delete(operatorsTable);
    console.log('✅ All operators deleted');

    console.log('Seeding operators...');
    await registerUser({
      operator_name: `o_admin_${operatorNumber()}`,
      email: `o_admin_${operatorNumber()}@memodex.com`,
      password: 'admin!123',
      role: 'admin',
      memory_level: 100.0,
    });

    const operatorEmails: string[] = [];

    for (let i = 0; i <= 12; i++) {
      const operator: RegisterUserDataProps = {
        operator_name: `operator_${operatorNumber()}`,
        email: `operator_${operatorNumber()}@memodex.com`,
        password: `operator!123`,
        role: 'operator',
      };
      await registerUser(operator);
      operatorEmails.push(operator.email);
    }
    console.log('✅ Operators created successfully:', operatorEmails);
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};
seedMemoriesDatabase()
  .then(() => seedOperatorsDatabase())
  .then(() => process.exit(0));
