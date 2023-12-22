import { Controller, Get, Query, Redirect } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Get('')
  @Redirect()
  redirectTo42Auth() {
    const api42_id = process.env.API42_ID;
    const api42_callback = process.env.API42_CALLBACK;
    const url_auth42 = `https://api.intra.42.fr/oauth/authorize?client_id=${api42_id}&redirect_uri=${api42_callback}&response_type=code`;

    return { url: url_auth42 };
  }

  @Get('callback')
  async callbackFrom42Auth(
    @Query('code') code: string,
    @Query('state') state: string,
  ) {
    const api42_endpoint = 'https://api.intra.42.fr/oauth/token';
    const body = {
      grant_type: 'authorization_code',
      client_id: process.env.API42_ID,
      client_secret: process.env.API42_SECRET,
      code: code,
    };


    // To-Do: echanger le code contre l'access token
    // To-Do: echanger l'access token contre les infos user
  //   const result = await fetch({
  //     url: api42_endpoint,
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(body),
  //   });
  //   return { code, state };
  }
}