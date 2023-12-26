import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

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
