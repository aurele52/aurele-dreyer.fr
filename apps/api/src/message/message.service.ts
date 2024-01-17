import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Subject, Observable } from 'rxjs';
import { Message } from './interfaces/message.interface';
import { CustomMessageEvent } from './event/message-event.type';
import { Prisma } from '@prisma/client';

@Injectable()
export class MessageService {
  constructor(private readonly prisma: PrismaService) {}

  async channelMessages(channel_id: number) {
    return (
      await this.prisma.message.findMany({
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
      })
    ).map((message) => {
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
    return await this.prisma.message.create({
      data: {
        channel_id,
        user_id,
        content,
      },
    });
  }

  private messageEvents = new Subject<any>();

  emitMessage(message: Message, channel_id: number) {
    this.messageEvents.next({ message, channel_id });
  }

  getMessageEvents(): Observable<CustomMessageEvent> {
    return this.messageEvents.asObservable();
  }

  async deleteInvitation(userId: number, channelId: number) {
    try {
      const deletedMessages = await this.prisma.message.deleteMany({
        where: {
          channel_id: channelId,
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
      });

      if (deletedMessages.count > 0) {
        return { success: true, message: 'Invitations deleted successfully' };
      } else {
        throw new NotFoundException('No invitations found for deletion');
      }
    } catch (error) {
      console.error('Error deleting invitations:', error);

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.error('Prisma error details:', error);
      }

      throw new Error('An error occurred while deleting invitations');
    }
  }
}
