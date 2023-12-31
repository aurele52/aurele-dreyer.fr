import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
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

    const channel = await this.prisma.channel.findUnique({
      where: {
        id: channelId,
      },
      include: {
        banList: true,
      },
    });

    if (!channel) {
      throw new NotFoundException(`Channel with ID ${channelId} not found`);
    }

    if (channel && channel.banList.some((user) => user.id === userId)) {
      throw new Error('User is banned in this channel.');
    }

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

    const { id, role, User, mute } = userChan;
    const { username, avatar_url } = User;

    const isMuted = mute ? DateTime.fromJSDate(mute) > DateTime.now() : false;

    return {
      id,
      userId: user_id,
      role,
      username,
      avatar_url,
      isMuted,
      mutedUntil: DateTime.fromJSDate(mute).toJSDate(),
    };
  }
}
