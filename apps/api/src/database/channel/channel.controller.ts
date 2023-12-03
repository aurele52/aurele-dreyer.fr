import { Controller, Post, Get, Body } from '@nestjs/common';
import { CreateChannelDto } from './dto/create-channel.dto';
import { ChannelService } from './channel.service';
import { Channel as ChannelModel } from '@prisma/client';

@Controller()
export class ChannelController {
  constructor(private channelService: ChannelService) {}

  @Post()
  async create(@Body() createChannelDto: CreateChannelDto) {
    this.channelService.create(createChannelDto);
  }

  @Get('channels')
  async getAllChannels(): Promise<ChannelModel[]> {
    return await this.channelService.channels({});
  }
}
