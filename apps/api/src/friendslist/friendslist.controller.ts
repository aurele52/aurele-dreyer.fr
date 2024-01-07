import { Controller, Get, Param, Post, Body, Query } from '@nestjs/common';
import { FriendslistService } from './friendslist.service';
import { CurrentUser } from 'src/decorators/user.decorator';

@Controller('friendslist')
export class FriendslistController {
  constructor(private readonly friendslistService: FriendslistService) {}

  @Get('/list')
  async getList(@CurrentUser() user) {
    return this.friendslistService.getList(user.id);
  }

  @Post('/add')
  async sendFriendRequest(
    @Body() body: { receiverId: number },
    @CurrentUser() user,
  ) {
    const { receiverId } = body;
    return this.friendslistService.sendFriendRequest(user.id, receiverId);
  }

  @Get('/potentialFriends')
  async getPotentialFriends(@CurrentUser() user) {
    return this.friendslistService.getPotentialFriends(user.id);
  }
}
