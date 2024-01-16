import { lobby } from './lobby';
import { clientInfo } from '../dto-interface/clientInfo.interface';

export class lobbyManager {
  private normalLobbies: lobby[] = [];
  private customLobbies: lobby[] = [];
  private normalQueue: clientInfo[] = [];
  private inJoinTab: clientInfo[] = [];

  public createCustomLobby(client: clientInfo) {
    const newLobby = new lobby('custom', client.matchInfo);
    client.lobby = newLobby;
    client.status = 'waiting create custom';
    newLobby.addClient(client);
    this.customLobbies.push(newLobby);
    console.log(this.inJoinTab);
    this.inJoinTab.forEach((value) => {value.socket.emit('server.lobbyCustom', client.matchInfo); console.log('yes');});
  }
  public removeMatch(matchName: string) {
    this.customLobbies.filter((lobby) => lobby.getMatchInfo().name === matchName);
  }
  public addInJoinTab(client: clientInfo) {
    this.inJoinTab.push(client);
  }
  public removeInJoinTab(client: clientInfo) {
    const index = this.inJoinTab.findIndex((value) => {
      return value === client;
    });
    if (index !== -1) {
      this.inJoinTab.splice(index, 1);
    }
  }
  public addToNormalQueue(client: clientInfo) {
    this.normalQueue.push(client);
    client.status = 'waiting join normal';
    this.MATCH();
  }

  public removeToNormalQueue(client: clientInfo) {
    const index = this.normalQueue.findIndex((value) => {
      return value === client;
    });
    if (index !== -1) {
      this.normalQueue.splice(index, 1);
    }
  }

  public cleanLobbies() {
    this.normalLobbies.filter((lobby) => lobby.isEmpty() === true);
    this.customLobbies.filter((lobby) => lobby.isEmpty() === true);
  }
  public getCustomLobbies() {
    return this.customLobbies;
  }

  public addPlayerToMatch(client: clientInfo, matchName: string) {
    const index = this.customLobbies.findIndex((value) => {
      return value.getMatchInfo().name === matchName;
    });
    if (index !== -1) {
      this.customLobbies[index].getPlayer()[0].status = 'inGame';
      client.status = 'inGame';
      client.matchInfo = this.customLobbies[index].getMatchInfo();
      this.customLobbies[index].addClient(client);
      this.customLobbies[index].start();
    }
  }
  private MATCH() {
    if (this.normalQueue.length >= 2) {
      const playerOne = this.normalQueue.shift();
      const playerTwo = this.normalQueue.shift();
      const newLobby = new lobby('normal', null);
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
}
