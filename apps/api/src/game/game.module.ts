import { Module } from '@nestjs/common';
import { PongGateway } from './pong.gateway';
import { lobbyManager } from './lobby/lobbyManager';

@Module({
  providers: [
    // Gateways
    PongGateway,

    // Managers
    lobbyManager,
  ],
})
export class GameModule {}
