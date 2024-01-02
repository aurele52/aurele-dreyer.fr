import {
  Body,
  Controller,
  Get,
  MessageEvent,
  Param,
  Post,
  Sse,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { CurrentUserID } from 'src/decorators/user.decorator';
import { Observable, interval, merge } from 'rxjs';
import { map } from 'rxjs/operators';

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
    const message = await this.messageService.createMessage(
      channel_id,
      user_id,
      content,
    );
    this.messageService.emitMessage(message);
    return message;
  }

  @Sse('/stream/messages')
  streamMessages(): Observable<MessageEvent> {
    const heartbeat = interval(30000).pipe(map(() => ({ data: '' })));

    const message = this.messageService
      .getMessageEvents()
      .pipe(map((message) => ({ data: message })));

    return merge(heartbeat, message);
  }
}
