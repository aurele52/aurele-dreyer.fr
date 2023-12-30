import {
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
  UploadedFile,
  Res,
  HttpStatus,
  StreamableFile,
  Query,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProfileService } from './profile.service';
import { CurrentUser, CurrentUserID } from 'src/decorators/user.decorator';
import * as path from 'path';
import * as fs from 'fs';
import { Public } from 'src/auth/decorators/public.decorator';

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
