import { Body, Controller, Post, Get } from '@nestjs/common';
import { UserChannel } from './interfaces/user-channel.interface';
import { UserChannelService } from './user-channel.service';
import { CreateUserChannelDto } from './dto/create-user-channel.dto';

@Controller('Database/user-channel')
export class UserChannelController {
    constructor(private userChannelService: UserChannelService){}

    @Post()
    async add(@Body() createUserChannelDto: CreateUserChannelDto) {
        this.userChannelService.add(createUserChannelDto);
    }

    @Get()
    async findAll(): Promise<UserChannel[]> {
        return this.userChannelService.findAll();
    }
}
