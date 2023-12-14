import { Module } from '@nestjs/common';
import { ChannelController } from './channel.controller';
import { ChannelService } from './channel.service';
import { PrismaService } from '../prisma.service';
import { UserChannelService } from 'src/user-channel/user-channel.service';

@Module({
  controllers: [ChannelController],
  providers: [ChannelService, PrismaService, UserChannelService],
})
export class ChannelModule {}
