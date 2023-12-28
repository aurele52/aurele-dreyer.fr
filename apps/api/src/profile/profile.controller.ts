import {
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
  UploadedFile,
  Res,
  HttpStatus,
  StreamableFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProfileService } from './profile.service';
import { CurrentUser, CurrentUserID } from 'src/decorators/user.decorator';
import * as path from 'path';
import * as fs from 'fs';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('/user/:id')
  async getProfile(@Param('id') id: number, @CurrentUser() user) {
    if (!id) return null;
    const userProfile = await this.profileService.profile(id, user.id);

    return userProfile;
  }

  @Get('/user')
  async getSelfProfile(@CurrentUser() user) {
    const userProfile = await this.profileService.profile(user.id, 0);

    return userProfile;
  }

  @Get('/historic/:id')
  async getHistoric(@Param('id') id: number) {
    return this.profileService.historic(id);
  }

  @Get('/historic')
  async getSelfHistoric(@CurrentUser() user) {
    return this.profileService.historic(user.id);
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
      return {
        statusCode: HttpStatus.OK,
        message: 'File uploaded successfully',
        filePath: `/public/avatars/${fileName}`,
      };
    } catch (error) {
      console.error('Error handling file upload:', error);
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error handling file upload',
      };
    }
  }

  @Get('/avatar/:filename')
  serveStaticFile(@Param('filename') filename: string) {
    console.log('Serving file');
    const file = fs.createReadStream(
      path.join(__dirname, '../..', 'public', 'avatars', filename),
    );
    return new StreamableFile(file);
  }
}
