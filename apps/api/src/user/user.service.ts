import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { FriendshipStatus, User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getOtherUser(selfId: number, userId: number) {
    if (!userId) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const friendship = await this.prisma.friendship.findFirst({
      where: {
        OR: [
          {
            user1_id: selfId,
            user2_id: userId,
          },
          {
            user1_id: userId,
            user2_id: selfId,
          },
        ],
      },
    });

    const status = () => {
      if (friendship?.status === undefined) {
        return 'NONE';
      } else if (friendship?.status === 'BLOCKED') {
        return friendship?.user1_id === selfId
          ? 'BLOCKEDBYME'
          : 'BLOCKEDBYUSER';
      } else {
        return friendship?.status;
      }
    };

    const res = {
      id: user.id,
      username: user.username,
      avatar_url: user.avatar_url,
      status: 'ONLINE',
      friendshipStatus: status(),
    };

    return res;
  }

  async getUser(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const res = {
      id: user.id,
      username: user.username,
      avatar_url: user.avatar_url,
    };

    return res;
  }

  async changeUsername(id: number, newUsername: string) {
    try {
      await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          username: newUsername,
        },
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Username updated successfully',
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Failed to update username: Prisma error',
        };
      }
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      };
    }
  }

  async postAvatar(id: number, avatarUrl: string) {
    try {
      await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          avatar_url: avatarUrl,
        },
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Avatar updated successfully',
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Failed to update avatar: Prisma error',
        };
      }
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      };
    }
  }

  async deleteUser(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const friendships = await this.prisma.friendship.findMany({
      where: {
        OR: [{ user1_id: id }, { user2_id: id }],
      },
    });

    await Promise.all(
      friendships.map(async (friendship) => {
        await this.prisma.friendship.delete({
          where: { id: friendship.id },
        });
      }),
    );

    const userChannels = await this.prisma.userChannel.findMany({
      where: {
        user_id: id,
      },
      include: {
        Channel: true,
      },
    });

    await Promise.all(
      userChannels.map(async (userChannel) => {
        await this.prisma.userChannel.delete({
          where: { id: userChannel.id },
        });

        if (userChannel.Channel.type === 'DM') {
          const channel_id = userChannel.Channel.id;

          await this.prisma.channel.delete({
            where: {
              id: channel_id,
            },
          });
        }
      }),
    );

    await this.prisma.userAchievement.deleteMany({
      where: {
        user_id: id,
      },
    });

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        id_42: null,
        token_42: null,
        secret_2fa: null,
        avatar_url: `${process.env.DOMAIN_NAME_FRONT}/api/user/avatar/deletedUser.png`,
        username: 'deletedUser' + id,
      },
    });

    return HttpStatus.OK;
  }

  async updateUser(id: number, data) {
    try {
      await this.prisma.user.update({
        where: { id },
        data,
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Username updated successfully',
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Failed to update username: Prisma error',
        };
      }
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      };
    }
  }
}
