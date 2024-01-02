import { lobby } from './lobby';
import { Cron } from '@nestjs/schedule';
import { clientInfoDto } from '../dto-interface/clientInfo.dto';

export class lobbyManager {
  constructor(public connectedClientList: clientInfoDto[]) {
    this.connectedClient = connectedClientList;
  }

  private connectedClient: clientInfoDto[];
  private lobbies: lobby[] = [];
  private queue: clientInfoDto[] = [];

  public addToQueue(client: clientInfoDto) {
    this.queue.push(client);
    console.log('queue', this.queue);
    console.log('connectedClient', this.connectedClient);
    this.MATCH();
  }
  private MATCH() {
    if (this.queue.length >= 2) {
      const playerOne = this.queue.shift();
      const playerTwo = this.queue.shift();
      playerOne.socket.emit('server.matchStart');
      playerTwo.socket.emit('server.matchStart');
      const newLobby = new lobby(this.connectedClient, 'normal');
      playerOne.lobby = newLobby;
      playerTwo.lobby = newLobby;
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
