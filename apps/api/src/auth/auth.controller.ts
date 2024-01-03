import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Redirect,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { randomBytes } from 'crypto';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { CurrentUser, CurrentUserID } from 'src/decorators/user.decorator';
import { JWT } from './jwt.service';
import { TwoFAService } from './twoFA.service';
import { UserService } from '../user/user.service';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import * as fs from 'fs';
import { Express } from 'express';

function generateRandomState(): string {
  return randomBytes(16).toString('hex');
}

/* @Controller('/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly TwoFAService: TwoFAService,
    private readonly jwtService: JwtService,
    private readonly jwt: JWT,
    private readonly userService: UserService,
  ) {}

  @Public()
  @Get('/')
  @Redirect()
  redirectTo42Auth() {
    const api42_id = process.env.API42_ID;
    const api42_callback = 'http://localhost:3000/api/auth/callback';
    const state = generateRandomState();
    const url_auth42 = `https://api.intra.42.fr/oauth/authorize?client_id=${api42_id}&redirect_uri=${api42_callback}&response_type=code&state=${state}`;
    return { url: url_auth42 };
  } */

@Controller('/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly TwoFAService: TwoFAService,
    private readonly jwtService: JwtService,
    private readonly jwt: JWT,
    private readonly userService: UserService,
  ) {}

  @Public()
  @Get('/')
  @Redirect()
  redirectTo42Auth() {
    const api42_id = process.env.API42_ID;
    const api42_callback = 'http://localhost:3000/api/auth/callback';
    const state = generateRandomState();
    const url_auth42 = `http://localhost:3000/api/auth/callback`;
    return { url: url_auth42 };
  }

  @Public()
  @Redirect()
  @Get('/callback')
  async callbackFrom42Auth(
    @Query('code') code: string,
    @Query('state') state: string,
  ) {
    // !!!! Handle errors !!!!
    const user_infos_42 = await this.authService.fetchInfo42(code, state);
    if (!(await this.authService.getUserbyId42(user_infos_42.id))) {
      const jwt = await this.jwtService.signAsync(user_infos_42, {
        secret: process.env.APP_TMP_SECRET,
        expiresIn: '180s',
      });
      return { url: `http://localhost:5173/sign-up/${jwt}` };
    } else {
      const data = await this.authService.signIn(user_infos_42);
      if (data.twoFA) {
        return { url: `http://localhost:5173/auth/2fa/${data.jwt}` };
      } else {
        return { url: `http://localhost:5173/auth/redirect/${data.jwt}` };
      }
    }
  }

  @Public()
  @Post('/sign-up')
  @UseInterceptors(FileInterceptor('avatar'))
  async signUp(
    @Query('id') id: string,
    @Body('username') username: string,
    @UploadedFile() avatar,
  ) {
    console.log({ username, avatar });
    const avatar_url = (avatar) => {
      if (!avatar) return null;
      const fileName =
        'uploaded-avatar' + Date.now() + path.extname(avatar.originalname);
      const filePath = path.join(
        __dirname,
        '../..',
        'public',
        'avatars',
        fileName,
      );

      fs.writeFileSync(filePath, avatar.buffer);

      return 'http://localhost:5173/api/user/avatar/' + fileName;
    };
    const user_infos_42 = await this.jwtService.verifyAsync(id, {
      secret: process.env.APP_TMP_SECRET,
    });

    const token = await this.authService.registerUser(
      user_infos_42,
      avatar_url(avatar),
      username,
    );
  }

  @Public()
  @Redirect()
  @Get('/redirect-to-home')
  async redirectIdentifiedUser(@Query('id') id: string) {
    console.log({ id });
    const user_infos_42 = await this.jwtService.verifyAsync(id, {
      secret: process.env.APP_TMP_SECRET,
    });
    console.log(await this.authService.getUserbyId42(user_infos_42.id));
    const token = await this.jwt.generateJWTToken(
      await this.authService.getUserbyId42(user_infos_42.id),
      process.env.APP_SECRET,
      '3d',
    );
    return { url: `http://localhost:5173/auth/redirect/${token}` };
  }

  // @Public()
  // @Get('/impersonate/new/')
  // async impersonateNewUser(
  //   @Body('avatar_url') avatar_url: string,
  //   @Body('username') username: string,
  // ) {
  //   const token = await this.authService.registerFakeUser(avatar_url, username);
  //   return { url: `http://localhost:5173/auth/redirect/${token}` };
  // }

  @Public() // Ne pas laisser ça public car normalement réservé aux admins
  @Redirect()
  @Get('/impersonate/:id')
  async impersonateUser(@Param('id') id: number) {
    const token = await this.jwt.generateFakeJWTToken(id);
    return { url: `http://localhost:5173/auth/redirect/${token}` };
  }

  @Public()
  @Get('/abort/:id')
  async abortAuthentication(@Param('id') id: number) {
    await this.userService.updateUser(id, {
      token_42: null,
    });
  }

  @Get('/disconnect')
  async disconnectUser(@CurrentUserID() id: number) {
    await this.userService.updateUser(id, {
      token_42: null,
    });
  }

  @Post('/2fa/enable')
  async enableTwoFA(@CurrentUser() user: User) {
    const secret = await this.TwoFAService.generateSecret(user);
    await this.userService.updateUser(user.id, {
      secret_2fa: secret,
      is_enable_2fa: true,
    });
  }

  @Get('2fa/qr-code')
  async getQRCode(@Res() response: Response, @CurrentUser() user: User) {
    const { otpauthUrl } = await this.TwoFAService.generateQRCode(user);
    return this.TwoFAService.pipeQrCodeStream(response, otpauthUrl);
  }

  @Post('/2fa/disable')
  async disableTwoFA(@CurrentUserID() id: number) {
    await this.userService.updateUser(id, {
      secret_2fa: null,
      is_enable_2fa: false,
    });
  }

  @Public()
  @Get('/2fa/submit/')
  async submit2FACode(@Query('jwt_id') jwt_id: string, @Query('code') code) {
    const user_id = await this.TwoFAService.checkAuthorization(jwt_id);
    const user = await this.TwoFAService.getUser(user_id);
    this.TwoFAService.check2FACodeValidity(code, user);
    const token = await this.jwt.generateJWTToken(
      user,
      process.env.APP_SECRET,
      '3d',
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'User is authenticated',
      token,
    };
  }
}
