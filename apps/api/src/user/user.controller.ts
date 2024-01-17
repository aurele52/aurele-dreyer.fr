import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Sse,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CurrentUser, CurrentUserID } from 'src/decorators/user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import * as fs from 'fs';
import { Public } from 'src/auth/decorators/public.decorator';
import { Observable, interval, merge } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { UserEventType } from './types/user-event.types';
import { ChannelService } from 'src/channel/channel.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly channelService: ChannelService,
  ) {}

  @Get('/:userid')
  async getOtherUser(@CurrentUser() selfid, @Param('userid') userid: number) {
    return this.userService.getOtherUser(selfid.id, userid);
  }

  @Get()
  async getUser(@CurrentUser() selfid) {
    return this.userService.getUser(selfid.id);
  }

  @Post('/username/:new_username')
  async createBlockedFriendship(
    @Param('new_username') username: string,
    @CurrentUser() user,
  ) {
    const usernamePattern = /^[a-zA-Z0-9_-]{4,15}$/;
    if (!usernamePattern.test(username)) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Invalid username format',
      };
    }
    return await this.userService.changeUsername(user.id, username);
  }

  @Post('/avatar')
  @UseInterceptors(FileInterceptor('avatar'))
  async uploadFile(@UploadedFile() file, @CurrentUserID() id) {
    try {
      if (!file) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'No file uploaded',
        };
      }

      const fileName =
        'uploaded-avatar' + Date.now() + path.extname(file.originalname);
      const filePath = path.join(
        __dirname,
        '../..',
        'public',
        'avatars',
        fileName,
      );

      fs.writeFileSync(filePath, file.buffer);

      const new_link = `${process.env.DOMAIN_NAME_FRONT}/api/user/avatar/${fileName}`;

      return await this.userService.postAvatar(id, new_link);
    } catch (error) {
      console.error('Error handling file upload:', error);
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error handling file upload',
      };
    }
  }

  @Get('/avatar/:filename')
  @Public()
  serveStaticFile(@Param('filename') filename: string) {
    const file = fs.createReadStream(
      path.join(__dirname, '../..', 'public', 'avatars', filename),
    );
    return new StreamableFile(file);
  }

  @Delete()
  async deleteUser(@CurrentUserID() id: number) {
    await this.channelService.deleteChannelOwner(id);

    const deletedUser = await this.userService.deleteUser(id);

    const users = await this.userService.getAllUserIds();

    this.userService.emitUserEvent(UserEventType.USERDELETED, users, id, 0);

    return deletedUser;
  }

  @Sse('/stream/userevents')
  streamUserEvents(@CurrentUserID() user_id): Observable<any> {
    const heartbeat = interval(30000).pipe(
      map(() => ({
        type: 'heartbeat',
        data: JSON.stringify({}),
      })),
    );

    const userEvent = this.userService.getUserEvents().pipe(
      filter((event) => event.recipientIds.includes(user_id)),
      map((event) => ({
        type: 'message',
        data: JSON.stringify({
          type: event.type,
          userId: event.userId,
          channelId: event.channelId,
        }),
      })),
    );

    return merge(heartbeat, userEvent);
  }
}
