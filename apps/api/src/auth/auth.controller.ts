import { Controller, Get, Query, Redirect } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { AuthService } from './auth.service';

function generateRandomState(): string {
  return randomBytes(16).toString('hex');
}

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/')
  @Redirect()
  redirectTo42Auth() {
    const api42_id = process.env.API42_ID;
    const api42_callback = process.env.API42_CALLBACK;
    const state = generateRandomState();
    const url_auth42 = `https://api.intra.42.fr/oauth/authorize?client_id=${api42_id}&redirect_uri=${api42_callback}&response_type=code&state=${state}`;
    return { url: url_auth42 };
  }

  @Get('/callback')
  async callbackFrom42Auth(
    @Query('code') code: string,
    @Query('state') state: string,
  ) {
    return this.authService.signIn(code, state);
  }
}
