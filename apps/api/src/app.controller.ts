import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /*   @Get()
  getHello(): string {
    return this.appService.getHello();
  } */
  @Get()
  root() {
    console.log('Trying to acces root');
    return { message: 'Hiiiii' };
  }

  @Get('/id')
  getId() {
    return 1;
  }
}
