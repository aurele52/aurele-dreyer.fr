import { Controller, Get, Param } from '@nestjs/common';
import { LadderService } from './ladder.service';

@Controller('ladder')
export class LadderController {
    constructor(private readonly ladderService: LadderService) {}

    @Get('/list')
    async listLadder() {
        const ladder = await this.ladderService.listLadder();
        return ladder ? ladder.slice(0, 30) : [];
    }

    @Get('/rank/:id')
    async getRank(@Param('id') id: number) {
        return this.ladderService.getRank(id);
    }
}

