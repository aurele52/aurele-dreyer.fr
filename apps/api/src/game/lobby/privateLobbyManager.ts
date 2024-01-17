import { lobby } from './lobby';
import { clientInfo } from '../dto-interface/clientInfo.interface';

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
      console.log('one');
      this.privateLobbies[index].getPlayer()[0].status = 'inGame';
      client.status = 'inGame';
      client.lobby = this.privateLobbies[index];
      this.privateLobbies[index].addClient(client);
      this.privateLobbies[index].start();
    } else {
      console.log('two');
      const newLobby = new lobby('private', null);
      client.lobby = newLobby;
      newLobby.addClient(client);
      this.privateLobbies.push(newLobby);
    }
  }

  public removeToPrivateQueue(client: clientInfo) {
    client.status === 'connected';
    const index = this.privateQueue.findIndex((value) => {
      return value === client;
    });
    if (index !== -1) {
      if (client.status === 'waiting join private')
        this.privateQueue.splice(index, 1);
    }
  }

  public cancelPrivateInvitation(client: clientInfo, id: number) {
    const index = this.privateLobbies.findIndex((value) => {
      return value.getPlayer()[0].user.id === id;
    });

    if (index !== -1) {
      const otherPlayer: clientInfo = this.privateLobbies[index].getPlayer()[0];
      otherPlayer.status = 'connected';
      this.privateQueue.splice(index, 1);
      otherPlayer.socket.emit('server.cancelInvite');
    }
  }

  public cleanLobbies() {
    this.privateLobbies.filter((lobby) => lobby.isEmpty() === true);
  }
}
