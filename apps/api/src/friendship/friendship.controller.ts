import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Sse,
} from '@nestjs/common';
import { FriendshipService } from './friendship.service';
import { CurrentUser } from 'src/decorators/user.decorator';
import { Observable, interval, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { FriendshipEvent } from './event/friendship-event.type';

@Controller()
export class FriendshipController {
  constructor(private readonly friendshipService: FriendshipService) {}

  @Get('/friendships')
  async getCurrUserFriendships(@CurrentUser() currUser) {
    return await this.friendshipService.userFriendships(currUser.id);
  }

  @Get('/friendship/:id')
  async getCurrUserFriendship(
    @CurrentUser() currUser,
    @Param('id') targetId: number,
  ) {
    return await this.friendshipService.userFriendship(currUser.id, targetId);
  }

  @Delete('/relationship/friends/:id')
  async deleteFriends(@Param('id') user1_id: number, @CurrentUser() user2) {
    return await this.friendshipService.deleteFriendship(user1_id, user2.id);
  }

  @Delete('/relationship/blocked/:id')
  async deleteBlocked(@Param('id') user1_id: number, @CurrentUser() user2) {
    return await this.friendshipService.deleteBlocked(user1_id, user2.id);
  }

  @Delete('/relationship/pending/:id')
  async deletePending(@Param('id') user1_id: number, @CurrentUser() user2) {
    return await this.friendshipService.deletePending(user1_id, user2.id);
  }

  @Post('/friendship')
  async createCurrUserFriendship(
    @CurrentUser() user1,
    @Body('user2_id') user2_id: number,
  ) {
    return await this.friendshipService.createFriendship(user1.id, user2_id);
  }

  @Post('/block/:id')
  async createBlockedFriendship(
    @Param('id') user2_id: number,
    @CurrentUser() user1,
  ) {
    return await this.friendshipService.createBlockedFriendship(
      user1.id,
      user2_id,
    );
  }

  @Get('/friendships/pendingList')
  async getPendingInvitations(@CurrentUser() currUser) {
    console.log('Pending request list');
    return await this.friendshipService.getPendingInvitations(currUser.id);
  }

  @Get('/friendships/blockedList')
  async getBlockedList(@CurrentUser() currUser) {
    console.log('Pending request list');
    return await this.friendshipService.getBlockedList(currUser.id);
  }

  @Patch('/friendship/accept/:id')
  async acceptFriendship(@CurrentUser() user, @Param('id') id: number) {
    return await this.friendshipService.acceptFriendship(id, user.id);
  }

  @Sse('/stream/messages')
  streamMessages(): Observable<FriendshipEvent> {
    const heartbeat = interval(30000).pipe(map(() => ({ type: '' })));

    const message = this.friendshipService
      .getFriendshipEvents()
      .pipe(map(() => ({ type: event.type })));

    return merge(heartbeat, message);
  }
}
