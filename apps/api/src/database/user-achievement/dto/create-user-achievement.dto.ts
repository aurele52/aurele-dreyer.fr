import { Achievement } from "../type/user-achievement.type";

export class CreateUserAchievementDto {
    readonly id: number;
    readonly user_id: number;
    readonly achievement: Achievement;
    readonly created_at: Date;
    readonly updated_at: Date;
}