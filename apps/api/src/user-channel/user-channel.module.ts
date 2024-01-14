import { Module } from '@nestjs/common';
import { UserChannelController } from './user-channel.controller';
import { UserChannelService } from './user-channel.service';
import { PrismaService } from 'src/prisma.service';
import { UserChannelModerateService } from './user-channel.moderate.service';
import { FriendshipService } from 'src/friendship/friendship.service';
import { MessageService } from 'src/message/message.service';

@Module({
  controllers: [UserChannelController],
  providers: [
    UserChannelService,
    UserChannelModerateService,
    PrismaService,
    FriendshipService,
    MessageService,
  ],
})
export class UserChannelModule {}
