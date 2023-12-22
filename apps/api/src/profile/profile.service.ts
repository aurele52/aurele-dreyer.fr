import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { LadderService } from 'src/ladder/ladder.service';

@Injectable()
export class ProfileService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly ladder: LadderService
        ) {}

    async profile(id: number) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: id,
            },
        });

        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        const winCount = await this.prisma.matchPlayer.count({
            where: {
                user_id: id,
                winner: true,
            },
        });

        const looseCount = await this.prisma.matchPlayer.count({
            where: {
                user_id: id,
                winner: false,
            },
        });

        const achievementLvl = await this.prisma.userAchievement.count({
            where: {
                user_id: id,
            }
        })

        const rank = await this.ladder.getRank(user.id);
        console.log(rank);

        const res = {
            id: user.id,
            username: user.username,
            avatar_url: user.avatar_url,
            win_count: winCount,
            loose_count: looseCount,
            achievement_lvl: achievementLvl,
            rank: rank
        
        }

        return res;
    }
}
