import { Controller, Post, Body, Get } from '@nestjs/common';
import { MatchService } from './match.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { Match } from './interfaces/match.interface';

@Controller('Database/match')
export class MatchController {
    constructor(private matchService: MatchService){}

    @Post()
    async create(@Body() createMatchDto: CreateMatchDto) {
        this.matchService.create(createMatchDto)
    }

    @Get()
    async findAll(): Promise<Match[]> {
        return this.matchService.findAll();
    }
}
