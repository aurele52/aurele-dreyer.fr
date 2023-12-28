import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
  // WebSocketServer,
} from '@nestjs/websockets';
// import { Server } from 'http';
import { Socket } from 'socket.io';
import { AuthenticatedSocket } from './types';
import { CreateLobbyDto } from './dto/createLobby.dto';
import { lobbyManager } from './lobby/lobbyManager';
import { lobby } from './lobby/lobby';
import { ServerPayloads } from './ServerPayloads';

export interface info {
  y: number;
  x: number;
}

@WebSocketGateway({ cors: true })
export class PongGateway {
  constructor(private readonly lobbyManager: lobbyManager) {}
  // @WebSocketServer()
  // server: Server;
  afterInit() {
    console.log('gateway initialised');
  }

  handleConnection(client: any, ...args: any[]) {
    console.log(`Client : ${client.id} ${args}connected`);
  }

  @SubscribeMessage('authentification')
  handleAuthentification(
    @MessageBody() token: string,
    @ConnectedSocket() client: Socket,
  ) {
    console.log(`${client.id}`, token); // Broadcast the message to all connected clients
    if (!token) {
      client.emit('401');
      client.disconnect(); //mathilde todo
    }
  }

  @SubscribeMessage('client.ping')
  handleMessage(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.emit('server.pong', data);
    console.log(`${client.id}`, data); // Broadcast the message to all connected clients
    client.disconnect();
  }

  @SubscribeMessage('client.createLobby')
  onLobbyCreate(
    client: AuthenticatedSocket,
    data: CreateLobbyDto,
  ): WsResponse<ServerPayloads['server.gameMessage']> {
    console.log('yes');
    const lobby = this.lobbyManager.createLobby(data.isOnline, data.isPublic);
    if (lobby) lobby.addClient(client);

    return {
      event: 'server.gameMessage',
      data: {
        color: 'green',
        message: 'Lobby created',
      },
    };
  }

  @SubscribeMessage('client.data')
  handleData(@MessageBody() data: info, @ConnectedSocket() client: Socket) {
    client.emit('server.data', data);
    console.log(`${client.id}`, data.x);
  }

  handleDisconnect(client: any) {
    console.log(`Cliend ${client.id} disconnected`);
  }
}
