import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UserChannelRoles } from './roles/user-channel.roles';
import { DateTime } from 'luxon';
import { ChanType } from '@prisma/client';
import { FriendshipService } from 'src/friendship/friendship.service';

@Injectable()
export class UserChannelService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly friendshipService: FriendshipService,
  ) {}

  async containBlockedUser(channel_id: number, user_id: number) {
    if (!channel_id) {
      throw new NotFoundException(`User with ID ${channel_id} not found`);
    }
    if (!user_id) {
      throw new NotFoundException(`User with ID ${user_id} not found`);
    }

    const userChannels = await this.prisma.userChannel.findMany({
      where: {
        channel_id,
        user_id: { not: user_id },
      },
      include: {
        User: true,
      },
    });

    if (!userChannels) return false;

    for (const uc of userChannels) {
      if (
        await this.friendshipService.isBlockedRelationship(uc.User.id, user_id)
      ) {
        return true;
      }
    }
    return false;
  }

  async createUserChannel(params: {
    userId: number;
    channelId: number;
    role: UserChannelRoles;
  }) {
    if (!params.channelId) {
      throw new NotFoundException(`User with ID ${params.channelId} not found`);
    }
    if (!params.userId) {
      throw new NotFoundException(`User with ID ${params.userId} not found`);
    }

    const { userId, channelId, role } = params;

    const channel = await this.prisma.channel.findUnique({
      where: {
        id: channelId,
      },
      include: {
        banList: true,
        userChannels: {},
      },
    });

    if (!channel) {
      throw new NotFoundException(`Channel with ID ${channelId} not found`);
    }

    if (channel && channel.banList.some((user) => user.id === userId)) {
      throw new ForbiddenException('User is banned in this channel.');
    }

    if (
      channel.type === ChanType.DM &&
      (await this.containBlockedUser(channelId, userId))
    ) {
      throw new ForbiddenException('DM cannot be created');
    }

    return await this.prisma.userChannel.create({
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
  }

  async deleteUserChannel(id: number) {
    if (!id) throw new NotFoundException(`UserChannel with id ${id} not found`);
    return await this.prisma.userChannel.delete({
      where: {
        id,
      },
    });
  }

  async currUser(user_id: number, channel_id: number) {
    if (!channel_id) {
      throw new NotFoundException(`User with ID ${channel_id} not found`);
    }
    if (!user_id) {
      throw new NotFoundException(`User with ID ${user_id} not found`);
    }
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

  async updateReadUntil(user_id: number, channel_id: number) {
    if (!channel_id) {
      throw new NotFoundException(`User with ID ${channel_id} not found`);
    }
    if (!user_id) {
      throw new NotFoundException(`User with ID ${user_id} not found`);
    }
    return await this.prisma.userChannel.update({
      where: {
        user_id_channel_id: {
          user_id,
          channel_id,
        },
      },
      data: {
        read_until: new Date(),
      },
    });
  }
}
