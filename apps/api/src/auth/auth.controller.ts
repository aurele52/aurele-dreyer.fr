import { Controller, Get, Query, Redirect, Req } from '@nestjs/common';
import { Request, response } from 'express';
import { randomBytes } from 'crypto';
import { ftruncate } from 'fs';

function generateRandomState(): string {
  return randomBytes(16).toString('hex');
}

@Controller('/auth')
export class AuthController {
  @Get('/')
  @Redirect()
  redirectTo42Auth() {
    const api42_id = process.env.API42_ID;
    const api42_callback = process.env.API42_CALLBACK;
    const state = generateRandomState();
    const url_auth42 = `https://api.intra.42.fr/oauth/authorize?client_id=${api42_id}&redirect_uri=${api42_callback}&response_type=code&state=${state}`;
    return { url: url_auth42 };
  }

  @Get('/callback') // lors de requete get /callback
  async callbackFrom42Auth(
    // declenche fonction
    @Query('code') code: string, // extrait code
    @Query('state') state: string,
  ) {
    // extrait state
    //	@Req() request: Request,)
    //	const fullUrl = request.protocol + '://' + request.get('host') + request.originalUrl;
    //	console.log('URL complète :', fullUrl);

    const api42_endpoint = 'https://api.intra.42.fr/oauth/token'; //verifier l'adresse
    // = url utilisee pour echanger le code d'autorisation contre le token

    //envoie de la requete POST avec le body en JSON
    const access_token = await fetch(api42_endpoint, {
      // renvoie objet de type Response qui represente la reponse http à la requete POST
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        grant_type: 'authorization_code',
        client_id: process.env.API42_ID,
        client_secret: process.env.API42_SECRET,
        code: code,
        redirect_uri: process.env.API42_CALLBACK,
        state: state,
      }), //le type utilisé pour le corps doit correspondre à l'en-tête "Content-Type"
    })
      .then((response) => {
        if (!response.ok) return Promise.reject(response);
        return response.json();
      }) //transforme la réponse JSON reçue en objet JavaScript natif
      .then((json) => json.access_token) //on extract la variable 'access_token' de ce json
      .catch((response) => {
        console.log(
          'ERROR: could not get access token\nError:',
          response.status,
          response.statusText,
        );
        response.json().then((json: any) => {
          console.log(json);
        });
      });

    const user_info = await fetch('https://api.intra.42.fr/v2/me', {
      method: 'GET',
      headers: { Authorization: `Bearer ${access_token}` },
    })
      .then((response) => {
        if (!response.ok) return Promise.reject(response);
        return response.json();
      })
      .catch((response) => {
        console.log(
          'ERROR: could not get user info\nError:',
          response.status,
          response.statusText,
        );
        response.json().then((json: any) => {
          console.log(json);
        })
        return (response.status, response.statusText);
      });
      
    const login = user_info.login;
    const avatar = user_info.image.versions;
    return { login, avatar };
  }
}
