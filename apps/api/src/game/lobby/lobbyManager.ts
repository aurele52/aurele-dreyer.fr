import { lobby } from './lobby';
import { Cron } from '@nestjs/schedule';
import { clientInfoDto } from '../dto-interface/clientInfo.dto';

export class lobbyManager {
  constructor(public connectedClientList: clientInfoDto[]) {
    this.connectedClient = connectedClientList;
  }

  private connectedClient: clientInfoDto[];
  private normalLobbies: lobby[] = [];
  private customLobbies: lobby[] = [];
  private normalQueue: clientInfoDto[] = [];
  private inJoinTab: clientInfoDto[] = [];

  public createCustomLobby(client: clientInfoDto) {
    // console.log('connectedClient', this.connectedClient);
    const newLobby = new lobby(this.connectedClient, 'custom', client.matchInfo);
    client.lobby = newLobby;
    client.status = 'waiting another player';
    newLobby.addClient(client);
    this.customLobbies.push(newLobby);
    this.inJoinTab.forEach((value) => {value.socket.emit('server.lobbyCustom', client.matchInfo);});
  }
  public addInJoinTab(client: clientInfoDto) {
    this.inJoinTab.push(client);
  }
  public removeInJoinTab(client: clientInfoDto) {
    const index = this.inJoinTab.findIndex((value) => {
      return value === client;
    });
    if (index !== -1) {
      this.inJoinTab.splice(index, 1);
    }
  }
  public addToNormalQueue(client: clientInfoDto) {
    this.normalQueue.push(client);
    client.status = 'waiting another player';
    this.MATCH();
  }
  public cleanLobbies() {
    this.normalLobbies.filter((lobby) => lobby.isEmpty() === true);
    this.customLobbies.filter((lobby) => lobby.isEmpty() === true);
  }
  public getCustomLobbies() {
    return this.customLobbies;
  }
  public addPlayerToMatch(client: clientInfoDto, matchInfo: string) {
    const index = this.customLobbies.findIndex((value) => {
      // console.log(value.getMatchInfo());
      return value.getMatchInfo().name === matchInfo;
    });
    if (index !== -1) {
      this.customLobbies[index].getPlayer()[0].status = 'inGame';
      client.status = 'inGame';
      this.customLobbies[index].addClient(client);
      // console.log('goof');
      this.customLobbies[index].start();
    }
  }
  private MATCH() {
    if (this.normalQueue.length >= 2) {
      const playerOne = this.normalQueue.shift();
      const playerTwo = this.normalQueue.shift();
      const newLobby = new lobby(this.connectedClient, 'normal', null);
      playerOne.lobby = newLobby;
      playerTwo.lobby = newLobby;
      playerOne.status = 'inGame';
      playerTwo.status = 'inGame';
      newLobby.addClient(playerOne);
      newLobby.addClient(playerTwo);
      this.normalLobbies.push(newLobby);
      newLobby.start();
    }
  }
  // Periodically clean up normalLobbies
  @Cron('*/5 * * * *')
  private normalLobbiesCleaner(): void {}
}
