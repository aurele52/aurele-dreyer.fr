import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Redirect,
  Res,
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

function generateRandomState(): string {
  return randomBytes(16).toString('hex');
}

@Controller('/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly TwoFAService: TwoFAService,
    private readonly jwtService: JWT,
    private readonly userService: UserService,
  ) {}

  @Public()
  @Get('/')
  @Redirect()
  redirectTo42Auth() {
    const api42_id = process.env.API42_ID;
    const api42_callback = encodeURIComponent(`${process.env.DOMAIN_NAME_BACK}/api/auth/callback`);
    const state = generateRandomState();
    const url_auth42 = `https://api.intra.42.fr/oauth/authorize?client_id=${api42_id}&redirect_uri=${api42_callback}&response_type=code&state=${state}`;
    return { url: url_auth42 };
  }

  @Public()
  @Redirect()
  @Get('/callback')
  async callbackFrom42Auth(
    @Query('code') code: string,
    @Query('state') state: string,
  ) {
    const user = await this.authService.signIn(code, state);
    if (user.is_enable_2fa) {
      const jwt_id = await this.jwtService.generateJWTToken(
        user,
        process.env.APP_TMP_SECRET,
        '60s',
      );
      return { url: `${process.env.DOMAIN_NAME_FRONT}/auth/2fa/${jwt_id}` };
    } else {
      const token = await this.jwtService.generateJWTToken(
        user,
        process.env.APP_SECRET,
        '3d',
      );
      return { url: `${process.env.DOMAIN_NAME_FRONT}/auth/redirect/${token}` };
    }
  }

  @Public() // Ne pas laisser ça public car normalement réservé aux admins
  @Redirect()
  @Get('/impersonate/:id')
  async impersonateUser(@Param('id') id: number) {
    const token = await this.jwtService.generateFakeJWTToken(id);
    return { url: `${process.env.DOMAIN_NAME_FRONT}/auth/redirect/${token}` };
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
    const token = await this.jwtService.generateJWTToken(
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
