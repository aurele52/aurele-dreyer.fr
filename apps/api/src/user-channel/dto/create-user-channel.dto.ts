import { UserChannelRoles } from "../roles/user-channel.roles";

export class CreateUserChannelDto {
    readonly id: number;
    readonly user_id: number;
    readonly channel_id: number;
    readonly role: UserChannelRoles;
    readonly ban: Date;
    readonly mute: Date;
    readonly created_at: Date;
    readonly updated_at: Date;
}