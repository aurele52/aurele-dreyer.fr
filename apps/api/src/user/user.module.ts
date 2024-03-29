import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma.service';
import { ChannelService } from 'src/channel/channel.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, ChannelService],
  exports: [UserService],
})
export class UserModule {}
