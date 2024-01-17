import { lobby } from './lobby';
import { clientInfo } from '../dto-interface/clientInfo.interface';
import { gameInfo } from '../dto-interface/shared/gameInfo.interface';
import { normalGameInfo } from '../dto-interface/shared/normalGameInfo';

export class lobbyManager {
  private customLobbies: lobby[] = [];
  private inJoinTab: clientInfo[] = [];
  private nextGameId: number = 1;

  public createCustomLobby(client: clientInfo, gameInfo: gameInfo) {
    client.mode = 'custom';
    client.status = 'waiting create custom';
    client.matchInfo = {
      ...normalGameInfo,
      ...gameInfo,
      gamey: gameInfo.borderSize * 2 + gameInfo.menuSize,
      gamexsize: gameInfo.xsize - 2 * gameInfo.borderSize,
      gameysize: gameInfo.ysize - 3 * gameInfo.borderSize - gameInfo.menuSize,
      ballx: gameInfo.gamexsize / 2 - 10,
      bally: gameInfo.gameysize / 2,
      id: this.nextGameId,
    };
    this.nextGameId++;
    const newLobby = new lobby('custom', client.matchInfo);
    client.lobby = newLobby;
    client.status = 'waiting create custom';
    newLobby.addClient(client);
    this.customLobbies.push(newLobby);
    this.inJoinTab.forEach((value) => {
      value.socket.emit('server.lobbyCustom', client.matchInfo);
    });
  }

  public removeMatch(matchId: number) {
    this.customLobbies.filter((lobby) => lobby.getMatchInfo().id === matchId);
  }
  public addInJoinTab(client: clientInfo) {
    client.status = 'inJoinTab';
    this.cleanLobbies();
    this.customLobbies.forEach((value) => {
      if (value.getPlayer()[0].status != 'inGame')
        client.socket.emit('server.lobbyCustom', value.getMatchInfo());
    });
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

  public removeToCustomQueue(client: clientInfo) {
    if (client.lobby) {
      const index = this.customLobbies.findIndex((value) => {
        return value === client.lobby;
      });
      if (index !== -1) {
        this.inJoinTab.forEach((value) => {
          value.socket.emit(
            'server.lobbyCustomDelete',
            client.lobby.getMatchInfo(),
          );
        });
        this.customLobbies.splice(index, 1);
      }
    }
    client.status = 'connected';
  }

  public cleanLobbies() {
    this.customLobbies.filter((lobby) => lobby.isEmpty() === true);
  }
  public getCustomLobbies() {
    return this.customLobbies;
  }

  public addPlayerToMatch(client: clientInfo, matchId: number) {
    client.status = 'inGame';
    this.removeInJoinTab(client);
    this.removeMatch(matchId);
    const index = this.customLobbies.findIndex((value) => {
      return value.getMatchInfo().id === matchId;
    });
    if (index !== -1) {
      this.inJoinTab.forEach((value) => {
        value.socket.emit('server.lobbyCustomDelete', client.matchInfo);
      });
      this.customLobbies[index].getPlayer()[0].status = 'inGame';
      client.status = 'inGame';
      client.matchInfo = this.customLobbies[index].getMatchInfo();
      client.lobby = this.customLobbies[index];
      this.customLobbies[index].addClient(client);
      this.customLobbies[index].start();
    }
  }
}
