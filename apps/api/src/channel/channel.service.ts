import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateChannelDto } from './dto/create-channel.dto';
import { ChanType, FriendshipStatus } from '@prisma/client';

@Injectable()
export class ChannelService {
  constructor(private readonly prisma: PrismaService) {}

  async createChannel(
    channelData: Omit<CreateChannelDto, 'passwordConfirmation'>,
  ) {
    return this.prisma.channel.create({
      data: {
        ...channelData,
      },
    });
  }

  async channelsCurrentUser(params: { currUserId: number }) {
    const { currUserId } = params;

    const blockedUserIds = await this.prisma.friendship.findMany({
      where: {
        OR: [
          { user1_id: currUserId, status: 'BLOCKED' },
          { user2_id: currUserId, status: 'BLOCKED' },
        ],
      },
      select: {
        user1_id: true,
        user2_id: true,
      },
    });

    const blockedIds = blockedUserIds
      .flatMap((u) => [u.user1_id, u.user2_id])
      .filter((id) => id !== currUserId);

    const userChannels = await this.prisma.channel.findMany({
      where: {
        userChannels: {
          some: {
            user_id: currUserId,
          },
        },
        NOT: {
          AND: [
            {
              type: ChanType.DM,
            },
            {
              userChannels: {
                some: {
                  user_id: {
                    in: blockedIds,
                  },
                },
              },
            },
          ],
        },
      },
      include: {
        userChannels: {
          include: {
            User: true,
          },
        },
        messages: {
          orderBy: {
            created_at: 'desc',
          },
        },
      },
    });

    const sortedChannels = userChannels
      .map((el) => ({
        ...el,
        interlocutor: el.userChannels.find((uc) => uc.User?.id !== currUserId)
          ?.User,
        myUserChannel: el.userChannels.find((uc) => uc.User?.id === currUserId),
      }))
      .map((el) => ({
        ...el,
        notif: el.messages.filter(
          (m) =>
            m.user_id !== currUserId &&
            m.created_at.getTime() > el.myUserChannel.read_until.getTime(),
        ).length,
      }))
      .sort((a, b) => {
        const dateA = Math.max(
          a.myUserChannel.created_at.getTime() ?? 0,
          a.messages[0]?.created_at.getTime() ?? 0,
        );
        const dateB = Math.max(
          b.myUserChannel.created_at.getTime() ?? 0,
          b.messages[0]?.created_at.getTime() ?? 0,
        );
        return dateB - dateA;
      });
    return sortedChannels;
  }

  async chat(user_id: number, channel_id: number) {
    const chat = await this.prisma.channel.findFirst({
      where: {
        userChannels: {
          some: {
            user_id,
            channel_id,
          },
        },
      },
      include: {
        userChannels: {
          include: {
            User: true,
          },
        },
      },
    });
    if (!chat) return undefined;
    return {
      ...chat,
      interlocutor: chat.userChannels?.find((uc) => uc.User?.id !== user_id)
        ?.User,
    };
  }

  async getCommonChats(user1_id: number, user2_id: number) {
    return await this.prisma.channel.findMany({
      where: {
        AND: [
          {
            userChannels: {
              some: {
                user_id: user1_id,
              },
            },
          },
          {
            userChannels: {
              some: {
                user_id: user2_id,
              },
            },
          },
        ],
        type: { not: ChanType.DM },
      },
      select: {
        id: true,
      },
    });
  }

  async getExcludedChats(user1_id: number, user2_id: number) {
    return await this.prisma.channel.findMany({
      where: {
        AND: [
          {
            userChannels: {
              some: {
                user_id: user1_id,
              },
            },
          },
          {
            userChannels: {
              none: {
                user_id: user2_id,
              },
            },
          },
        ],
        type: { not: ChanType.DM },
      },
      select: {
        id: true,
      },
    });
  }

