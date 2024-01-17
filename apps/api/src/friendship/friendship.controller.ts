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
import { CurrentUser, CurrentUserID } from 'src/decorators/user.decorator';
import { Observable, interval, merge } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { FriendshipEventType } from './event/friendship-event.type';

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
    const ret = await this.friendshipService.deleteFriendship(
      user1_id,
      user2.id,
    );
    this.friendshipService.emitFriendshipEvent(
      FriendshipEventType.FRIENDSHIPREMOVED,
      user1_id,
      user2.id,
    );
    return ret;
  }

  @Delete('/relationship/blocked/:id')
  async deleteBlocked(@Param('id') user1_id: number, @CurrentUser() user2) {
    const ret = await this.friendshipService.deleteBlocked(user1_id, user2.id);
    this.friendshipService.emitFriendshipEvent(
      FriendshipEventType.USERUNBLOCKED,
      user1_id,
      user2.id,
    );
    return ret;
  }

  @Delete('/relationship/pending/:id')
  async deletePending(@Param('id') user1_id: number, @CurrentUser() user2) {
    const ret = await this.friendshipService.deletePending(user1_id, user2.id);
    this.friendshipService.emitFriendshipEvent(
      FriendshipEventType.FRIENDREQUESTREVOKED,
      user1_id,
      user2.id,
    );
    return ret;
  }

  @Post('/friendship')
  async createCurrUserFriendship(
    @CurrentUser() user1,
    @Body('user2_id') user2_id: number,
  ) {
    const ret = await this.friendshipService.createFriendship(
      user1.id,
      user2_id,
    );
    this.friendshipService.emitFriendshipEvent(
      FriendshipEventType.FRIENDREQUESTRECEIVED,
      user2_id,
      user1.id,
    );
    return ret;
  }

  @Post('/block/:id')
  async createBlockedFriendship(
    @Param('id') user2_id: number,
    @CurrentUser() user1,
  ) {
    const ret = await this.friendshipService.createBlockedFriendship(
      user1.id,
      user2_id,
    );
    this.friendshipService.emitFriendshipEvent(
      FriendshipEventType.USERBLOCKED,
      user2_id,
      user1.id,
    );
    return ret;
  }

  @Get('/friendships/pendingList')
  async getPendingInvitations(@CurrentUser() currUser) {
    return await this.friendshipService.getPendingInvitations(currUser.id);
  }

  @Get('/friendships/blockedList')
  async getBlockedList(@CurrentUser() currUser) {
    return await this.friendshipService.getBlockedList(currUser.id);
  }

  @Patch('/friendship/accept/:id')
  async acceptFriendship(@CurrentUser() user, @Param('id') id: number) {
    const ret = await this.friendshipService.acceptFriendship(id, user.id);
    this.friendshipService.emitFriendshipEvent(
      FriendshipEventType.FRIENDREQUESTACCEPTED,
      id,
      user.id,
    );
    return ret;
  }

  @Sse('/stream/friendshipevents')
  streamFriendshipEvents(@CurrentUserID() user_id): Observable<any> {
    const heartbeat = interval(30000).pipe(
      map(() => ({
        type: 'heartbeat',
        data: JSON.stringify({}),
      })),
    );

    const friendshipEvent = this.friendshipService.getFriendshipEvents().pipe(
      filter((event) => event.recipientId === user_id),
      map((event) => ({
        type: 'message',
        data: JSON.stringify({ type: event.type, targetId: event.initiatorId }),
      })),
    );
    return merge(heartbeat, friendshipEvent);
  }
}
