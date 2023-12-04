import { PrismaClient, User, UserStatus } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function createUsers() {
  await prisma.user.deleteMany({}); // use with caution.

  const amountOfUsers = 50;

  const users: User[] = [];

  const userStatus: UserStatus[] = ['ONLINE', 'OFFLINE', 'INGAME'];

  for (let i = 0; i < amountOfUsers; i++) {
    const user: User = {
      id: i,
      username: faker.internet.userName(),
      avatar_url: faker.internet.url(),
      auth42_id: faker.number.int().toString(),
      user_state: userStatus[faker.number.int({ min: 0, max: 2 })],
      created_at: faker.date.past(),
      updated_at: faker.date.recent(),
    };

    users.push(user);
  }

  const addUsers = async () => await prisma.user.createMany({ data: users });

  addUsers();
}

async function main() {
  createUsers();
  console.log('Seed complete!');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
