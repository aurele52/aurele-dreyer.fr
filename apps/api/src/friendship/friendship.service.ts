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

  async getPendingInvitations(id: number) {
    console.log('Get pending invit');
    const invitations = await this.prisma.friendship.findMany({
      where: {
        OR: [
          {
            user1_id: id,
            status: FriendshipStatus.PENDING,
          },
          {
            user2_id: id,
            status: FriendshipStatus.PENDING,
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
        senderId: invit.user1_id,
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
        status: FriendshipStatus.BLOCKED,
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

  async acceptFriendship(user1_id: number, user2_id: number) {
    return await this.prisma.friendship.update({
      where: {
        user1_id_user2_id: {
          user1_id,
          user2_id,
        },
      },
      data: {
        status: FriendshipStatus.FRIENDS,
      },
    });
  }
}
