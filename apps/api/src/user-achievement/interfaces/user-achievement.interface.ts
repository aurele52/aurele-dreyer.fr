import { Achievement } from "../type/user-achievement.type"

export interface UserAchievement {
    id: number,
    user_id: number,
    achievement: Achievement,
    created_at: Date,
    updated_at: Date
}