import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  // WebSocketServer,
} from '@nestjs/websockets';
// import { Server } from 'http';
import { Socket } from 'socket.io';
// import { AuthenticatedSocket } from './types';
// import { CreateLobbyDto } from './dto/createLobby.dto';
export interface info {
  y: number;
  x: number;
}

@WebSocketGateway({ cors: true })
export class PongGateway {
  // @WebSocketServer()
  // server: Server;
  afterInit() {
    console.log('gateway initialised');
  }

  handleConnection(client: any, ...args: any[]) {
    console.log(`Client : ${client.id} connected`);
  }

  @SubscribeMessage('client.ping')
  handleMessage(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.emit('server.pong', data);
    console.log(`${client.id}`, data); // Broadcast the message to all connected clients
  }

  // @SubscribeMessage('client.createLobby')
  // onLobbyCreate(
  //   client: AuthenticatedSocket,
  //   data: CreateLobbyDto,
  // ): WsResponse<ServerPayloads[ServerEvents.GameMessage]> {
  //   const lobby = this.lobbyManager.createLobby(
  //     data.mode,
  //     data.delayBetweenRounds,
  //   );
  //   lobby.addClient(client);
  //
  //   return {
  //     event: 'server.gameMessage',
  //     data: {
  //       color: 'green',
  //       message: 'Lobby created',
  //     },
  //   };
  // }

  @SubscribeMessage('client.data')
  handleData(@MessageBody() data: info, @ConnectedSocket() client: Socket) {
    client.emit('server.data', data);
    console.log(`${client.id}`, data.x); // Broadcast the message to all connected clients
  }

  handleDisconnect(client: any) {
    console.log(`Cliend ${client.id} disconnected`);
  }
}
