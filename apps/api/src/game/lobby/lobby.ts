import { v4 as uuidv4 } from 'uuid';
import { LobbyCustom } from '../types';
import { clientInfoDto } from '../dto-interface/clientInfo.dto';
interface gameInfo {
  barDist: number;
  barSpeed: number;
  barLarge: number;
  barSize: number;
  ballDirx: number;
  ballDiry: number;
  ballSpeed: number;
  ballSize: number;
  ballDeb: number;
  gamexsize: number;
  gameysize: number;
  ballx: number;
  bally: number;
  oneBary: number;
  twoBary: number;
  oneScore: number;
  twoScore: number;
}

export class lobby {
  ballWallRedir() {
    if (
      this.gameInfo.bally + this.gameInfo.ballSize + this.gameInfo.ballSpeed >=
      this.gameInfo.gameysize
    )
      this.gameInfo.ballDiry *= -1;
    if (this.gameInfo.bally - this.gameInfo.ballSpeed <= 0)
      this.gameInfo.ballDiry *= -1;
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
      if (
        this.gameInfo.bally <= this.gameInfo.oneBary + this.gameInfo.barSize &&
        this.gameInfo.bally >= this.gameInfo.oneBary
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
      if (
        this.gameInfo.bally + this.gameInfo.ballSize / 2 <=
          this.gameInfo.twoBary + this.gameInfo.barSize &&
        this.gameInfo.bally + this.gameInfo.ballSize / 2 >=
          this.gameInfo.twoBary
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
      }
    }
  }
  constructor(connectedClientList: clientInfoDto[], isCustom: LobbyCustom) {
    this.connectedClient = connectedClientList;
    this.isCustom = isCustom;
  }
  public readonly isCustom: LobbyCustom;

  private connectedClient: clientInfoDto[];
  public readonly id: string = uuidv4();

  private clients: clientInfoDto[] = [];

  addClient(client: clientInfoDto) {
    this.clients.push(client);
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  private gameInfo: gameInfo = {
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
    barSize: 100,
    barLarge: 10,
    oneScore: 0,
    twoScore: 0,
    ballDeb: 150,
    ballSize: 10,
  };
  move() {
    if (this.clients[0].input.direction == 'up')
      if (this.gameInfo.oneBary + this.gameInfo.barSize < this.gameInfo.gameysize)
        this.gameInfo.oneBary = this.gameInfo.oneBary - this.gameInfo.barSpeed;
    if (this.clients[0].input.direction == 'down')
      if (this.gameInfo.oneBary > 0)
        this.gameInfo.oneBary = this.gameInfo.oneBary + this.gameInfo.barSpeed;
    if (this.clients[1].input.direction == 'up')
      if (this.gameInfo.twoBary + this.gameInfo.barSize < this.gameInfo.gameysize)
        this.gameInfo.twoBary = this.gameInfo.twoBary - this.gameInfo.barSpeed;
    if (this.clients[1].input.direction == 'down')
      if (this.gameInfo.twoBary > 0)
        this.gameInfo.twoBary = this.gameInfo.twoBary + this.gameInfo.barSpeed;
  }
  update() {
    this.move();
    this.score();
    let i = this.gameInfo.ballSpeed;
    while (i > 0) {
      this.ballWallRedir();
      this.ballBarRedir();
      this.gameInfo.ballx = this.gameInfo.ballx + this.gameInfo.ballDirx;
      this.gameInfo.bally = this.gameInfo.bally + this.gameInfo.ballDiry;
      i--;
    }
  }

  async start() {
    for (let i = 0; i < 10000; i++) {
      this.update();
      this.clients[0].socket.emit('server.update', {
        ballx: this.gameInfo.ballx,
        bally: this.gameInfo.bally,
        oneBary: this.gameInfo.oneBary,
        twoBary: this.gameInfo.twoBary,
        oneScore: this.gameInfo.oneScore,
        twoScore: this.gameInfo.twoScore,
      });
      this.clients[1].socket.emit('server.update', this.gameInfo);
      await this.delay(20);
    }
  }
}
