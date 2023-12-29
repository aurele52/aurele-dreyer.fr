import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
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

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

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

      const new_link = 'http://localhost:5173/api/user/avatar/' + fileName;

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
}
