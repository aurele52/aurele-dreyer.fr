import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserAchievementService } from './user-achievement.service';
import { CreateUserAchievementDto } from './dto/create-user-achievement.dto';
import { UserAchievement } from './interfaces/user-achievement.interface';

@Controller('Database/user-achievement')
export class UserAchievementController {
    constructor(private userAchievementService: UserAchievementService){}

    @Post()
    async create(@Body() createUserAchievementDto: CreateUserAchievementDto) {
        this.userAchievementService.create(createUserAchievementDto);
    }

    @Get()
    async findAll(): Promise<UserAchievement[]> {
        return this.userAchievementService.findAll();
    }
}
