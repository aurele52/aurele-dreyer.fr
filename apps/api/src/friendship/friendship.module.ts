import { Module } from '@nestjs/common';
import { FriendshipController } from './friendship.controller';
import { FriendshipService } from './friendship.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [FriendshipController],
  providers: [FriendshipService, PrismaService],
})
export class FriendshipModule {}
