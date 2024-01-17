import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { FriendshipService } from './friendship.service';
import { CurrentUser } from 'src/decorators/user.decorator';
import { UserEventType } from '../user/types/user-event.types';
import { UserService } from 'src/user/user.service';

@Controller()
export class FriendshipController {
  constructor(
    private readonly friendshipService: FriendshipService,
    private readonly userService: UserService,
  ) {}

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
    this.userService.emitUserEvent(
      UserEventType.FRIENDSHIPREMOVED,
      [user1_id],
      user2.id,
      null,
    );
    return ret;
  }

  @Delete('/relationship/blocked/:id')
  async deleteBlocked(@Param('id') user1_id: number, @CurrentUser() user2) {
    const ret = await this.friendshipService.deleteBlocked(user1_id, user2.id);
    this.userService.emitUserEvent(
      UserEventType.USERUNBLOCKED,
      [user1_id],
      user2.id,
      null,
    );
    return ret;
  }

  @Delete('/relationship/pending/:id')
  async deletePending(@Param('id') user1_id: number, @CurrentUser() user2) {
    const ret = await this.friendshipService.deletePending(user1_id, user2.id);
    this.userService.emitUserEvent(
      UserEventType.FRIENDREQUESTREVOKED,
      [user1_id],
      user2.id,
      null,
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
    this.userService.emitUserEvent(
      UserEventType.FRIENDREQUESTRECEIVED,
      [user2_id],
      user1.id,
      null,
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
    this.userService.emitUserEvent(
      UserEventType.USERBLOCKED,
      [user2_id],
      user1.id,
      null,
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
    this.userService.emitUserEvent(
      UserEventType.FRIENDREQUESTACCEPTED,
      [id],
      user.id,
      null,
    );
    return ret;
  }
}
