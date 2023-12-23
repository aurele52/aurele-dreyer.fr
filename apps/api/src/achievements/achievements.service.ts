import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AchievementsTypes } from './types/achievements.types';
import { AchievementsInfo } from './interfaces/achivements.interface';
import { Achievement } from '@prisma/client';
@Injectable()
export class AchievementsService {
    constructor(
        private readonly prisma: PrismaService
    ) {}


    private mapPrismaAchievementToType(achievement: Achievement): AchievementsTypes {
        switch (achievement) {
            case 'WELCOME':
                return AchievementsTypes.WELCOME;
            case 'TASTEOFV':
                return AchievementsTypes.TASTEOFV;
            case 'WINS10PLUS':
                return AchievementsTypes.WINS10PLUS;
            case 'WIN10RAW':
                return AchievementsTypes.WIN10RAW;
            case 'NEMESIS':
                return AchievementsTypes.NEMESIS;
            case 'FIRST':
                return AchievementsTypes.FIRST;
            case 'POINTS100PLUS':
                return AchievementsTypes.POINTS100PLUS;
            case 'WINSINLESSTHAN1M':
                return AchievementsTypes.WINSINLESSTHAN1M;
            case 'ENDLESSSTAMINA':
                return AchievementsTypes.ENDLESSSTAMINA;
            default:
                throw new Error(`Unknown achievement type: ${achievement}`);
        }
    }
    
    getAchievementsInfo(achievement: AchievementsTypes): AchievementsInfo {
        switch (achievement) {
            case AchievementsTypes.WELCOME:
                return {
                    name: "Welcome, Newbie",
                    description: "Play a game against another player"
                }
            case AchievementsTypes.TASTEOFV:
                return {
                    name: "Taste Of Victory",
                    description: "Win a game another player"
                }
            case AchievementsTypes.WINS10PLUS:
                return {
                    name: "Competitive Mind",
                    description: "Win 10 games"
                }
            case AchievementsTypes.WIN10RAW:
                return {
                    name: "Competitive Mind (hard mode)",
                    description: "Win 10 games in a row"
                }
            case AchievementsTypes.NEMESIS:
                return {
                    name: "I Found My Nemesis",
                    description: "Play against the same person 5 times"
                }
            case AchievementsTypes.FIRST:
                return {
                    name: "Nothing More To Learn",
                    description: "Make it to the #1 place of the Ladder"
                }
            case AchievementsTypes.POINTS100PLUS:
                return {
                    name: "To infinity and beyond",
                    description: "Score more than 99 points"
                }
            case AchievementsTypes.WINSINLESSTHAN1M:
                return {
                    name: "Fast eradication",
                    description: "Win a game in less than 1min"
                }
            case AchievementsTypes.ENDLESSSTAMINA:
                return {
                    name: "Endless Stamina",
                    description: "Win a game that lasted at least 10min"
                }
            default:
                throw new Error('Unknown Achievement')
        }
    }

    async userAchievements(userId: number): Promise<AchievementsInfo[]> {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    id: userId,
                },
                include: {
                    achievement: true,
                },
            });

            if (!user) {
                throw new Error(`User with ID ${userId} not found`);
            }

            const achievementsInfo: AchievementsInfo[] = user.achievement.map((ua) => (
                this.getAchievementsInfo(this.mapPrismaAchievementToType(ua.achievement))
            ));

            return achievementsInfo;
        } catch (error) {
            throw new Error(`Error fetching user achievements: ${error.message}`);
        }
    }
}

