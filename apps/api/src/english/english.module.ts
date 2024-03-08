import { Module } from '@nestjs/common';
import { EnglishController } from './english.controller';
import { EnglishService } from './english.service';
import { PrismaService } from 'src/prisma.service';
import { ChannelService } from 'src/channel/channel.service';

@Module({
  controllers: [EnglishController],
  providers: [EnglishService, PrismaService, ChannelService],
})
export class EnglishModule {}
