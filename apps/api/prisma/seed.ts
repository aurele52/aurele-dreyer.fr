import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function createUsers() {
  await prisma.user.deleteMany({});

  const amountOfUsers = 50;

  const users = [];

  const userStatus = ['ONLINE', 'OFFLINE', 'INGAME'];

  for (let i = 0; i < amountOfUsers; i++) {
    const user = {
      username: faker.internet.userName(),
      avatar_url: faker.image.avatar(),
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

  const channels = [];

  const chanType = ['DM', 'PUBLIC', 'PROTECTED', 'PRIVATE'];

  for (let i = 0; i < amountOfChannels; i++) {
    const type = chanType[faker.number.int({ min: 0, max: 3 })];
    const channel = {
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

  const userChannels = [];

  const roles = ['MEMBER', 'ADMIN', 'OWNER'];

  for (let i = 0; i < amountOfUserChannels; i++) {
    const userChannel = {
      user_id: faker.number.int({ min: 1, max: 50 }),
      channel_id: faker.number.int({ min: 1, max: 15 }),
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
  await prisma.userAchievement.deleteMany({});

  const amountOfUserAchievements = 100;

  const userAchievements = [];

  const achievements = ['WINS10PLUS', 'POINTS100PLUS', 'WINSINLESSTHAN1M'];

  for (let i = 0; i < amountOfUserAchievements; i++) {
    const userAchievement = {
      user_id: faker.number.int({ min: 1, max: 50 }),
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

async function createMatches() {
  await prisma.match.deleteMany({});

  const amountOfMatches = 100;

  const matches = [];

  for (let i = 0; i < amountOfMatches; i++) {
    const match = {
      on_going: false,
      created_at: faker.date.past(),
      updated_at: faker.date.recent(),
    };

    matches.push(match);
  }

  const addMatches = async () => prisma.match.createMany({ data: matches });

  addMatches();
}

async function createMatchPlayers() {
  await prisma.matchPlayer.deleteMany({});

  const amountOfMatchPlayers = 200;
  const matchPlayers = [];
  const uniquePairs = new Set();

  while (matchPlayers.length < amountOfMatchPlayers) {
    const userId = faker.number.int({ min: 1, max: 50 });
    const matchId = faker.number.int({ min: 1, max: 100 });
    const pair = `${userId}-${matchId}`;

    if (!uniquePairs.has(pair)) {
      uniquePairs.add(pair);

      const matchPlayer = {
        user_id: userId,
        match_id: matchId,
        score: faker.number.int({ min: 0, max: 11 }),
        winner: faker.number.int() % 2 === 0,
        created_at: faker.date.past(),
        updated_at: faker.date.recent(),
      };

      matchPlayers.push(matchPlayer);
    }
  }

  const addMatchPlayers = async () =>
    prisma.matchPlayer.createMany({ data: matchPlayers });
  addMatchPlayers();
}

async function createFirendships() {
  await prisma.friendship.deleteMany({});

  const amountOfFriendships = 200;

  const friendships = [];

  for (let i = 0; i < amountOfFriendships; i++) {
    const friendship = {
      user1_id: faker.number.int({ min: 1, max: 50 }),
      user2_id: faker.number.int({ min: 1, max: 50 }),
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
  await createChannels();
  await createUserChannels();
  await createMessages();
  await createUserAchievements();
  await createMatches();
  await createMatchPlayers();
  await createFirendships();
  console.log('Seed complete!');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
