import { Body, Controller, Get, Post } from '@nestjs/common';
import { FriendshipService } from './friendship.service';
import { CreateFriendshipDto } from './dto/create-friendship.dto';
import { Friendship } from './interfaces/friendship.interface';

@Controller('Database/friendship')
export class FriendshipController {
    constructor(private friendshipService: FriendshipService){}

    @Post()
    async create(@Body() createFriendshipDto: CreateFriendshipDto) {
        this.friendshipService.create(createFriendshipDto);
    }

    @Get()
    async finAll(): Promise<Friendship[]> {
        return this.friendshipService.findAll();
    }
}
