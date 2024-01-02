import { Module } from '@nestjs/common';
import { ChannelController } from './channel.controller';
import { ChannelService } from './channel.service';
import { PrismaService } from '../prisma.service';
import { UserChannelService } from 'src/user-channel/user-channel.service';
import { MessageService } from 'src/message/message.service';

@Module({
  controllers: [ChannelController],
  providers: [
    ChannelService,
    PrismaService,
    UserChannelService,
    MessageService,
  ],
})
export class ChannelModule {}
