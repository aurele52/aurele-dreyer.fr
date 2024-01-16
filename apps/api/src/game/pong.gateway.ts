import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { lobbyManager } from './lobby/lobbyManager';
import { normalLobbyManager } from './lobby/normalLobbyManager';
import { clientInfo } from './dto-interface/clientInfo.interface';
import { gameInfoDto } from './dto-interface/shared/gameInfo.dto';
import { normalGameInfo } from './dto-interface/shared/normalGameInfo';
import { input } from './dto-interface/input.interface';
import { baseClientInfo } from './dto-interface/baseClientInfo';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';

@WebSocketGateway({ cors: true })
export class PongGateway {
  private connectedClient: clientInfo[] = [];
  private readonly lobbyManager: lobbyManager = new lobbyManager();
  private readonly normalLobbyManager: normalLobbyManager =
    new normalLobbyManager();
  private nextGameId: number = 1;

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  afterInit() {
    console.log('gateway initialised');
  }

  async handleConnection(client: any) {
    console.log('trying to connect socket...');
    try {
      const payload = await this.authService.checkTokenValidity(
        client.handshake.auth.token,
        process.env.APP_SECRET,
      );
      const user = await this.userService.getUser(payload.id);
      const newClient: clientInfo = { ...baseClientInfo };
      newClient.socket = client;
      newClient.user = user.username;
      this.connectedClient.push(newClient);
      console.log('socket connection successfull');
    } catch (ex) {
      console.log('socket connection failed');
      client.emit('connect_failed');
    }
  }

  @SubscribeMessage('client.closeMainWindow')
  handleCloseMainWindow(client: Socket) {
    const index = this.connectedClient.findIndex((value) => {
      return value.socket === client;
    });
    if (index !== -1) {
      const polo = this.connectedClient[index];
      if (polo.status == 'inGame' && polo.lobby != null) {
        polo.lobby.onDisconnect(polo);
      }
      if (polo.status === 'waiting join normal')
        this.normalLobbyManager.removeToNormalQueue(polo);
      if (polo.status === 'waiting create custom')
        this.lobbyManager.removeToCustomQueue(polo);
      this.connectedClient[index].status = 'connected';
    }
    this.lobbyManager.cleanLobbies();
  }

  handleDisconnect(client: Socket) {
    const index = this.connectedClient.findIndex((value) => {
      return value.socket === client;
    });
    if (index !== -1) {
      const polo = this.connectedClient[index];
      if (polo.status == 'inGame' && polo.lobby != null) {
        polo.lobby.onDisconnect(polo);
      }
      if (polo.status === 'waiting join normal')
        this.normalLobbyManager.removeToNormalQueue(polo);
      if (polo.status === 'waiting create custom')
        this.lobbyManager.removeToCustomQueue(polo);
      this.connectedClient.splice(index, 1);
    }
    this.lobbyManager.cleanLobbies();
  }

  @SubscribeMessage('client.normalMatchmaking')
  handleMatchmaking(client: Socket) {
    const index = this.connectedClient.findIndex((value) => {
      return value.socket === client;
    });
    if (index !== -1) {
      this.normalLobbyManager.addToNormalQueue(this.connectedClient[index]);
    }
    console.log('arg');
    this.connectedClient.forEach((value) => {
      console.log(value.user);
    });
    console.log('arg2');
  }

  @SubscribeMessage('client.joinNormalAbort')
  handleJoinNormalAbort(client: Socket) {
    const index = this.connectedClient.findIndex((value) => {
      return value.socket === client;
    });
    if (index !== -1) {
      this.normalLobbyManager.removeToNormalQueue(this.connectedClient[index]);
    }
  }

  @SubscribeMessage('client.createCustomAbort')
  handleCreateCustomAbort(client: Socket) {
    const index = this.connectedClient.findIndex((value) => {
      return value.socket === client;
    });
    if (index !== -1) {
      this.lobbyManager.removeToCustomQueue(this.connectedClient[index]);
    }
  }

  @SubscribeMessage('client.previewUpdate')
  handlePreview(client: Socket, data: gameInfoDto) {
    client.emit('server.previewUpdate', data);
  }

  @SubscribeMessage('client.createCustom')
  handleCreateCustom(client: Socket, gameData: gameInfoDto) {
    const index = this.connectedClient.findIndex((value) => {
      return value.socket === client;
    });
    if (index !== -1) {
      this.lobbyManager.createCustomLobby(this.connectedClient[index], {
        id: this.nextGameId,
        ...normalGameInfo,
        ...gameData,
      });
      this.nextGameId++;
    }
  }

  @SubscribeMessage('client.joinMatch')
  handleJoinCustom(client: Socket, matchId: number) {
    const index = this.connectedClient.findIndex((value) => {
      return value.socket === client;
    });
    if (index !== -1) {
      this.lobbyManager.addPlayerToMatch(this.connectedClient[index], matchId);
    }
  }
  @SubscribeMessage('client.inJoinTab')
  handleJoin(client: Socket) {
    this.lobbyManager.cleanLobbies();
    const index = this.connectedClient.findIndex((value) => {
      return value.socket === client;
    });
    if (index !== -1) {
      this.lobbyManager.addInJoinTab(this.connectedClient[index]);
    }
  }

  @SubscribeMessage('client.input')
  handleInput(client: Socket, inputData: input) {
    const index = this.connectedClient.findIndex((value) => {
      return value.socket === client;
    });
    if (index !== -1) {
      this.connectedClient[index].input = inputData;
    }
  }

  @SubscribeMessage('client.getStatusUser')
  handleGetStatusUser(client: Socket, data: { user: string }) {
    const index = this.connectedClient.findIndex((value) => {
      console.log({ value }, { data });
      return value.user === data.user;
    });
    if (index !== -1) {
      client.emit('server.getStatusUser', {
        data: {
          username: data.user,
          status:
            this.connectedClient[index].status == 'connected'
              ? 'ONLINE'
              : 'INGAME',
        },
      });
    } else
      client.emit('server.getStatusUser', {
        data: { username: data.user, status: 'OFFLINE' },
      });
  }
}
