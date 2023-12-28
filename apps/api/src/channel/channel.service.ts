import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateChannelDto } from './dto/create-channel.dto';

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
    return this.prisma.channel.findUnique({
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
      },
    });
  }
}
