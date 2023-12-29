import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  // WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { lobbyManager } from './lobby/lobbyManager';
import { gameStartInfoDto } from './dto/gameStartInfo.dto';

export interface info {
  y: number;
  x: number;
}

@WebSocketGateway({ cors: true })
export class PongGateway {
  constructor(private readonly lobbyManager: lobbyManager) {}
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

  @SubscribeMessage('client.matchmaking')
  handleNormalStart(client: Socket, data: gameStartInfoDto) {
    console.log(`${client.id}`, ' ', data.mode); // Broadcast the message to all connected clients
    for (let i = 0; i < 2000000000; i++);
    client.emit('server.matchStart');
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

  handleDisconnect(client: any) {
    console.log(`Cliend ${client.id} disconnected`);
  }
}
