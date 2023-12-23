import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { UserChannelService } from './user-channel.service';
import { CurrentUser } from 'src/decorators/user.decorator';
import { UserChannelRoles } from './roles/user-channel.roles';

@Controller()
export class UserChannelController {
  constructor(private readonly userChannelService: UserChannelService) {}

  @Post('/user-channel')
  async add(@Body('channelId') channelId, @CurrentUser() user) {
    const userChannel = await this.userChannelService.createUserChannel({
      currUserId: user.id,
      channelId: channelId,
      role: UserChannelRoles.MEMBER,
    });
    return userChannel;
  }

  @Delete('/user-channel/:id')
  async delete(@Param('id') id: number) {
    return await this.userChannelService.deleteUserChannel(id);
  }
}
