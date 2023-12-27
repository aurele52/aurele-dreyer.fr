import { Controller, Get, Param } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CurrentUser } from 'src/decorators/user.decorator';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('/user/:id')
  async getProfile(@Param('id') id: number) {
    if (!id) return null;
    const userProfile = await this.profileService.profile(id);

    return userProfile;
  }

  @Get('/user')
  async getSelfProfile(@CurrentUser() user) {
    const userProfile = await this.profileService.profile(user.id);

    return userProfile;
  }

  @Get('/historic/:id')
  async getHistoric(@Param('id') id: number) {
    return this.profileService.historic(id);
  }

  @Get('/historic')
  async getSelfHistoric(@CurrentUser() user) {
    return this.profileService.historic(user.id);
  }
}
