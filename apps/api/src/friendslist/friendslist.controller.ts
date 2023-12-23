import { Controller, Get, Param } from '@nestjs/common';
import { FriendslistService } from './friendslist.service';

@Controller('friendslist')
export class FriendslistController {
    constructor(private readonly friendslistService: FriendslistService) {}

    @Get('/list/:id')
    async getList(@Param('id') id: number) {
        return (this.friendslistService.getList(id));
    }
}
