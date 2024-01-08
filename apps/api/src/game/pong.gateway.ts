import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { lobbyManager } from './lobby/lobbyManager';
import { clientInfoDto } from './dto-interface/clientInfo.dto';
import { matchInfoDto } from './dto-interface/matchInfo.dto';
import { input } from './dto-interface/input.interface';
import { da } from '@faker-js/faker';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { lobby } from './lobby/lobby';
import { gameInfo } from './dto-interface/gameInfo.interface';
import { parameterDto } from './dto-interface/parameter.dto';

function updateMatchInfo(update: matchInfoDto, actual: gameInfo) {
  if (typeof update.name != 'undefined') actual.name = update.name;
  if (typeof update.borderSize != 'undefined') actual.borderSize = update.borderSize;
  if (typeof update.midSquareSize != 'undefined') actual.midSquareSize = update.midSquareSize;
  if (typeof update.menuSize != 'undefined') actual.menuSize = update.menuSize;
  if (typeof update.ysize != 'undefined') actual.ysize = update.ysize;
  if (typeof update.xsize != 'undefined') actual.xsize = update.xsize;
  if (typeof update.gamey != 'undefined') actual.gamey = update.gamey;
  if (typeof update.gamex != 'undefined') actual.gamex = update.gamex;
  if (typeof update.ballx != 'undefined') actual.ballx = update.ballx;
  if (typeof update.bally != 'undefined') actual.bally = update.bally;
  if (typeof update.barDist != 'undefined') actual.barDist = update.barDist;
  if (typeof update.oneBary != 'undefined') actual.oneBary = update.oneBary;
  if (typeof update.twoBary != 'undefined') actual.twoBary = update.twoBary;
  if (typeof update.barSpeed != 'undefined') actual.barSpeed = update.barSpeed;
  if (typeof update.ballDirx != 'undefined') actual.ballDirx = update.ballDirx;
  if (typeof update.ballDiry != 'undefined') actual.ballDiry = update.ballDiry;
  if (typeof update.ballSpeed != 'undefined') actual.ballSpeed = update.ballSpeed;
  if (typeof update.gamexsize != 'undefined') actual.gamexsize = update.gamexsize;
  if (typeof update.gameysize != 'undefined') actual.gameysize = update.gameysize;
  if (typeof update.barLarge != 'undefined') actual.barLarge = update.barLarge;
  if (typeof update.oneScore != 'undefined') actual.oneScore = update.oneScore;
  if (typeof update.twoScore != 'undefined') actual.twoScore = update.twoScore;
  if (typeof update.ballDeb != 'undefined') actual.ballDeb = update.ballDeb;
  if (typeof update.ballSize != 'undefined') actual.ballSize = update.ballSize;
  if (typeof update.barSize != 'undefined') actual.barSize = update.barSize;
  if (typeof update.itemx != 'undefined') actual.itemx = update.itemx;
  if (typeof update.itemy != 'undefined') actual.itemy = update.itemy;
  if (typeof update.itemSize != 'undefined') actual.itemSize = update.itemSize;
}

@WebSocketGateway({ cors: true })
export class PongGateway {
  private connectedClient: clientInfoDto[] = [];
  private readonly lobbyManager: lobbyManager = new lobbyManager(
    this.connectedClient,
  );
  constructor(private jwt: JwtService) {}
  afterInit() {
    console.log('gateway initialised');
  }

  handleConnection(client: any, ...args: any[]) {
    console.error(`Client : ${client.id} ${args}connected`);
    const newClient: clientInfoDto = new clientInfoDto();
    newClient.status = 'connected';
    newClient.socket = client;
    newClient.input = { direction: null, isPressed: false };
    newClient.matchInfo = {
      name: 'normal',
      borderSize: 10,
      midSquareSize: 10,
      menuSize: 90,
      ysize: 500,
      xsize: 800,
      gamey: 110,
      gamex: 10,
      ballx: 100,
      bally: 100,
      barDist: 20,
      oneBary: 10,
      twoBary: 10,
      barSpeed: 2,
      ballDirx: -1,
      ballDiry: -0.4,
      ballSpeed: 4.0,
      gamexsize: 780,
      gameysize: 380,
      barLarge: 10,
      oneScore: 0,
      twoScore: 0,
      ballDeb: 150,
      ballSize: 10,
      barSize: 100,
      itemx: 40,
      itemy: 40,
      itemSize: 10,
    };
    this.connectedClient.push(newClient);
    this.connectedClient.forEach((element) => {
      // console.log('lol', element.socket.id);
    });
  }

  @SubscribeMessage('client.openGame')
  handleOpenGame(client: Socket, data: clientInfoDto) {
    // console.log(client.id, 'OpenGame : ', this.connectedClient);
  }

  @SubscribeMessage('client.previewUpdate')
  handlePreview(client: Socket, data: parameterDto) {
    console.log(data);
    client.emit('server.previewUpdate', data);
    // console.log(client.id, 'OpenGame : ', this.connectedClient);
  }

  @SubscribeMessage('client.authentification')
  async handleAuthentification(client: Socket, data: {user: string, token: string}) {
    // console.log(`${client.id}`, data.token); // Broadcast the message to all connected clients
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
    const index = this.connectedClient.findIndex((value) => {
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
  handleCreateCustom(client: Socket, data: matchInfoDto) {
    const index = this.connectedClient.findIndex((value) => {
      return value.socket === client;
    });
    if (index !== -1) {
      this.connectedClient[index].mode = 'custom';
    console.log('rewrewrw', this.connectedClient[index].matchInfo);
      updateMatchInfo(data, this.connectedClient[index].matchInfo);
    console.log('rewrewrw', this.connectedClient[index].matchInfo);
      this.lobbyManager.createCustomLobby(this.connectedClient[index]);
      client.emit('server.matchLoading');
      // console.log(client, ' matchloading ', this.lobbyManager.getCustomLobbies());
    }
  }

  @SubscribeMessage('client.printDebug')
  handlePrintDebug(client: Socket, debug: string) {
    console.log('debug: ', client.id, ' ', debug);
  }
  @SubscribeMessage('client.joinMatch')
  handleJoinCustom(client: Socket, matchName: string) {
    // console.log('yes0');
    const index = this.connectedClient.findIndex((value) => {
      return value.socket === client;
    });
    if (index !== -1) {
      this.connectedClient[index].status = 'inGame';
      this.lobbyManager.removeInJoinTab(this.connectedClient[index]);
      this.lobbyManager.addPlayerToMatch(this.connectedClient[index], matchName);
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
  handleInput(client: Socket, input: input) {
    const index = this.connectedClient.findIndex((value) => {
      return value.socket === client;
    });
    if (index !== -1) {
      this.connectedClient[index].input = input;
    }
    // console.log(input.direction, input.isPressed);
  }

  @SubscribeMessage('client.getStatusUser')
  handleGetStatusUser(client: Socket, data: { user: string }) {
    const index = this.connectedClient.findIndex((value) => {
      return value.user === data.user;
    });
    if (index !== -1) {
      client.emit('server.getStatusUser', true);
    } else client.emit('server.getStatusUser', false);
  }

  handleDisconnect(client: Socket) {
    console.log(`Cliend ${client.id} disconnected`);
    const index = this.connectedClient.findIndex((value) => {
      return value.socket === client;
    });
    if (index !== -1) {
      if (this.connectedClient[index].lobby != null) {
        this.connectedClient[index].lobby.onDisconnect(this.connectedClient[index]);
      }
      this.connectedClient.splice(index, 1);
    }
    this.lobbyManager.cleanLobbies();
  }
}
