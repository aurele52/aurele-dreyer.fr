import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { CurrentUserID } from 'src/decorators/user.decorator';

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
  getId(@CurrentUserID() id) {
    return id;
  }
}
