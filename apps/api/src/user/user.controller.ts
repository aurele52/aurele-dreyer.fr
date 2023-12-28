import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CurrentUser } from 'src/decorators/user.decorator';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/:userid')
  async getOtherUser(@CurrentUser() selfid, @Param('userid') userid: number) {
    return this.userService.getOtherUser(selfid.id, userid);
  }

  @Get()
  async getUser(@CurrentUser() selfid) {
    return this.userService.getUser(selfid.id);
  }

  @Post('/username/:new_username')
  async createBlockedFriendship(
    @Param('new_username') username: string,
    @CurrentUser() user,
  ) {
    const usernamePattern = /^[a-zA-Z0-9_-]{4,15}$/;
    if (!usernamePattern.test(username)) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Invalid username format',
      };
    }
    return await this.userService.changeUsername(user.id, username);
  }
}
