import { Controller, Get } from '@nestjs/common';
//import { CreateChannelDto } from './dto/create-channel.dto';
import { ChannelService } from './channel.service';
import { Channel as ChannelModel } from '@prisma/client';

@Controller('channels')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Get()
  async getAllChannels(): Promise<ChannelModel[]> {
    return await this.channelService.channels({});
  }
}
