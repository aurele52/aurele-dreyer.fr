import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UserChannelRoles } from './roles/user-channel.roles';

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
    });
    return {
      id: user_id,
      role: userChan.role,
    };
  }
}
