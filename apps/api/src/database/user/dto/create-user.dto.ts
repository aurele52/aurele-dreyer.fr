import { UserStatus } from "../status/user.status";

export class CreateUserDto {
    readonly id: number;
    readonly username: string;
    readonly avatar_url: string;
    readonly auth_id: string;
    readonly user_status: UserStatus;
    readonly created_at: Date;
    readonly updated_at: Date;
}