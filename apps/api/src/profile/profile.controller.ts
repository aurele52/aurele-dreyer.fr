import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CurrentUser } from 'src/decorators/user.decorator';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('/user/:id')
  async getProfile(@Param('id') id: number, @CurrentUser() user) {
    if (!id) return null;
    const userProfile = await this.profileService.profile(id, user.id);

    return userProfile;
  }

  @Get('/user')
  async getSelfProfile(@CurrentUser() user) {
    const userProfile = await this.profileService.profile(user.id, 0);

    return userProfile;
  }

  @Get('/historic/:id')
  async getHistoric(
    @Param('id') id: number,
    @Query('historicMaxDisplay') historicMaxDisplay?: number,
  ) {
    return await this.profileService
      .historic(id)
      .then((list) => {
        list.matchHistory = list.matchHistory.slice(0, historicMaxDisplay);
        return list;
      })
      .catch((error) => {
        return error;
      });
  }

  @Get('/historic')
  async getSelfHistoric(
    @CurrentUser() user,
    @Query('historicMaxDisplay') historicMaxDisplay: number = 9,
  ) {
    return await this.profileService
      .historic(user.id)
      .then((list) => {
        list.matchHistory = list.matchHistory.slice(0, historicMaxDisplay);
        return list;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }
}
