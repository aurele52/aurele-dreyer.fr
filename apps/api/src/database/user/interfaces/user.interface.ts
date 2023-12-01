import { UserStatus } from "../status/user.status";

export interface User {
    id: number,
    username: string,
    avatar_url: string,
    auth_id: string,
    user_status: UserStatus,
    created_at: Date,
    updated_at: Date,
}