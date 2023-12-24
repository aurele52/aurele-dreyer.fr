import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FriendslistService {
  constructor(private readonly prisma: PrismaService) {}

  async getList(id: number) {
    const friends = await this.prisma.friendship.findMany({
      where: {
        OR: [
          {
            user1_id: id,
          },
          {
            user2_id: id,
          },
        ],
      },
      include: {
        user1: true,
        user2: true,
      },
    });

    const friendsList = friends.map((friend) => {
      const user = friend.user1_id == id ? friend.user2 : friend.user1;
      return {
        userid: user.id,
        username: user.username,
        avatar_url: user.avatar_url,
        online: true, ///TO CHANGE
      };
    });
    return friendsList;
  }
}
