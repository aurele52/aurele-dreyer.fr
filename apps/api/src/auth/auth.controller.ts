import { Controller, Get, Query, Redirect, UseGuards } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';

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
    const api42_callback = process.env.API42_CALLBACK;
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
  }
}
