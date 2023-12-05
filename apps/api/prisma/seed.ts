import {
  PrismaClient,
  User,
  UserStatus,
  Channel,
  ChanType,
  UserChannel,
  Role,
  Message,
  UserAchievement,
  Achievement,
} from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function createUsers() {
  await prisma.user.deleteMany({});

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

async function createChannels() {
  await prisma.channel.deleteMany({});

  const amountOfChannels = 15;

  const channels: Channel[] = [];

  const chanType: ChanType[] = ['DM', 'PUBLIC', 'PROTECTED', 'PRIVATE'];

  for (let i = 0; i < amountOfChannels; i++) {
    const type: ChanType = chanType[faker.number.int({ min: 0, max: 3 })];
    const channel: Channel = {
      id: i,
      name: faker.word.words({ count: { min: 1, max: 3 } }),
      type: type,
      password: type === 'PROTECTED' ? '' : faker.word.words(),
      created_at: faker.date.past(),
      updated_at: faker.date.recent(),
    };

    channels.push(channel);
  }

  const addChannels = async () =>
    await prisma.channel.createMany({ data: channels });

  addChannels();
}

async function createUserChannels() {
  await prisma.userChannel.deleteMany({});

  const amountOfUserChannels = 40;

  const userChannels: UserChannel[] = [];

  const roles: Role[] = ['MEMBER', 'ADMIN', 'OWNER'];

  for (let i = 0; i < amountOfUserChannels; i++) {
    const userChannel: UserChannel = {
      id: i,
      user_id: faker.number.int({ min: 0, max: 49 }),
      channel_id: faker.number.int({ min: 0, max: 14 }),
      role: roles[faker.number.int({ min: 0, max: 2 })],
      ban: faker.date.future(),
      mute: faker.date.future(),
      created_at: faker.date.past(),
      updated_at: faker.date.recent(),
    };

    userChannels.push(userChannel);
  }

  const addUserChannels = async () =>
    await prisma.userChannel.createMany({ data: userChannels });

  addUserChannels();
}

async function createMessages() {
  await prisma.message.deleteMany({});

  const amountOfMessages = 100;

  const messages: Message[] = [];

  for (let i = 0; i < amountOfMessages; i++) {
    const message: Message = {
      id: i,
      user_id: faker.number.int({ min: 0, max: 49 }),
      channel_id: faker.number.int({ min: 0, max: 14 }),
      content: faker.lorem.sentences({ min: 1, max: 3 }),
      created_at: faker.date.past(),
      updated_at: faker.date.recent(),
    };

    messages.push(message);
  }

  const addMessages = async () =>
    await prisma.message.createMany({ data: messages });

  addMessages();
}

async function createUserAchievements() {
  await prisma.userAchievement.deleteMany({});

  const amountOfUserAchievements = 100;

  const userAchievements: UserAchievement[] = [];

  const achievements: Achievement[] = [
    'WINS10PLUS',
    'POINTS100PLUS',
    'WINSINLESSTHAN1M',
  ];

  for (let i = 0; i < amountOfUserAchievements; i++) {
    const userAchievement: UserAchievement = {
      id: i,
      user_id: faker.number.int({ min: 0, max: 49 }),
      achievement: achievements[faker.number.int({ min: 0, max: 2 })],
      created_at: faker.date.past(),
      updated_at: faker.date.recent(),
    };

    userAchievements.push(userAchievement);
  }

  const addUserAchievements = async () =>
    await prisma.userAchievement.createMany({ data: userAchievements });

  addUserAchievements();
}

async function main() {
  createUsers();
  createChannels();
  createUserChannels();
  createMessages();
  createUserAchievements();
  console.log('Seed complete!');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
