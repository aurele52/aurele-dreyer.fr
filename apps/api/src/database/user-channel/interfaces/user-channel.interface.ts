import { UserChannelRoles } from "../roles/user-channel.roles";

export interface UserChannel {
    id: number,
    user_id: number,
    channel_id: number,
    role: UserChannelRoles,
    ban: Date,
    mute: Date,
    created_at: Date,
    updated_at: Date,
}