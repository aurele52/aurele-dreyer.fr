import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Subject, Observable } from 'rxjs';
import { Message } from './interfaces/message.interface';

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

  emitMessage(message: Message) {
    this.messageEvents.next(message);
  }

  getMessageEvents(): Observable<MessageEvent> {
    return this.messageEvents.asObservable();
  }
}
