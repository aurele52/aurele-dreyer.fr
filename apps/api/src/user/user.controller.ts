import { Body, Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CurrentUser } from 'src/decorators/user.decorator';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/:userid')
  async getUser(@CurrentUser() selfid, @Param('userid') userid: number) {
    console.log('HERE');
    return this.userService.getUser(selfid.id, userid);
  }
}
