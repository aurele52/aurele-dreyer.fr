import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { FriendshipStatus } from '@prisma/client';

@Injectable()
export class FriendshipService {
  constructor(private readonly prisma: PrismaService) {}

  async userFriendships(id: number) {
    return await this.prisma.friendship.findMany({
      where: {
        OR: [{ user1_id: id }, { user2_id: id }],
      },
    });
  }

  async userFriendship(selfId: number, targetId: number) {
    if (!selfId || !targetId) return {};
    const friendship = await this.prisma.friendship.findFirst({
      where: {
        OR: [
          {
            AND: [
              {
                user1_id: selfId,
              },
              {
                user2_id: targetId,
              },
            ],
          },
          {
            AND: [
              {
                user2_id: selfId,
              },
              {
                user1_id: targetId,
              },
            ],
          },
        ],
      },
    });
    if (!friendship) {
      return null;
    }
    return {
      id: friendship.id,
      user1_id: friendship.user1_id,
      user2_id: friendship.user2_id,
      status: friendship.status,
    };
  }

  async deleteFriends(user1_id, user2_id) {
    return await this.prisma.friendship.deleteMany({
      where: {
        OR: [
          { user1_id: user1_id, user2_id: user2_id },
          { user1_id: user2_id, user2_id: user1_id },
        ],
        status: FriendshipStatus.FRIENDS,
      },
    });
  }

  async deletePending(user1_id, user2_id) {
    return await this.prisma.friendship.deleteMany({
      where: {
        OR: [
          { user1_id: user1_id, user2_id: user2_id },
          { user1_id: user2_id, user2_id: user1_id },
        ],
        status: FriendshipStatus.PENDING,
      },
    });
  }

  async deleteBlocked(user1_id, user2_id) {
    return await this.prisma.friendship.deleteMany({
      where: {
        OR: [
          { user1_id: user1_id, user2_id: user2_id },
          { user1_id: user2_id, user2_id: user1_id },
        ],
        status: FriendshipStatus.BLOCKED,
      },
    });
  }

  async deleteFriendship(user1_id, user2_id) {
    return await this.prisma.friendship.deleteMany({
      where: {
        AND: [
          {
            OR: [
              { user1_id: user1_id, user2_id: user2_id },
              { user1_id: user2_id, user2_id: user1_id },
            ],
          },
          {
            OR: [
              { status: FriendshipStatus.FRIENDS },
              { status: FriendshipStatus.PENDING },
            ],
          },
        ],
      },
    });
  }

  async createFriendship(user1_id: number, user2_id: number) {
    return await this.prisma.friendship.create({
      data: {
        user1: {
          connect: {
            id: user1_id,
          },
        },
        user2: {
          connect: {
            id: user2_id,
          },
        },
        status: FriendshipStatus.PENDING,
      },
    });
  }

  async createBlockedFriendship(user1_id: number, user2_id: number) {
    const currentFriendship = await this.userFriendship(user1_id, user2_id);
    if (currentFriendship) {
      if (currentFriendship.status == FriendshipStatus.BLOCKED) return;
      else this.deleteFriendship(user1_id, user2_id);
    }
    return await this.prisma.friendship.create({
      data: {
        user1: {
          connect: {
            id: user1_id,
          },
        },
        user2: {
          connect: {
            id: user2_id,
          },
        },
        status: FriendshipStatus.BLOCKED,
      },
    });
  }

  async getPendingInvitations(id: number) {
    console.log('Get pending invit');
    const invitations = await this.prisma.friendship.findMany({
      where: {
        OR: [
          {
            user1_id: id,
            status: 'PENDING',
          },
          {
            user2_id: id,
            status: 'PENDING',
          },
        ],
      },
      include: {
        user1: true,
        user2: true,
      },
    });

    const res = invitations.map((invit) => {
      return {
        id: invit.user1_id === id ? invit.user2_id : invit.user1_id,
        type: invit.user1_id === id ? 'sent' : 'received',
        username:
          invit.user1_id === id ? invit.user2.username : invit.user1.username,
      };
    });
    return res;
  }

  async getBlockedList(id: number) {
    const blocked = await this.prisma.friendship.findMany({
      where: {
        user1_id: id,
        status: 'BLOCKED',
      },
      include: {
        user2: true,
      },
    });

    const res = blocked.map((friendship) => {
      return {
        id: friendship.user2_id,
        username: friendship.user2.username,
      };
    });

    return res;
  }
}
