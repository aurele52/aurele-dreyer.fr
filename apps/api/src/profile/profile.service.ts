import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { LadderService } from 'src/ladder/ladder.service';
import { FriendshipService } from 'src/friendship/friendship.service';

@Injectable()
export class ProfileService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly ladder: LadderService,
    private readonly frienship: FriendshipService,
  ) {}

  private logAndThrowNotFound(id: number, entity: string) {
    console.error(`User with ID ${id} not found`);
    throw new NotFoundException(`${entity} not found`);
  }

  async profile(id: number, self_id: number) {
    if (!id) {
      this.logAndThrowNotFound(id, 'User');
    }

    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      this.logAndThrowNotFound(id, 'User');
    }

    const winCount = await this.prisma.matchPlayer.count({
      where: {
        user_id: id,
        winner: true,
        match: {
          type: 'NORMAL',
        },
      },
    });

    const looseCount = await this.prisma.matchPlayer.count({
      where: {
        user_id: id,
        winner: false,
        match: {
          type: 'NORMAL',
        },
      },
    });

    const achievementLvl = await this.prisma.userAchievement.count({
      where: {
        user_id: id,
      },
    });

    const rank = await this.ladder.getRank(user.id);
    if (self_id == 0) {
      return {
        id: user.id,
        username: user.username,
        avatar_url: user.avatar_url,
        win_count: winCount,
        loose_count: looseCount,
        achievement_lvl: achievementLvl,
        rank: rank,
        is2FaEnabled: user.is_enable_2fa,
      };
    }

    const friendship = await this.frienship.userFriendship(self_id, id);

    if (friendship) {
      return {
        id: user.id,
        username: user.username,
        avatar_url: user.avatar_url,
        win_count: winCount,
        loose_count: looseCount,
        achievement_lvl: achievementLvl,
        rank: rank,
        friendship: {
          status: friendship.status,
          user1_id: friendship.user1_id,
          user2_id: friendship.user2_id,
        },
      };
    }
    return {
      id: user.id,
      username: user.username,
      avatar_url: user.avatar_url,
      win_count: winCount,
      loose_count: looseCount,
      achievement_lvl: achievementLvl,
      rank: rank,
    };
  }

  async historic(id: number) {
    if (!id) {
      this.logAndThrowNotFound(id, 'User');
    }
    const matches = await this.prisma.matchPlayer.findMany({
      where: {
        user_id: id,
        match: {
          type: 'NORMAL',
        },
      },
      include: {
        match: {
          include: {
            players: {
              include: {
                user: true,
              },
            },
          },
        },
      },
      orderBy: {
        match: {
          updated_at: 'desc',
        },
      },
    });
    const matchHistory = matches.map((matchPlayer) => {
      const match = matchPlayer.match;

      let player1 = {
        ...match.players[0].user,
        score: match.players[0].score,
        isWinner: match.players[0].winner,
      };
      let player2 = {
        ...match.players[1].user,
        score: match.players[1].score,
        isWinner: match.players[1].winner,
      };

      if (match.players[0].user.id !== id) {
        [player1, player2] = [player2, player1];
      }

      return {
        id: match.id,
        player1,
        player2,
      };
    });
    return { matchHistory, length: matchHistory.length };
  }
}
