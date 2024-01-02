import {
  Body,
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
import { JWT } from './jwt.services';
import { TwoFactorAuthenticationService } from './twoFactorAuthentication.service';
import { UserService } from '../user/user.service';
import { User } from '@prisma/client';

function generateRandomState(): string {
  return randomBytes(16).toString('hex');
}

@Controller('/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly twoFactorAuthenticationService: TwoFactorAuthenticationService,
    private readonly jwtService: JWT,
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
      return { url: `http://localhost:5173/auth/2fa/${user.id}` };
    } else {
      const token = await this.jwtService.generateJWTToken(user);
      return {
        url: `http://localhost:5173/auth/redirect/${token}`,
      };
    }
  }

  @Public() // Ne pas laisser ça public car normalement réservé aux admins
  @Redirect()
  @Get('/impersonate/:id')
  async impersonateUser(@Param('id') id: number) {
    const token = await this.jwtService.generateFakeJWTToken(id);
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

  @Get('/2fa/enable')
  async enableTwoFA(@Res() response: Response, @CurrentUser() user: User) {
    const { otpauthUrl } =
      await this.twoFactorAuthenticationService.generateTwoFactorAuthenticationSecret(
        user,
      );
    return this.twoFactorAuthenticationService.pipeQrCodeStream(
      response,
      otpauthUrl,
    );
  }

  @Get('/2fa/disable')
  async disableTwoFA(@CurrentUserID() id: number) {
    await this.userService.updateUser(id, {
      secret_2fa: null,
      is_enable_2fa: false,
    });
  }

  @Public()
  @Post('/2fa/submit/:id')
  async submitTwoFactorAuthenticationCode(
    @Param('id') id: number,
    @Body('code') code: string,
  ) {
    const user =
      await this.twoFactorAuthenticationService.checkUserFirstAuthentication(
        id,
      );
    this.twoFactorAuthenticationService.checkTwoFactorAuthenticationCodeValidity(
      code,
      user,
    );
    const token = await this.jwtService.generateJWTToken(user);
    return {
      statusCode: HttpStatus.OK,
      message: 'User is authenticated',
      token,
    };
  }
}
