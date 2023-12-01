import { Injectable } from '@nestjs/common';
import { Match } from './interfaces/match.interface';

@Injectable()
export class MatchService {
    private readonly matchs: Match[] = [];

    create(match: Match) {
        this.matchs.push(match);
    }

    findAll(): Match[] {
        return this.matchs;
    }
}
