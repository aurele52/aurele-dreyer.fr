import { Body, Controller, Post } from '@nestjs/common';
import { UserChannelService } from './user-channel.service';
import { CurrentUser } from 'src/decorators/user.decorator';
import { UserChannel as UserChannelModel } from '@prisma/client';

@Controller()
export class UserChannelController {
  constructor(private readonly userChannelService: UserChannelService) {}

  @Post('/user-channel')
  async add(
    @Body('channelId') channelId,
    @CurrentUser() user,
  ): Promise<UserChannelModel> {
    const userChannel = await this.userChannelService.createUserChannel({
      currUserId: user.id,
      channelId: channelId,
    });
    return userChannel;
  }
}
