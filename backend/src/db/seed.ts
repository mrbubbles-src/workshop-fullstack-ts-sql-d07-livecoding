import {
  createMemories,
  registerUser,
  RegisterUserDataProps,
} from '../lib/utils.js';
import { db } from './index.js';
import { operatorTable, unclassifiedMemoriesTable } from './schema.js';
import { memories } from '../data/memories.js';

const seedMemoriesDatabase = async () => {
  try {
    await db.delete(unclassifiedMemoriesTable);
    console.log('All unclassified memories deleted');

    console.log('Seeding unclassified memories...');

    await createMemories(memories);
  } catch (error) {}
};

const seedOperatorsDatabase = async () => {
  const operatorNumber = () => Math.floor(Math.random() * 10000);

  try {
    await db.delete(operatorTable);
    console.log('All operators deleted');

    console.log('Seeding operators');

    await registerUser({
      operator_name: `o_admin_${operatorNumber()}`,
      email: `o_admin_${operatorNumber()}@memodex.com`,
      password: 'admin!1234',
      role: 'admin',
      memory_level: 100.0,
    });

    for (let i = 0; i <= 12; i++) {
      const operator: RegisterUserDataProps = {
        operator_name: `operator_${operatorNumber()}`,
        email: `operator_${operatorNumber()}@memodex.com`,
        password: `operator!1234`,
      };
      await registerUser(operator);
    }
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};
seedMemoriesDatabase()
  .then(() => seedOperatorsDatabase())
  .then(() => process.exit(0));
