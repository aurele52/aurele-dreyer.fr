import { Module } from '@nestjs/common';
import { PongGateway } from './pong.gateway';
import { lobbyManager } from './lobby/lobbyManager';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [
    // Gateways
    PongGateway,

    // Managers
    lobbyManager,
	JwtService,
  ],
})
export class GameModule {}
