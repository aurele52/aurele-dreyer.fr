import { Injectable } from '@nestjs/common';
import { Channel } from './interfaces/channel.interface';

@Injectable()
export class ChannelService {
    private readonly channels: Channel[] = [];

    create(channel: Channel) {
        this.channels.push(channel);
    }

    findAll(): Channel[] {
        return this.channels;
    }
}