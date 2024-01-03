import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { lobbyManager } from './lobby/lobbyManager';
import { clientInfoDto } from './dto-interface/clientInfo.dto';
import { input } from './dto-interface/input.interface';
import { da } from '@faker-js/faker';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';


@WebSocketGateway({ cors: true })
export class PongGateway {
  private connectedClient: clientInfoDto[] = [];
  private readonly lobbyManager: lobbyManager = new lobbyManager(
    this.connectedClient,
  );
  constructor(  
    private jwt: JwtService,
  ) {}
  afterInit() {
    console.log('gateway initialised');
  }

  handleConnection(client: any, ...args: any[]) {
    console.error(`Client : ${client.id} ${args}connected`);
    const newClient: clientInfoDto = new clientInfoDto();
    newClient.status = 'connected';
    newClient.socket = client;
    newClient.input = { direction: null, isPressed: false };
    this.connectedClient.push(newClient);
    this.connectedClient.forEach((element) => {
      console.log('lol', element.socket.id);
    });
  }

  @SubscribeMessage('client.openGame')
  handleOpenGame(
    @MessageBody() token: string,
    @ConnectedSocket() client: Socket,
  ) {
    console.log('OpenGame');
  }

  @SubscribeMessage('client.authentification')
  async handleAuthentification(
    @MessageBody() token: string,
    @ConnectedSocket() client: Socket,
  ) {
    console.log(`${client.id}`, token); // Broadcast the message to all connected clients
    if (!token) {
      client.disconnect(); //mathilde todo
      throw new UnauthorizedException();

    }
    try {
      const payload = await this.jwt.verifyAsync(token, {
        secret: process.env.APP_SECRET,
      });
    } catch {
      client.disconnect();
      throw new UnauthorizedException();
    }

  }

  @SubscribeMessage('client.matchmaking')
  handleMatchmaking(client: Socket, data: clientInfoDto) {
    let index = this.connectedClient.findIndex((value) => {
      return value === data;
    });
    if (index !== -1) {
      client.emit('server.matchStart');
    }
    index = this.connectedClient.findIndex((value) => {
      return value.socket === client;
    });
    if (index !== -1) {
      this.connectedClient[index].user = data.user;
      this.connectedClient[index].mode = data.mode;
      this.lobbyManager.addToQueue(this.connectedClient[index]);
    }
    console.log(`${client.id}`, ' ', data.mode, ' ', data.user); // Broadcast the message to all connected clients
  }
  @SubscribeMessage('client.input')
  handleInput(client: Socket, input: input) {
    const index = this.connectedClient.findIndex((value) => {
      return value.socket === client;
    });
    if (index !== -1) {
      this.connectedClient[index].input = input;
    }
    console.log(input.direction, input.isPressed);
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
        this.connectedClient[index].lobby.disconnect(this.connectedClient[index]);
      }
      this.connectedClient.splice(index, 1);
    }
  }
}
