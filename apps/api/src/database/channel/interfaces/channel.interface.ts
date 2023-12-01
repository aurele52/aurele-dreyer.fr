import { ChannelTypes } from "../types/channel.types";

export interface Channel {
    id: number,
    name: string,
    type: ChannelTypes,
    password: string,
    created_at: Date,
    updated_at: Date,
}
