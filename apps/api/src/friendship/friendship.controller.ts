import { Controller, Get } from '@nestjs/common';
import { FriendshipService } from './friendship.service';
import { CurrentUser } from 'src/decorators/user.decorator';

@Controller()
export class FriendshipController {
  constructor(private readonly friendshipService: FriendshipService) {}

  @Get('/friendships')
  async getCurrUserFriendships(@CurrentUser() currUser) {
    return await this.friendshipService.userFriendships(currUser.id);
  }
}
