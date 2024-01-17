export interface gameInfo {
  barDist: number;
  barSpeed: number;
  barLarge: number;
  barSize: number;

  ballSpeed: number;
  ballSize: number;


  oneScore: number;
  twoScore: number;

  borderSize: number;
  numberSize: number;
  menuSize: number;
  numberSideDist: number;
  numberTopDist: number;

  ysize: number;
  xsize: number;

  oneBarColor: string;
  twoBarColor: string;
  ballColor: string;
  backgroundColor: string;
  borderColor: string;
  oneScoreColor: string;
  twoScoreColor: string;
  menuColor: string;
  // not in setting
  name: string;

  oneBary: number;
  twoBary: number;

  gamey: number;
  gamex: number;
  gamexsize: number;
  gameysize: number;

  ballx: number;
  bally: number;
  ballDirx: number;
  ballDiry: number;
  ballDeb: number;

  upBallSize: boolean;
  downBallSize: boolean;

  id?: number;
  userId?: number;
}
