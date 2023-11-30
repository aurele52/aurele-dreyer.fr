import { Controller, Post, Get, Body } from '@nestjs/common';
import { CreateChannelDto} from './dto/create-channel.dto'
import { ChannelService } from './channel.service';
import { Channel } from './interfaces/channel.interface';

@Controller('Database/channel')
export class ChannelController {
    constructor(private channelService: ChannelService){}

    @Post()
    async create(@Body() createChannelDto: CreateChannelDto) {
        this.channelService.create(createChannelDto);
    }

    @Get() 
    async findAll(): Promise<Channel[]> {
        return this.channelService.findAll();
    }
}