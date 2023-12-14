import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UserChannelRoles } from './roles/user-channel.roles';

@Injectable()
export class UserChannelService {
  constructor(private readonly prisma: PrismaService) {}

  async createUserChannel(params: {
    currUserId: number;
    channelId: number;
    role: UserChannelRoles;
  }) {
    const { currUserId, channelId, role } = params;
    const createUserChannel = await this.prisma.userChannel.create({
      data: {
        User: {
          connect: {
            id: currUserId,
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
}
