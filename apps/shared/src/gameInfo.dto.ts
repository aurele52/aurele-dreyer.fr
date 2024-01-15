import { IsInt, IsOptional, IsString } from "class-validator";

export class gameInfoDto {
  @IsOptional()
  @IsInt()
  barLarge?: number = 10;
  @IsOptional()
  @IsInt()
  barDist?: number = 20;
  @IsOptional()
  @IsInt()
  barSpeed?: number = 20;
  @IsOptional()
  @IsInt()
  barSize?: number = 100;

  @IsOptional()
  @IsInt()
  ballSpeed?: number = 4;
  @IsOptional()
  @IsInt()
  ballSize?: number = 10;

  @IsOptional()
  @IsInt()
  itemSize?: number = 10;

  @IsOptional()
  @IsInt()
  oneScore?: number = 0;
  @IsOptional()
  @IsInt()
  twoScore?: number = 0;

  @IsOptional()
  @IsInt()
  borderSize?: number = 10;
  @IsOptional()
  @IsInt()
  numberSize?: number = 10;
  @IsOptional()
  @IsInt()
  menuSize?: number = 90;
  @IsOptional()
  @IsInt()
  numberSideDist?: number = 10;
  @IsOptional()
  @IsInt()
  numberTopDist?: number = 10;

  @IsOptional()
  @IsInt()
  ysize?: number = 500;
  @IsOptional()
  @IsInt()
  xsize?: number = 800;

  @IsOptional()
  @IsString()
  oneBarColor?: string = 'white';
  @IsOptional()
  @IsString()
  twoBarColor?: string = 'white';
  @IsOptional()
  @IsString()
  ballColor?: string = 'white';
  @IsOptional()
  @IsString()
  backgroundColor?: string = 'black';
  @IsOptional()
  @IsString()
  borderColor?: string = 'white';
  @IsOptional()
  @IsString()
  oneScoreColor?: string = 'white';
  @IsOptional()
  @IsString()
  twoScoreColor?: string = 'white';
  @IsOptional()
  @IsString()
  menuColor?: string = 'black';
  // not in setting
  @IsOptional()
  @IsString()
  name?: string = 'normal';

  @IsOptional()
  @IsInt()
  oneBary?: number = 10;
  @IsOptional()
  @IsInt()
  twoBary?: number = 10;

  @IsOptional()
  @IsInt()
  gamey?: number = 400;
  @IsOptional()
  @IsInt()
  gamex?: number = 780;
  @IsOptional()
  @IsInt()
  gamexsize?: number = 780;
  @IsOptional()
  @IsInt()
  gameysize?: number = 380;
  
  @IsOptional()
  @IsInt()
  itemx?: number = 40;
  @IsOptional()
  @IsInt()
  itemy?: number = 40;

  @IsOptional()
  @IsInt()
  ballDirx?: number = -1;
  @IsOptional()
  @IsInt()
  ballDiry?: number = -0.4;
  @IsOptional()
  @IsInt()
  ballx?: number = 100;
  @IsOptional()
  @IsInt()
  bally?: number = 100;
  @IsOptional()
  @IsInt()
  ballDeb?: number = 150;
}
