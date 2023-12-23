import { Module } from '@nestjs/common';
import { FriendslistController } from './friendslist.controller';
import { FriendslistService } from './friendslist.service';
import { PrismaService } from 'src/prisma.service';


@Module({
  controllers: [FriendslistController],
  providers: [FriendslistService, PrismaService]
})
export class FriendslistModule {}
