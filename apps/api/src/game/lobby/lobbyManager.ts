import { lobby } from './lobby';
import { Cron } from '@nestjs/schedule';
import { clientInfoDto } from '../dto-interface/clientInfo.dto';
import { Socket } from 'socket.io';

export class lobbyManager {
  constructor(public connectedClientList: clientInfoDto[]) {
    this.connectedClient = connectedClientList;
  }

  private connectedClient: clientInfoDto[];
  private lobbies: lobby[] = [];
  private queue: clientInfoDto[] = [];

  public addToNormalQueue(client: clientInfoDto) {
    this.queue.push(client);
    console.log('queue', this.queue);
    console.log('connectedClient', this.connectedClient);
    this.MATCH();
  }
  public cleanLobbies() {
    this.lobbies.filter((lobby) => lobby.isEmpty() === true);
  }
  private MATCH() {
    if (this.queue.length >= 2) {
      const playerOne = this.queue.shift();
      const playerTwo = this.queue.shift();
      playerOne.socket.emit('server.normalMatchStart');
      playerTwo.socket.emit('server.normalMatchStart');
      const newLobby = new lobby(this.connectedClient, playerOne.mode);
      playerOne.lobby = newLobby;
      playerTwo.lobby = newLobby;
      playerOne.status = 'inGame';
      playerTwo.status = 'inGame';
      newLobby.addClient(playerOne);
      newLobby.addClient(playerTwo);
      newLobby.start();
      this.lobbies.push(newLobby);
    }
  }
  // Periodically clean up lobbies
  @Cron('*/5 * * * *')
  private lobbiesCleaner(): void {}
}
