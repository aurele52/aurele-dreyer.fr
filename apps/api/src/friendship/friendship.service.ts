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
}
