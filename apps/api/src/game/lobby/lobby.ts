import { Socket } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';
import { AuthenticatedSocket, LobbyCustom } from '../types';

export class lobby {
  public readonly id: string = uuidv4();

  public readonly clients: Map<Socket['id'], AuthenticatedSocket> = new Map<
    Socket['id'],
    AuthenticatedSocket
  >();

  constructor(public readonly isCustom: LobbyCustom) {}
  addClient(client: AuthenticatedSocket) {}
}
