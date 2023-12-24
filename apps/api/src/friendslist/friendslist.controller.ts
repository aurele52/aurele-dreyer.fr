import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { FriendslistService } from './friendslist.service';

@Controller('friendslist')
export class FriendslistController {
  constructor(private readonly friendslistService: FriendslistService) {}

  @Get('/list/:id')
  async getList(@Param('id') id: number) {
    return this.friendslistService.getList(id);
  }

  @Post('/add')
  async sendFriendRequest(
    @Body() body: { senderId: number; receiverId: number },
  ) {
    const { senderId, receiverId } = body;
    return this.friendslistService.sendFriendRequest(senderId, receiverId);
  }
}
