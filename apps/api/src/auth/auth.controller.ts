import { Controller, Get, Param, Query, Redirect } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { CurrentUserID } from 'src/decorators/user.decorator';

function generateRandomState(): string {
  return randomBytes(16).toString('hex');
}

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
    const token = await this.authService.signIn(code, state);
    return { url: `http://localhost:5173/auth/redirect/${token.access_token}` };
    //if (user.is_enable_2fa) {
    // return { url: `http://localhost:5173/auth/2fa` };
    // } else {
    // generate token and send it to front
    // }
  }

  @Public() // Ne pas laisser ça public car normalement réservé aux admins
  @Redirect()
  @Get('/impersonate/:id')
  async impersonateUser(@Param('id') id: number) {
    const token = await this.authService.impersonateSignIn(id);
    return { url: `http://localhost:5173/auth/redirect/${token.access_token}` };
  }

  @Get('/disconnect')
  async disconnectUser(@CurrentUserID() id: number) {
    await this.authService.disconnectUser(id);
  }
}
