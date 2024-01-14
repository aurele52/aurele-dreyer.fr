import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { lobbyManager } from './lobby/lobbyManager';
import { clientInfoDto } from './dto-interface/clientInfo.dto';
import { gameInfoDto } from './dto-interface/shared/gameInfo.dto';
import { normalGameInfo } from './dto-interface/shared/normalGameInfo';
import { JwtService } from '@nestjs/jwt';
import { parameterDto } from './dto-interface/shared/parameter.dto';
import { input } from './dto-interface/input.interface';

@WebSocketGateway({ cors: true })
export class PongGateway {
  private connectedClient: clientInfoDto[] = [];
  private readonly lobbyManager: lobbyManager = new lobbyManager();
  constructor(private jwt: JwtService) {}
  afterInit() {
    console.log('gateway initialised');
  }

  handleConnection(client: any) {
    const newClient: clientInfoDto = new clientInfoDto();
    newClient.status = 'connected';
    newClient.socket = client;
    newClient.input = { direction: null, isPressed: false };
    newClient.matchInfo = { ...normalGameInfo };
    this.connectedClient.push(newClient);
  }

  @SubscribeMessage('client.openGame')
  handleOpenGame(client: Socket, data: clientInfoDto) {}

  @SubscribeMessage('client.previewUpdate')
  handlePreview(client: Socket, data: parameterDto) {
    client.emit('server.previewUpdate', data);
  }

  @SubscribeMessage('client.authentification')
  async handleAuthentification(client: Socket, data: {user: string, token: string}) {
    // if (!data.token) {
    //   client.emit('401');
    //   client.disconnect(); //mathilde todo
    //   throw new UnauthorizedException();
    // }
    // try {
    //   const payload = await this.jwt.verifyAsync(data.token, {
    //     secret: process.env.APP_SECRET,
    //   });
    // } catch {
    //   client.disconnect();
    //   throw new UnauthorizedException();
    // }
    // let index = this.connectedClient.findIndex((value) => {
    //   return value.user === data.user;
    // });
    // if (index !== -1) {
    //   this.connectedClient[index].socket.emit('server.disconnect');
    //   if (this.connectedClient[index].lobby != null) {
    //     this.connectedClient[index].lobby.onDisconnect(this.connectedClient[index]);
    //   }
    //   this.lobbyManager.cleanLobbies();
    //   if (this.connectedClient[index].status = 'inJoinTab') {
    //     this.lobbyManager.removeInJoinTab(this.connectedClient[index]);
    //   }
    //   this.connectedClient.splice(index, 1);
    // }
    let index = this.connectedClient.findIndex((value) => {
      return value.socket === client;
    });
    if (index !== -1) {
      this.connectedClient[index].user = data.user;
    }
  }

  @SubscribeMessage('client.normalMatchmaking')
  handleMatchmaking(client: Socket) {
    const index = this.connectedClient.findIndex((value) => {
      return value.socket === client;
    });
    if (index !== -1) {
      client.emit('server.matchLoading');
      this.connectedClient[index].mode = 'normal';
      this.lobbyManager.addToNormalQueue(this.connectedClient[index]);
    }
  }

  @SubscribeMessage('client.createCustom')
  handleCreateCustom(client: Socket, gameData: gameInfoDto) {
    const index = this.connectedClient.findIndex((value) => {
      return value.socket === client;
    });
    if (index !== -1) {
      this.connectedClient[index].mode = 'custom';
      this.connectedClient[index].status = 'waiting another player';
      this.connectedClient[index].matchInfo = {
        ...normalGameInfo,
        ...gameData,
        gamey: gameData.borderSize * 2 + gameData.menuSize,
        gamexsize: gameData.xsize - 2 * gameData.borderSize,
        gameysize: gameData.ysize - 3 * gameData.borderSize - gameData.menuSize,
        ballx: gameData.gamexsize / 2 - 10,
        bally: gameData.gameysize / 2,
      };
      this.lobbyManager.createCustomLobby(this.connectedClient[index]);
      client.emit('server.matchLoading');
    }
  }

  @SubscribeMessage('client.joinMatch')
  handleJoinCustom(client: Socket, matchName: string) {
    const index = this.connectedClient.findIndex((value) => {
      return value.socket === client;
    });
    if (index !== -1) {
      this.connectedClient[index].status = 'inGame';
      this.lobbyManager.removeInJoinTab(this.connectedClient[index]);
      this.lobbyManager.addPlayerToMatch(this.connectedClient[index], matchName);
      this.lobbyManager.removeMatch(matchName);
    }
  }
  @SubscribeMessage('client.inJoinTab')
  handleJoin(client: Socket) {
    const index = this.connectedClient.findIndex((value) => {
      return value.socket === client;
    });
    if (index !== -1) {
      this.connectedClient[index].status = 'inJoinTab';
      this.lobbyManager.addInJoinTab(this.connectedClient[index]);
    }
    const lobbies = this.lobbyManager.getCustomLobbies();
    lobbies.forEach((value) => {client.emit('server.lobbyCustom', value.getMatchInfo());});
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

  handleDisconnect(client: Socket) {
    const index = this.connectedClient.findIndex((value) => {
      return value.socket === client;
    });
    if (index !== -1) {
      if (this.connectedClient[index].lobby != null) {
        this.connectedClient[index].lobby.onDisconnect(
          this.connectedClient[index],
        );
      }
      this.connectedClient.splice(index, 1);
    }
    this.lobbyManager.cleanLobbies();
  }
}
