import { Injectable } from '@nestjs/common';
//import { Channel } from './interfaces/channel.interface';
import { PrismaService } from '../prisma.service';
import { Channel, Prisma } from '@prisma/client';

@Injectable()
export class ChannelService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.ChannelCreateInput): Promise<Channel> {
    return this.prisma.channel.create({
      data,
    });
  }

  async channelsCurrentUser(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ChannelWhereUniqueInput;
    orderBy?: Prisma.ChannelOrderByWithRelationInput;
    currUserId: number;
  }): Promise<Channel[]> {
    const { skip, take, cursor, orderBy, currUserId } = params;
    return (
      await this.prisma.channel.findMany({
        skip,
        take,
        cursor,
        where: {
          userChannels: {
            some: {
              user_id: currUserId,
            },
          },
        },
        orderBy,
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
      image: el.userChannels.find((uc) => uc.User?.id !== currUserId)?.User
        .avatar_url,
      interlocutor: el.userChannels.find((uc) => uc.User?.id !== currUserId)
        ?.User.username,
    }));
  }
}
