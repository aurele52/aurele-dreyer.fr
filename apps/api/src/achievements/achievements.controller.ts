import { Controller, Get, Param } from '@nestjs/common';
import { AchievementsService } from './achievements.service';

@Controller('achievements')
export class AchievementsController {
  constructor(private readonly achievementsService: AchievementsService) {}

  @Get('/list/:id')
  async getUserAchievements(@Param('id') id: number) {
    console.log('User id : ', id);
    return await this.achievementsService.userAchievements(id);
  }
}
