import { Controller, Get, Param } from '@nestjs/common';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}

    @Get('/user/:id')
    async getProfile(@Param('id') id: string) {
        const userId = parseInt(id, 10);
        if (!userId)
            return null;
        const userProfile = await this.profileService.profile(userId);
        
        return userProfile;
      }

    @Get('/historic/:id')
    async getHistoric(@Param('id') id: number) {
        return this.profileService.historic(id);
    }
}
