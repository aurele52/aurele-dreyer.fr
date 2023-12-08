import { Injectable } from '@nestjs/common';
import { UserChannel } from './interfaces/user-channel.interface';
import { User } from '../user/interfaces/user.interface';
import { Channel } from '../channel/interfaces/channel.interface';
import { UserChannelRoles } from './roles/user-channel.roles';

@Injectable()
export class UserChannelService {
  private readonly userChannels: UserChannel[] = [];

  add(userChannel: UserChannel) {
    this.userChannels.push(userChannel);
  }
  create(user: User, channel: Channel, role: UserChannelRoles) {
    let res: UserChannel;
    res.id = this.userChannels.length + 1;
    res.user_id = user.id;
    res.channel_id = channel.id;
    res.role = role;
    res.ban = new Date();
    res.mute = new Date();
    res.created_at = new Date();
    res.updated_at = new Date();
    this.userChannels.push(res);
  }

  findAll(): UserChannel[] {
    return this.userChannels;
  }

  findById(id: number): UserChannel {
    return this.userChannels.find((uc) => (uc.id = id));
  }

  findByUser(user: User): UserChannel[] {
    return this.userChannels.filter((uc) => (uc.user_id = user.id));
  }

  findByChannel(channel: Channel): UserChannel[] {
    return this.userChannels.filter((uc) => (uc.channel_id = channel.id));
  }
}
