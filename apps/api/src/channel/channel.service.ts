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

  async channels(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ChannelWhereUniqueInput;
    where?: Prisma.ChannelWhereInput;
    orderBy?: Prisma.ChannelOrderByWithRelationInput;
    exceptUserId: number;
  }): Promise<Channel[]> {
    const { skip, take, cursor, where, orderBy, exceptUserId } = params;
    return (
      await this.prisma.channel.findMany({
        skip,
        take,
        cursor,
        where,
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
      image: el.userChannels.find((uc) => uc.User?.id !== exceptUserId)?.User
        .avatar_url,
    }));
  }
}
