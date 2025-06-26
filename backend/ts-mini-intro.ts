let hallo: number = 10;

console.log(hallo);

// hallo = 'hallo';
// hallo = false;

const object1: { name: string; age: number } = { name: 'Randy', age: 18 };

export type Person = { name: string; age: number };

export type Address = { address: { street: string } };

export type FullPersonData = Person & Address;

const object2: FullPersonData = {
  name: 'Randy',
  age: 18,
  address: { street: 'musterstraße' },
};
const object3: Person = {
  name: 'Randy',
  age: 18,
};
const object4: Address = {
  address: { street: 'musterstraße' },
};

export interface Haustiere {
  dog: string;
  cat: string;
}

export interface MehrHaustiere extends Haustiere {
  turtle: string;
}

const pets: MehrHaustiere = {
  dog: 'Fiffi',
  cat: 'mauzi',
  turtle: 'Horst',
};

console.log(object1, object2, object3, object4, pets);

export type EmployeeRole =
  | 'Manager'
  | 'Regular Employee'
  | 'Facility Manager'
  | 'Elektrotechniker';

export interface Employees {
  name: string;
  age: number;
  role: EmployeeRole;
}

const employee: Employees = {
  name: 'Luca',
  age: 20,
  role: 'Elektrotechniker',
};

export type Tuple = [string, number, string, number];
export type Tuple2 = [string, number][];

const persons: Tuple = ['Patricia', 20, 'Ben', 25];
const persons2: Tuple2 = [
  ['Patricia', 20],
  ['Ben', 25],
];

console.log(employee, persons, persons2);
