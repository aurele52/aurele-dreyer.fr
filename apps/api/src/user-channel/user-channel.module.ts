import { Module } from '@nestjs/common';
import { UserChannelController } from './user-channel.controller';
import { UserChannelService } from './user-channel.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [UserChannelController],
  providers: [UserChannelService, PrismaService],
})
export class UserChannelModule {}
