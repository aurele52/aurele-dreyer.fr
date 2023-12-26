import { Server } from 'http';
import { lobby } from './lobby';
import { Cron } from '@nestjs/schedule';
import { AuthenticatedSocket, LobbyOnline, LobbyPublic } from '../types';
import { isSourceFile } from 'typescript';

export class lobbyManager {
  public server: Server;

  private readonly lobbies: Map<lobby['id'], lobby> = new Map<
    lobby['id'],
    lobby
  >();

  public initializeSocket(client: AuthenticatedSocket): void {}

  public terminateSocket(client: AuthenticatedSocket): void {}

  public createLobby(
    isOnline: LobbyOnline,
    isPublic: LobbyPublic,
  ): lobby | void {
    const newLobby = new lobby(this.server, isPublic, isOnline);

    this.lobbies.set(newLobby.id, newLobby);

    return newLobby;
  }

  public joinLobby(lobbyId: string, client: AuthenticatedSocket): void {}

  // Periodically clean up lobbies
  @Cron('*/5 * * * *')
  private lobbiesCleaner(): void {}
}
