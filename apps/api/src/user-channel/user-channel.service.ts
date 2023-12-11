import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UserChannel } from '@prisma/client';
import { UserChannelRoles } from './roles/user-channel.roles';

@Injectable()
export class UserChannelService {
  constructor(private readonly prisma: PrismaService) {}

  async createUserChannel(params: {
    currUserId: number;
    channelId: number;
  }): Promise<UserChannel> {
    const { currUserId, channelId } = params;
    const createUserChannel = await this.prisma.userChannel.create({
      data: {
        user_id: currUserId,
        channel_id: channelId,
        role: UserChannelRoles.MEMBER,
      },
    });
    return createUserChannel;
  }
}
