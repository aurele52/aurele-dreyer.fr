import { Controller, Get, Param } from '@nestjs/common';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}

    @Get('/user/:id')
    async findProfile(@Param('id') id: number) {
        return this.profileService.profile(id);
    }
}
