import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UserChannelRoles } from './roles/user-channel.roles';
import { DateTime } from 'luxon';

@Injectable()
export class UserChannelService {
  constructor(private readonly prisma: PrismaService) {}

  async createUserChannel(params: {
    userId: number;
    channelId: number;
    role: UserChannelRoles;
  }) {
    const { userId, channelId, role } = params;
    const createUserChannel = await this.prisma.userChannel.create({
      data: {
        User: {
          connect: {
            id: userId,
          },
        },
        Channel: {
          connect: {
            id: channelId,
          },
        },
        role,
      },
    });
    return createUserChannel;
  }

  async deleteUserChannel(id: number) {
    return await this.prisma.userChannel.delete({
      where: {
        id,
      },
    });
  }

  async currUser(user_id: number, channel_id: number) {
    const userChan = await this.prisma.userChannel.findUnique({
      where: {
        user_id_channel_id: {
          user_id,
          channel_id,
        },
      },
      include: {
        User: true,
      },
    });

    if (!userChan) {
      return {};
    }

    const { id, role, User, mute, ban } = userChan;
    const { username, avatar_url } = User;

    const isMuted = mute ? DateTime.fromJSDate(mute) > DateTime.now() : false;
    const isBanned = ban ? DateTime.fromJSDate(ban) > DateTime.now() : false;

    return {
      id,
      userId: user_id,
      role,
      username,
      avatar_url,
      isMuted,
      isBanned,
      mutedUntil: DateTime.fromJSDate(mute).toJSDate(),
      bannedUntil: DateTime.fromJSDate(ban).toJSDate(),
    };
  }
}
