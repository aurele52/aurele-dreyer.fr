import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Subject, Observable } from 'rxjs';
import { CustomMessageEvent } from './event/message-event.type';
import { Prisma } from '@prisma/client';

@Injectable()
export class MessageService {
  constructor(private readonly prisma: PrismaService) {}

  async channelMessages(channel_id: number) {
    if (!channel_id) {
      console.error(`Channel with ID ${channel_id} not found`);
      throw new NotFoundException(`Channel not found`);
    }

    const messages = await this.prisma.message.findMany({
      where: {
        channel_id,
      },
      include: {
        user: {
          include: {
            friendship_user1: true,
            friendship_user2: true,
          },
        },
      },
      orderBy: {
        created_at: 'asc',
      },
    });

    if (messages === null) {
      console.error(`Messages for channel with ID ${channel_id} not found`);
      throw new NotFoundException('Messages not found for this channel');
    }

    return messages.map((message) => {
      const mergedFriendships = [
        ...message.user.friendship_user1,
        ...message.user.friendship_user2,
      ];
      return {
        ...message,
        user: {
          ...message.user,
          friendships: mergedFriendships,
        },
      };
    });
  }

  async createMessage(channel_id: number, user_id: number, content: string) {
    if (!channel_id || !user_id || !content) {
      console.error(
        `Missing property for message creation: channel_id = ${channel_id}, user_id = ${user_id}, content = ${content}`,
      );
      throw new BadRequestException(`Missing property for message creation`);
    }
    try {
      return await this.prisma.message.create({
        data: {
          channel_id,
          user_id,
          content,
        },
      });
    } catch (error) {
      console.error('Error during message creation:', error);
      throw error;
    }
  }

  async findSendedInvitation(userId: number) {
    try {
      const message = await this.prisma.message.findFirst({
        where: {
          channel: {
            userChannels: {
              some: {
                user_id: userId,
              },
            },
            type: 'DM',
          },
          content: '/PongInvitation',
        },
        include: {
          channel: true,
        },
      });
      if (!message) throw new NotFoundException('No Sended Invitations');
      return message;
    } catch (error) {
      throw new NotFoundException('No Sended Invitations');
    }
  }

  async deleteInvitation(id: number) {
    try {
      const deletedMessages = await this.prisma.message.delete({
        where: {
          id,
        },
      });

      if (deletedMessages) {
        return { success: true, message: 'Invitations deleted successfully' };
      } else {
        throw new NotFoundException('No invitations found for deletion');
      }
    } catch (error) {
      console.error('Error deleting invitations:', error);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.error('Prisma error details:', error);
      }

      throw new NotFoundException('No invitations found for deletion');
    }
  }
  private messageEvents = new Subject<any>();

  emitMessage(channel_id: number) {
    this.messageEvents.next({ channel_id });
  }

  getMessageEvents(): Observable<CustomMessageEvent> {
    return this.messageEvents.asObservable();
  }
}
