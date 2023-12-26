import { Body, Controller, Get, Param } from '@nestjs/common';
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
}
