import { lobby } from './lobby';
import { clientInfo } from '../dto-interface/clientInfo.interface';
import { normalGameInfo } from '../dto-interface/shared/normalGameInfo';

export class privateLobbyManager {
  private privateLobbies: lobby[] = [];
  private privateQueue: clientInfo[] = [];

  public addToPrivateQueue(client: clientInfo, id: number) {
    client.status = 'waiting join private';
    client.mode = 'private';
    const index = this.privateLobbies.findIndex((value) => {
      return value.getPlayer()[0].user.id === id;
    });
    if (index !== -1) {
      this.privateLobbies[index].getPlayer()[0].status = 'inGame';
      client.status = 'inGame';
      client.lobby = this.privateLobbies[index];
      this.privateLobbies[index].addClient(client);
      this.privateLobbies[index].start();
    } else {
      const newLobby = new lobby('private', {...normalGameInfo, userId: id});
      client.lobby = newLobby;
      newLobby.addClient(client);
      this.privateLobbies.push(newLobby);
    }
  }

  public removeToPrivateQueue(client: clientInfo, playerInvited: clientInfo | null) {
    client.status === 'connected';
    const index = this.privateQueue.findIndex((value) => {
      return value === client;
    });
    if (index !== -1) {
      if (client.status === 'waiting join private')
        this.privateQueue.splice(index, 1);
      if (playerInvited)
        playerInvited.socket.emit('server.cancelInvite');
    }
  }

  public cleanLobbies() {
    this.privateLobbies.filter((lobby) => lobby.isEmpty() === true);
  }
}
