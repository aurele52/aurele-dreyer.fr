import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserChannelService } from './user-channel.service';
import { CurrentUser } from 'src/decorators/user.decorator';
import { UserChannelRoles } from './roles/user-channel.roles';

@Controller()
export class UserChannelController {
  constructor(private readonly userChannelService: UserChannelService) {}

  @Post('/user-channel')
  async addCurrUser(@Body('channelId') channelId, @CurrentUser() user) {
    const userChannel = await this.userChannelService.createUserChannel({
      userId: user.id,
      channelId: channelId,
      role: UserChannelRoles.MEMBER,
    });
    return userChannel;
  }

  @Post('/user-channel/:userid')
  async addUser(@Body('channelId') channelId, @Param('userid') userId: number) {
    const userChannel = await this.userChannelService.createUserChannel({
      userId: userId,
      channelId: channelId,
      role: UserChannelRoles.MEMBER,
    });
    return userChannel;
  }

  @Delete('/user-channel/:id')
  async delete(@Param('id') id: number) {
    return await this.userChannelService.deleteUserChannel(id);
  }

  @Get('/user-channel/:channelid/current-user')
  async findCurrUser(
    @CurrentUser() user,
    @Param('channelid') channelId: number,
  ) {
    if (!channelId) return { id: user.id, role: undefined };
    return await this.userChannelService.currUser(user.id, channelId);
  }
}
