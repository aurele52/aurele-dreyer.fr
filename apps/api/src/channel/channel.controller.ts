import { Controller, Get } from '@nestjs/common';
//import { CreateChannelDto } from './dto/create-channel.dto';
import { ChannelService } from './channel.service';
import { Channel as ChannelModel } from '@prisma/client';
import { CurrentUser } from 'src/decorators/user.decorator';

@Controller('channels')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Get()
  async getAllChannels(@CurrentUser() user): Promise<ChannelModel[]> {
    const channels = await this.channelService.channels({
      exceptUserId: user.id,
    });
    console.log(channels);
    return channels;
  }
}
