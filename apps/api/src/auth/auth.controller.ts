import { Controller, Get, Query, Redirect } from '@nestjs/common';

@Controller('/auth')
export class AuthController {
  @Get('/')
  @Redirect()
  redirectTo42Auth() {
    const api42_id = process.env.API42_ID;
    const api42_callback = process.env.API42_CALLBACK;
    const url_auth42 = `https://api.intra.42.fr/oauth/authorize?client_id=${api42_id}&redirect_uri=${api42_callback}&response_type=code&state=123`;

    return { url: url_auth42 };
  }

  // To-Do: echanger le code contre l'access token
  // To-Do: echanger l'access token contre les infos user
  @Get('/callback')
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
      redirect_uri: process.env.API42_CALLBACK,
      state: state,
    };

    console.log('body: ', body);
    try {
      // const response = await fetch(api42_endpoint, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(body),
      // });

      console.log('code: ', code);
      console.log('state: ', state);
      // console.log('response: ', response);

      // if (!response.ok) {
      //   throw new Error('Network response was not ok');
      // }

      // return ({response});
    } catch (error) {
      console.log('error: ', error);
    }
  }
}
