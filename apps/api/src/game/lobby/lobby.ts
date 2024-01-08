import { v4 as uuidv4 } from 'uuid';
import { LobbyCustom } from '../types';
import { clientInfoDto } from '../dto-interface/clientInfo.dto';
import { matchInfoDto } from '../dto-interface/matchInfo.dto';
import { gameInfo } from '../dto-interface/gameInfo.interface';

export class lobby {
  isEmpty(): boolean {
    if (this.clients.length == 0) return true;
    return false;
  }
  private finish = 0;
  ballWallRedir() {
    if (
      this.gameInfo.bally + this.gameInfo.ballSize + this.gameInfo.ballSpeed >=
      this.gameInfo.gameysize
    )
      this.gameInfo.ballDiry *= -1;
    if (this.gameInfo.bally - this.gameInfo.ballSpeed <= 0)
      this.gameInfo.ballDiry *= -1;
  }
  onDisconnect(user: clientInfoDto) {
    this.finish = 1;
    if (this.clients[0] == user) {
      this.win(this.clients[1], this.clients[0]);
    }
    if (this.clients[1] == user) {
      this.win(this.clients[0], this.clients[1]);
    }
  }
  getPlayer() {
    return this.clients;
  }
  disconnectAll() {
    this.clients.splice(0);
  }
  win(winner: clientInfoDto, loser: clientInfoDto) {
    winner.socket.emit('server.win');
    /*
     * match_id est a creer ici
     * this.client[0] == joueur 1
     * this.client[1] == joueur 2
     * this.gameInfo.oneScore == score joueur 1
     * this.gameInfo.twoScore == score joueur 2
     * winner == winner
     * loser == loser
     * no created_at yet
     * no updated_at yet
     * winner username == winner.user
     * loser username == winner.user
     * match == don't ask me what is this
     */
  }
  lose(user: clientInfoDto) {
    user.socket.emit('server.lose');
  }

  score() {
    if (
      this.gameInfo.ballx + this.gameInfo.ballSize >=
      this.gameInfo.gamexsize - this.gameInfo.barDist
    ) {
      this.gameInfo.oneScore++;
      this.gameInfo.ballx = this.gameInfo.gamexsize / 2 + this.gameInfo.ballDeb;
      this.gameInfo.bally = this.gameInfo.gameysize / 2;
      this.gameInfo.ballDirx = -1;
      this.gameInfo.ballDiry = 1;
    }
    if (this.gameInfo.ballx <= this.gameInfo.barDist) {
      this.gameInfo.twoScore++;
      this.gameInfo.ballx = this.gameInfo.gamexsize / 2 - this.gameInfo.ballDeb;
      this.gameInfo.bally = this.gameInfo.gameysize / 2;
      this.gameInfo.ballDirx = 1;
      this.gameInfo.ballDiry = 1;
    }
  }

  redirection(
    ratio: number,
    delta: { x: number; y: number },
  ): [number, number] {
    ratio = (ratio - 0.5) * 2;
    const speed = Math.sqrt(delta.x * delta.x + delta.y * delta.y);
    const inAlpha = Math.asin(delta.y / speed);
    let outAlpha = inAlpha + (ratio * Math.PI) / 6;
    const absinAlpha = inAlpha > 0 ? inAlpha : 2 * Math.PI + inAlpha;
    let absoutAlpha = outAlpha > 0 ? outAlpha : 2 * Math.PI + outAlpha;
    if (absinAlpha > Math.PI / 2 && absinAlpha < (3 * Math.PI) / 2) {
      if (absoutAlpha < Math.PI / 2 + Math.PI / 9)
        absoutAlpha = Math.PI / 2 + Math.PI / 9;
      else if (absoutAlpha > (3 * Math.PI) / 2 - Math.PI / 9)
        absoutAlpha = (3 * Math.PI) / 2 - Math.PI / 9;
    } else {
      if (absoutAlpha > Math.PI / 2 - Math.PI / 9 && absoutAlpha < Math.PI)
        absoutAlpha = Math.PI / 2 - Math.PI / 9;
      else if (
        absoutAlpha < (3 * Math.PI) / 2 + Math.PI / 9 &&
        absoutAlpha > Math.PI
      )
        absoutAlpha = (3 * Math.PI) / 2 + Math.PI / 9;
    }
    outAlpha = absoutAlpha > 180 ? absoutAlpha - 2 * Math.PI : absoutAlpha;
    return [1 * speed * Math.cos(outAlpha), speed * Math.sin(outAlpha)];
  }

