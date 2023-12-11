import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateChannelDto } from './dto/create-channel.dto';
import { ChannelService } from './channel.service';
import { Channel as ChannelModel } from '@prisma/client';
import { CurrentUser } from 'src/decorators/user.decorator';

@Controller()
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

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

  @Post('/chats')
  async addCurrUserChannels(
    @CurrentUser() user,
    @Body() createChannelDto: CreateChannelDto,
  ): Promise<ChannelModel> {
    return this.channelService.createChannel({
      ...createChannelDto,
      user_id: user.id,
    });
  }
}
