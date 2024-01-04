import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class LadderService {
  private ladder: {
    id: number;
    username: string;
    avatar_url: string;
    win_count: number;
    rank: number;
  }[] = [];

  constructor(private readonly prisma: PrismaService) {}

  private async generateLadder() {
    const users = await this.prisma.user.findMany({
      where: {
        isDeleted: false,
      },
    });

    const winCounts = await Promise.all(
      users.map(async (user) => {
        const count = await this.prisma.matchPlayer.count({
          where: {
            user_id: user.id,
            winner: true,
          },
        });
        return { userId: user.id, winCount: count };
      }),
    );

    const ladder = users.map((user) => {
      const winCount =
        winCounts.find((wc) => wc.userId === user.id)?.winCount || 0;
      return {
        id: user.id,
        username: user.username,
        avatar_url: user.avatar_url,
        win_count: winCount,
        rank: 0,
      };
    });

    ladder.sort((a, b) => b.win_count - a.win_count);

    ladder.forEach((user, index) => {
      user.rank = index + 1;
    });

    return ladder;
  }

  async updateLadder() {
    this.ladder = await this.generateLadder();
  }

  async listLadder() {
    await this.updateLadder();
    return this.ladder;
  }

  async getRank(id: number) {
    const ladder = await this.listLadder();

    const user = ladder.find((u) => u.id === id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user.rank;
  }
}
