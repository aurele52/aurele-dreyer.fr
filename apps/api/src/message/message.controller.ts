import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MessageService } from './message.service';
import { CurrentUserID } from 'src/decorators/user.decorator';

@Controller()
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get('/messages/:channelid')
  async findChannelMessages(@Param('channelid') channel_id: number) {
    return await this.messageService.channelMessages(channel_id);
  }

  @Post('/message')
  async createMessage(
    @Body('channel_id') channel_id: number,
    @Body('message') content: string,
    @CurrentUserID() user_id: number,
  ) {
    return await this.messageService.createMessage(
      channel_id,
      user_id,
      content,
    );
  }
}