  async otherChannels(params: { currUserId: number }) {
    const { currUserId } = params;
    return await this.prisma.channel.findMany({
      where: {
        type: { in: ['PUBLIC', 'PROTECTED'] },
        userChannels: {
          none: {
            user_id: currUserId,
          },
        },
        banList: {
          none: {
            id: currUserId,
          },
        },
      },
      include: {
        userChannels: {
          include: {
            User: true,
          },
        },
      },
    });
  }

  async channel(id: number) {
    const channel = await this.prisma.channel.findUnique({
      where: {
        id,
      },
      include: {
        userChannels: {
          include: {
            User: true,
          },
          orderBy: [
            {
              role: 'desc',
            },
            {
              User: {
                username: 'asc',
              },
            },
          ],
        },
      },
    });

    if (!channel) {
      throw new NotFoundException(`Channel with ID ${id} not found`);
    }

    return channel;
  }

  async isUserMember(channelId: number, userId: number) {
    const channel = await this.prisma.channel.findUnique({
      where: {
        id: channelId,
        userChannels: {
          some: {
            user_id: userId,
          },
        },
      },
    });
    return channel !== null;
  }

  async getNonMembers(channel_id: number, user_id: number) {
    return await this.prisma.user.findMany({
      where: {
        isDeleted: false,
        userChannels: {
          none: {
            channel_id,
          },
        },
        bannedChannels: {
          none: {
            id: channel_id,
          },
        },
        friendship_user1: {
          none: {
            user2_id: user_id,
            status: FriendshipStatus.BLOCKED,
          },
        },
        friendship_user2: {
          none: {
            user1_id: user_id,
            status: FriendshipStatus.BLOCKED,
          },
        },
      },
    });
  }

  async updateChannel(
    id: number,
    channelData: Omit<CreateChannelDto, 'passwordConfirmation'>,
  ) {
    return await this.prisma.channel.update({
      where: {
        id,
      },
      data: {
        ...channelData,
      },
    });
  }

  async getBanList(
    user_id: number,
    channel_id: number,
  ): Promise<{ id: number; username: string }[]> {
    try {
      const userChannel = await this.prisma.userChannel.findFirst({
        where: {
          user_id,
          channel_id,
          role: {
            in: ['OWNER', 'ADMIN'],
          },
        },
      });

      if (!userChannel) {
        throw new HttpException(
          'User does not have sufficient privileges in the channel.',
          HttpStatus.FORBIDDEN,
        );
      }

      const channel = await this.prisma.channel.findUnique({
        where: {
          id: channel_id,
        },
        include: {
          banList: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      });

      if (!channel) {
        throw new HttpException('Channel not found.', HttpStatus.NOT_FOUND);
      }

      return channel.banList.map((user) => ({
        id: user.id,
        username: user.username,
      }));
    } catch (error) {
      console.error('Error in getBanList:', error.message);
      throw error;
    }
  }

  async getDm(user1_id: number, user2_id: number) {
    const user1Channels = await this.prisma.channel.findMany({
      where: {
        type: ChanType.DM,
        userChannels: {
          some: {
            user_id: user1_id,
          },
        },
      },
    });

    const user2Channels = await this.prisma.channel.findMany({
      where: {
        type: ChanType.DM,
        userChannels: {
          some: {
            user_id: user2_id,
          },
        },
      },
    });

    return user1Channels.find((channel1) =>
      user2Channels.some((channel2) => channel2.id === channel1.id),
    );
  }

  async checkPwd(channelId: number, password: string) {
    const channel = await this.prisma.channel.findUnique({
      where: {
        id: channelId,
      },
    });
    if (!channel) return false;
    return password === channel.password;
  }

  async deleteChannel(userId: number, channelId: number) {
    const channel = await this.prisma.channel.findUnique({
      where: {
        id: channelId,
      },
      include: {
        userChannels: {
          where: {
            user_id: userId,
            role: 'OWNER',
          },
        },
      },
    });

    if (!channel || channel.userChannels.length === 0) {
      throw new ForbiddenException(
        `User with ID ${userId} is not the owner of the channel`,
      );
    }

    const deletedChannel = await this.prisma.channel.delete({
      where: {
        id: channelId,
      },
    });

    return deletedChannel;
  }
}