  ballBarRedir() {
    if (
      this.gameInfo.ballx <= this.gameInfo.barLarge + this.gameInfo.barDist &&
      this.gameInfo.ballx >= this.gameInfo.barDist
    ) {
      let temp = 0;
      while (temp < this.gameInfo.ballSize) {
        if (
          this.gameInfo.bally + temp <= this.gameInfo.oneBary + this.gameInfo.barSize &&
          this.gameInfo.bally + temp >= this.gameInfo.oneBary
        ) {
          const ret =
            (this.gameInfo.bally - this.gameInfo.oneBary) / this.gameInfo.barSize;
          [this.gameInfo.ballDirx, this.gameInfo.ballDiry] = this.redirection(
            ret,
            {
              x: this.gameInfo.ballDirx,
              y: this.gameInfo.ballDiry,
            },
          );
          return;
        }
        temp++;
      }
    }
    if (
      this.gameInfo.ballx + this.gameInfo.ballSize >=
        this.gameInfo.gamexsize -
          this.gameInfo.barLarge -
          this.gameInfo.barDist &&
      this.gameInfo.ballx + this.gameInfo.ballSize <=
        this.gameInfo.gamexsize - this.gameInfo.barDist
    ) {
      let temp = 0;
      while (temp < this.gameInfo.ballSize) {
        if (
          this.gameInfo.bally + temp <=
            this.gameInfo.twoBary + this.gameInfo.barSize &&
          this.gameInfo.bally + temp >= this.gameInfo.twoBary
        ) {
          const ret =
            (this.gameInfo.bally - this.gameInfo.twoBary) / this.gameInfo.barSize;
          [this.gameInfo.ballDirx, this.gameInfo.ballDiry] = this.redirection(
            ret,
            {
              x: this.gameInfo.ballDirx,
              y: this.gameInfo.ballDiry,
            },
          );
          this.gameInfo.ballDirx *= -1;
          return;
        }
        temp++;
      }
    }
  }
  public getMatchInfo() {
    return this.matchInfo;
  }
  constructor(connectedClientList: clientInfoDto[], isCustom: LobbyCustom, matchInfo: gameInfo) {
    this.connectedClient = connectedClientList;
    this.isCustom = isCustom;
    this.matchInfo = matchInfo;
    if (this.isCustom == 'custom') {
      this.gameInfo.ballSize = matchInfo.ballSize;
      this.defaultGameInfo.ballSize = matchInfo.ballSize;
      this.gameInfo.barSize = matchInfo.barSize;
      this.defaultGameInfo.barSize = matchInfo.barSize;
    }
  }
  public readonly isCustom: LobbyCustom;
  private readonly matchInfo: matchInfoDto;

  private connectedClient: clientInfoDto[];
  public readonly id: string = uuidv4();

  private clients: clientInfoDto[] = [];

