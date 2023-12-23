import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreateChannelDto } from './dto/create-channel.dto';
import { ChannelService } from './channel.service';
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
  async findCurrUserChannels(@CurrentUser() user) {
    const channels = await this.channelService.channelsCurrentUser({
      currUserId: user.id,
    });
    return channels;
  }

  @Get('/channels')
  async findOtherChannels(@CurrentUser() user) {
    return this.channelService.otherChannels({ currUserId: user.id });
  }

  @Post('/channel')
  async addChannel(
    @CurrentUser() user,
    @Body() createChannelDto: CreateChannelDto,
  ) {
    const { passwordConfirmation: _, ...channelData } = createChannelDto;

    const channel = await this.channelService.createChannel({
      ...channelData,
    });
    await this.userChannelService.createUserChannel({
      currUserId: user.id,
      channelId: channel.id,
      role: UserChannelRoles.OWNER,
    });
    return channel;
  }

  @Get('/channel/:id')
  async findChannel(@Param('id') id: number) {
    return this.channelService.channel(id);
  }

  @Get('/channel/:id/me')
  async isCurrentUserMember(@Param('id') id: number, @CurrentUser() user) {
    return this.channelService.isUserMember(id, user.id);
  }
}
