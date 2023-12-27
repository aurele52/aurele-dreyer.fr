import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { CurrentUser } from './decorators/user.decorator';

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
  getId(@CurrentUser() user) {
    return user.id;
  }
}
