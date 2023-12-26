import { Controller, Get } from '@nestjs/common';
import { FriendshipService } from './friendship.service';
import { CurrentUser } from 'src/decorators/user.decorator';

@Controller('friendships')
export class FriendshipController {
  constructor(private readonly friendshipService: FriendshipService) {}

  @Get()
  async getCurrUserFriendships(@CurrentUser() currUser) {
    return await this.friendshipService.userFriendships(currUser.id);
  }

  @Get('/pendingList')
  async getPendingInvitations(@CurrentUser() currUser) {
    console.log('Pending request list');
    return await this.friendshipService.getPendingInvitations(currUser.id);
  }

  @Get('/blockedList')
  async getBlockedList(@CurrentUser() currUser) {
    console.log('Pending request list');
    return await this.friendshipService.getBlockedList(currUser.id);
  }
}
