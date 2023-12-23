import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function createUsers() {
  const amountOfUsers = 50;

  const users = [];

  for (let i = 0; i < amountOfUsers; i++) {
    const user = {
      username: faker.internet.userName(),
      avatar_url: faker.image.avatar(),
      auth42_id: faker.number.int().toString(),
      created_at: faker.date.past(),
      updated_at: faker.date.recent(),
    };

    users.push(user);
  }

  const addUsers = async () => await prisma.user.createMany({ data: users });

  await addUsers();
}

async function createChannels() {
  const amountOfChannels = 15;

  const channels = [];

  const chanType = ['PUBLIC', 'PROTECTED', 'PRIVATE'];

  for (let i = 0; i < amountOfChannels; i++) {
    const type = chanType[faker.number.int({ min: 0, max: 2 })];
    const channel = {
      name: faker.word.words({ count: { min: 1, max: 3 } }),
      topic: faker.lorem.lines({ min: 1, max: 4 }),
      type: type,
      password: type === 'PROTECTED' ? faker.word.words() : undefined,
      created_at: faker.date.past(),
      updated_at: faker.date.recent(),
    };

    channels.push(channel);
  }

  const addChannels = async () =>
    await prisma.channel.createMany({ data: channels });

  addChannels();
}

async function createDMs() {
  const userPool = await prisma.user.findMany();
  const amountOfChannels = 15;
  const idPairs: [number, number][] = [];

  for (let i = 0; i < amountOfChannels; i++) {
    let a = 0;
    let b = 0;
    while (a === b || idPairs.includes([a, b]) || idPairs.includes([b, a])) {
      a = faker.number.int({ min: 0, max: userPool.length - 1 });
      b = faker.number.int({ min: 0, max: userPool.length - 1 });
    }
    idPairs.push([a, b]);
    const userA = userPool[a];
    const userB = userPool[b];

    await prisma.channel.create({
      data: {
        name: faker.word.words({ count: { min: 1, max: 3 } }),
        topic: faker.lorem.lines({ min: 1, max: 4 }),
        type: 'DM',
        created_at: faker.date.past(),
        updated_at: faker.date.recent(),
        userChannels: {
          createMany: {
            data: [
              {
                user_id: userA.id,
                role: 'MEMBER',
              },
              {
                user_id: userB.id,
                role: 'MEMBER',
              },
            ],
          },
        },
      },
    });
  }
}

async function createMessages() {
  const amountOfMessages = 100;

  const messages = [];

  for (let i = 0; i < amountOfMessages; i++) {
    const message = {
      user_id: faker.number.int({ min: 1, max: 50 }),
      channel_id: faker.number.int({ min: 1, max: 15 }),
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
  const userPool = await prisma.user.findMany();

  const amountOfUserAchievements = 100;

  const userAchievements = [];

  const achievements = ['WELCOME', 'TASTEOFV', 'WINS10PLUS', 'WIN10RAW', 'NEMESIS', 'FIRST', 'POINTS100PLUS', 'WINSINLESSTHAN1M', 'ENDLESSSTAMINA'];

  for (let i = 0; i < amountOfUserAchievements; i++) {
    const userAchievement = {
      user_id:
        userPool[faker.number.int({ min: 0, max: userPool.length - 1 })].id,
      achievement: achievements[faker.number.int({ min: 0, max: 8 })],
      created_at: faker.date.past(),
      updated_at: faker.date.recent(),
    };

    userAchievements.push(userAchievement);
  }

  const addUserAchievements = async () =>
    await prisma.userAchievement.createMany({ data: userAchievements });

  addUserAchievements();
}

async function createMatches() {
  const userPool = await prisma.user.findMany();
  const amountOfChannels = 500;
  const idPairs: [number, number][] = [];

  for (let i = 0; i < amountOfChannels; i++) {
    let a = 0;
    let b = 0;
    while (a === b || idPairs.includes([a, b]) || idPairs.includes([b, a])) {
      a = faker.number.int({ min: 0, max: userPool.length - 1 });
      b = faker.number.int({ min: 0, max: userPool.length - 1 });
    }
    idPairs.push([a, b]);
    const userA = userPool[a];
    const userB = userPool[b];

    await prisma.match.create({
      data: {
        on_going: true,
        created_at: faker.date.past(),
        updated_at: faker.date.recent(),
        players: {
          createMany: {
            data: [
              {
                user_id: userA.id,
                score: faker.number.int({ min: 0, max: 11 }),
                winner: faker.number.int() % 2 === 0,
              },
              {
                user_id: userB.id,
                score: faker.number.int({ min: 0, max: 11 }),
                winner: faker.number.int() % 2 === 0,
              },
            ],
          },
        },
      },
    });
  }
}

async function createFirendships() {
  const amountOfFriendships = 200;
  const userPool = await prisma.user.findMany();
  const friendships = [];

  for (let i = 0; i < amountOfFriendships; i++) {
    const userA =
      userPool[faker.number.int({ min: 0, max: userPool.length - 1 })];
    const userB =
      userPool[faker.number.int({ min: 0, max: userPool.length - 1 })];
    const friendship = {
      user1_id: userA.id,
      user2_id: userB.id,
      created_at: faker.date.past(),
      updated_at: faker.date.recent(),
    };

    friendships.push(friendship);
  }

  const addFriendships = async () =>
    prisma.friendship.createMany({ data: friendships });

  addFriendships();
}

async function main() {
  await createUsers();
  await createDMs();
  await createChannels();
  await createMessages();
  await createUserAchievements();
  await createMatches();
  await createFirendships();
  console.log('Seed complete!');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
