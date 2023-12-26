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
    });

    const res = invitations.map((invit) => {
      return {
        id: invit.user1_id === id ? invit.user2_id : invit.user1_id,
        senderId: invit.user1_id,
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
    });

    const res = blocked.map((user) => {
      return {
        id: user.user2_id,
      };
    });

    return res;
  }
}
