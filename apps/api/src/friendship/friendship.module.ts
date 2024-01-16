import { Module } from '@nestjs/common';
import { FriendshipController } from './friendship.controller';
import { FriendshipService } from './friendship.service';
import { PrismaService } from '../prisma.service';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [FriendshipController],
  providers: [FriendshipService, PrismaService],
  imports: [UserModule],
})
export class FriendshipModule {}
