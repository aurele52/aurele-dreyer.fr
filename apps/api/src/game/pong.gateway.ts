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

@WebSocketGateway({ cors: true })
export class PongGateway {
  private connectedClient: clientInfoDto[] = [];
  private readonly lobbyManager: lobbyManager = new lobbyManager(
    this.connectedClient,
  );
  constructor() {}
  afterInit() {
    console.log('gateway initialised');
  }

  handleConnection(client: any, ...args: any[]) {
    console.log(`Client : ${client.id} ${args}connected`);
    const newClient: clientInfoDto = new clientInfoDto();
    newClient.status = 'connected';
    newClient.socket = client;
    newClient.input = {direction: null, isPressed: false};
    this.connectedClient.push(newClient);
    this.connectedClient.forEach((element) => {
      console.log('lol', element.socket.id);
    });
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

  handleDisconnect(client: any) {
    console.log(`Cliend ${client.id} disconnected`);
    const index = this.connectedClient.findIndex((value) => {
      return value.socket === client;
    });
    if (index !== -1) {
      this.connectedClient.splice(index, 1);
    }
  }
}
