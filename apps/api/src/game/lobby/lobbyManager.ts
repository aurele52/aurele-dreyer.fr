import { Server } from 'http';
import { Lobby } from './lobby';
import { Cron } from '@nestjs/schedule';
import { AuthenticatedSocket, LobbyMode } from '../types';

export class LobbyManager {
  public server: Server;

  private readonly lobbies: Map<Lobby['id'], Lobby> = new Map<
    Lobby['id'],
    Lobby
  >();

  public initializeSocket(client: AuthenticatedSocket): void {}

  public terminateSocket(client: AuthenticatedSocket): void {}

  public createLobby(mode: LobbyMode, delayBetweenRounds: number): Lobby  | void{}

  public joinLobby(lobbyId: string, client: AuthenticatedSocket): void {}

  // Periodically clean up lobbies
  @Cron('*/5 * * * *')
  private lobbiesCleaner(): void {}
}
