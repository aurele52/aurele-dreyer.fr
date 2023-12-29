import { lobby } from './lobby';
import { Cron } from '@nestjs/schedule';
import { AuthenticatedSocket, LobbyCustom } from '../types';

export class lobbyManager {
  private readonly lobbies: Map<lobby['id'], lobby> = new Map<
    lobby['id'],
    lobby
  >();

  public createLobby(isCustom: LobbyCustom): lobby | void {
    const newLobby = new lobby(isCustom);

    this.lobbies.set(newLobby.id, newLobby);

    return newLobby;
  }

  public joinLobby(lobbyId: string, client: AuthenticatedSocket): void {}

  // Periodically clean up lobbies
  @Cron('*/5 * * * *')
  private lobbiesCleaner(): void {}
}
