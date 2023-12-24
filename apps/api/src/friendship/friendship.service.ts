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
}
