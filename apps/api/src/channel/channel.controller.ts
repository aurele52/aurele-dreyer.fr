import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateChannelDto } from './dto/create-channel.dto';
import { ChannelService } from './channel.service';
import { Channel as ChannelModel } from '@prisma/client';
import { CurrentUser } from 'src/decorators/user.decorator';
import { UserChannelService } from 'src/user-channel/user-channel.service';
import { UserChannelRoles } from 'src/user-channel/roles/user-channel.roles';

@Controller()
export class ChannelController {
  constructor(
    private readonly channelService: ChannelService,
    private readonly userChannelService: UserChannelService,
  ) {}

  @Get('/chats')
  async findCurrUserChannels(@CurrentUser() user): Promise<ChannelModel[]> {
    const channels = await this.channelService.channelsCurrentUser({
      currUserId: user.id,
    });
    return channels;
  }

  @Get('/channels')
  async findOtherChannels(@CurrentUser() user): Promise<ChannelModel[]> {
    return this.channelService.otherChannels({ currUserId: user.id });
  }

  @Post('/channel')
  async addChannel(
    @CurrentUser() user,
    @Body() createChannelDto: CreateChannelDto,
  ) {
    const channel = await this.channelService.createChannel({
      ...createChannelDto,
    });
    await this.userChannelService.createUserChannel({
      currUserId: user.id,
      channelId: channel.id,
      role: UserChannelRoles.OWNER,
    });
    return channel;
  }
}
