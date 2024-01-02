import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateChannelDto } from './dto/create-channel.dto';
import { channel } from 'diagnostics_channel';

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
    return (
      await this.prisma.channel.findMany({
        where: {
          userChannels: {
            some: {
              user_id: currUserId,
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
      })
    ).map((el) => ({
      ...el,
      interlocutor: el.userChannels.find((uc) => uc.User?.id !== currUserId)
        ?.User,
    }));
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
    return {
      ...chat,
      interlocutor: chat.userChannels.find((uc) => uc.User?.id !== user_id)
        ?.User,
    };
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

  async getNonMembers(channel_id: number) {
    return await this.prisma.user.findMany({
      where: {
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
}
