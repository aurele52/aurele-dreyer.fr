import { Module } from '@nestjs/common';
import { LadderService } from './ladder.service';
import { LadderController } from './ladder.controller';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [LadderService, PrismaService],
  controllers: [LadderController]
})
export class LadderModule {}
