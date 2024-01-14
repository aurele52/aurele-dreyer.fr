export interface gameInfo {
  barDist: number;
  barSpeed: number;
  barLarge: number;
  barSize: number;

  ballSpeed: number;
  ballSize: number;

  itemSize: number;

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

  itemx: number;
  itemy: number;

  ballx: number;
  bally: number;
  ballDirx: number;
  ballDiry: number;
  ballDeb: number;
}
export class gameInfoDto {
  barLarge: number = 10;
  barDist: number = 20;
  barSpeed: number = 20;
  barSize: number = 100;

  ballSpeed: number = 4;
  ballSize: number = 10;

  itemSize: number = 10;

  oneScore: number = 0;
  twoScore: number = 0;

  borderSize: number = 10;
  numberSize: number = 10;
  menuSize: number = 90;
  numberSideDist: number = 10;
  numberTopDist: number = 10;

  ysize: number = 500;
  xsize: number = 800;

  oneBarColor: string = 'white';
  twoBarColor: string = 'white';
  ballColor: string = 'white';
  backgroundColor: string = 'black';
  borderColor: string = 'white';
  oneScoreColor: string = 'white';
  twoScoreColor: string = 'white';
  menuColor: string = 'black';
  // not in setting
  name: string = 'normal';

  oneBary: number = 10;
  twoBary: number = 10;

  gamey: number = 400;
  gamex: number = 780;
  gamexsize: number = 780;
  gameysize: number = 380;
  
  itemx: number = 40;
  itemy: number = 40;

  ballDirx: number = -1;
  ballDiry: number = -0.4;
  ballx: number = 100;
  bally: number = 100;
  ballDeb: number = 150;
}