  addClient(client: clientInfoDto) {
    this.clients.push(client);
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  private defaultGameInfo: gameInfo = {
    name: 'default',
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
  private gameInfo: gameInfo = {
    name: this.defaultGameInfo.name,
    borderSize: this.defaultGameInfo.borderSize,
    midSquareSize: this.defaultGameInfo.midSquareSize,
    menuSize: this.defaultGameInfo.menuSize,
    ysize: this.defaultGameInfo.ysize,
    xsize: this.defaultGameInfo.xsize,
    gamey: this.defaultGameInfo.gamey,
    gamex: this.defaultGameInfo.gamex,
    ballx: this.defaultGameInfo.ballx,
    bally: this.defaultGameInfo.bally,
    barDist: this.defaultGameInfo.barDist,
    oneBary: this.defaultGameInfo.oneBary,
    twoBary: this.defaultGameInfo.twoBary,
    barSpeed: this.defaultGameInfo.barSpeed,
    ballDirx: this.defaultGameInfo.ballDirx,
    ballDiry: this.defaultGameInfo.ballDiry,
    ballSpeed: this.defaultGameInfo.ballSpeed,
    gamexsize: this.defaultGameInfo.gamexsize,
    gameysize: this.defaultGameInfo.gameysize,
    barLarge: this.defaultGameInfo.barLarge,
    oneScore: this.defaultGameInfo.oneScore,
    twoScore: this.defaultGameInfo.twoScore,
    ballDeb: this.defaultGameInfo.ballDeb,
    ballSize: this.defaultGameInfo.ballSize,
    barSize: this.defaultGameInfo.barSize,
    itemx: this.defaultGameInfo.itemx,
    itemy: this.defaultGameInfo.itemy,
    itemSize: this.defaultGameInfo.itemSize,
  };
  move() {
    if (this.clients[0].input.direction == 'up')
      if (this.gameInfo.oneBary > 0)
        this.gameInfo.oneBary = this.gameInfo.oneBary - this.gameInfo.barSpeed;
    if (this.clients[0].input.direction == 'down')
      if (this.gameInfo.oneBary + this.gameInfo.barSize < this.gameInfo.gameysize)
        this.gameInfo.oneBary = this.gameInfo.oneBary + this.gameInfo.barSpeed;
    if (this.clients[1].input.direction == 'up')
      if (this.gameInfo.twoBary > 0)
        this.gameInfo.twoBary = this.gameInfo.twoBary - this.gameInfo.barSpeed;
    if (this.clients[1].input.direction == 'down')
      if (this.gameInfo.twoBary + this.gameInfo.barSize < this.gameInfo.gameysize)
        this.gameInfo.twoBary = this.gameInfo.twoBary + this.gameInfo.barSpeed;
  }
  itemPick() {
    let tempx = 0;
    let tempy = 0;
    while (tempy < this.gameInfo.ballSize) {
      while (tempx < this.gameInfo.ballSize) {
        if (
          this.gameInfo.bally + tempy <= this.gameInfo.itemy + this.gameInfo.itemSize &&
          this.gameInfo.bally + tempy >= this.gameInfo.itemSize
        ) {
          if (
            this.gameInfo.ballx + tempx <= this.gameInfo.itemx + this.gameInfo.itemSize &&
            this.gameInfo.ballx + tempx >= this.gameInfo.itemSize
          ) {
            this.gameInfo.itemSize = -1;
            this.gameInfo.ballSize = 10;
            return;
          }
        }
        tempx++;
      }
      tempx = 0;
      tempy++;
    }
  }
  update() {
    this.move();
    this.score();
    let i = this.gameInfo.ballSpeed;
    while (i > 0) {
      this.ballWallRedir();
      this.ballBarRedir();
      if (this.gameInfo.itemSize > 0)
      this.itemPick();
      this.gameInfo.ballx = this.gameInfo.ballx + this.gameInfo.ballDirx;
      this.gameInfo.bally = this.gameInfo.bally + this.gameInfo.ballDiry;
      i--;
    }
  }

  async start() {
    this.clients[0].socket.emit('server.matchStart', this.defaultGameInfo);
    this.clients[1].socket.emit('server.matchStart', this.defaultGameInfo);
    while (this.finish === 0 && this.gameInfo.oneScore < 9 && this.gameInfo.twoScore < 9) {
      this.update();
      this.clients[0].socket.emit('server.update', {
        ballx: this.gameInfo.ballx,
        bally: this.gameInfo.bally,
        oneBary: this.gameInfo.oneBary,
        twoBary: this.gameInfo.twoBary,
        oneScore: this.gameInfo.oneScore,
        twoScore: this.gameInfo.twoScore,
        ballSize: this.gameInfo.ballSize,
        barSize: this.gameInfo.barSize,
        itemx: this.gameInfo.itemx,
        itemy: this.gameInfo.itemy,
        itemSize: this.gameInfo.itemSize,
      });
      this.clients[1].socket.emit('server.update', this.gameInfo);
      await this.delay(20);
    }
    if (this.gameInfo.oneScore == 9) {
      this.win(this.clients[0], this.clients[1]);
      this.lose(this.clients[1]);
    }
    if (this.gameInfo.twoScore == 9) {
      this.win(this.clients[1], this.clients[0]);
      this.lose(this.clients[0]);
    }
    this.clients.forEach((value) => {
      value.lobby = null;
      value.status = 'connected';
    });
    this.disconnectAll();
  }
}
