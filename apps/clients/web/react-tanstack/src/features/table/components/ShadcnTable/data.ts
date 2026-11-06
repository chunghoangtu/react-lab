import { faker } from "@faker-js/faker";

const createUser = (numUser: number) => {
  const users: User[] = Array.from({ length: numUser }, () => ({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    age: faker.number.int({ min: 18, max: 90 }),
    email: faker.internet.email(),
    comments: faker.lorem.sentences(3),
  }));
  return users;
};

export const data: User[] = [...createUser(10000)];
