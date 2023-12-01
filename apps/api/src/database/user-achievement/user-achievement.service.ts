import { Injectable } from '@nestjs/common';
import { UserAchievement } from './interfaces/user-achievement.interface';

@Injectable()
export class UserAchievementService {
    private readonly userAchievements: UserAchievement[] = [];

    create(userAchievement: UserAchievement) {
        this.userAchievements.push(userAchievement);
    }

    findAll(): UserAchievement[] {
        return this.userAchievements;
    }
}
