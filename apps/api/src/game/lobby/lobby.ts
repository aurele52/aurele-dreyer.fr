import { Server } from 'http';
import { Socket } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';
import { AuthenticatedSocket, LobbyOnline, LobbyPublic } from '../types';

export class lobby {
  public readonly id: string = uuidv4();

  public readonly clients: Map<Socket['id'], AuthenticatedSocket> = new Map<
    Socket['id'],
    AuthenticatedSocket
  >();

  constructor(
    private readonly server: Server,
    public readonly isPublic: LobbyPublic,
    public readonly isOnline: LobbyOnline,
  ) {}
  addClient(client: AuthenticatedSocket) {}
}
