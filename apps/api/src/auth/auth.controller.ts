import { Controller, Get, Query, Redirect, Req } from '@nestjs/common';
import { Request } from 'express';
import { randomBytes } from 'crypto';

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

  // To-Do: echanger le code contre l'access token
  // To-Do: echanger l'access token contre les infos user


  @Get('/callback') // lors de requete get /callback
  async callbackFrom42Auth( // declenche fonction
    @Query('code') code: string, // extrait code
    @Query('state') state: string,) // extrait state
//	@Req() request: Request,) 
	{
	//	const fullUrl = request.protocol + '://' + request.get('host') + request.originalUrl;
    //	console.log('URL complète :', fullUrl);

    	const api42_endpoint = 'https://api.intra.42.fr/oauth/token'; //verifier l'adresse
		// = url utilisee pour echanger le code d'autorisation contre le token 
		// = là que la requete POST est envoyée (contenant le body avec les infos à echanger)
    	const body = {
    	  grant_type: 'authorization_code',
    	  client_id: process.env.API42_ID,
    	  client_secret: process.env.API42_SECRET,
    	  code: code,
    	  redirect_uri: process.env.API42_CALLBACK,
    	  state: state,
    };

    console.log('body: ', body);
	//envoie de la requete POST avec le body en JSON
      const response = await fetch(api42_endpoint, { // renvoie objet de type Response qui represente la reponse http à la requete POST
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      console.log('code: ', code);
      console.log('state: ', state);
      console.log('response: ', response); //a affiche l'objet reponse
//      console.log('response status: ', response.status); //donne le code de statut http
  //    console.log('response body json: ', await response.json()); // corps de la reponse parse sous forme d'objet java script


      if (!response.ok) {
		console.log('response: AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAh ', await response.text()); // imprime le texte du corps de la reponse
		return ("truc");
 //       throw new Error('Network response was not ok');
      }

      return ({response : await response.json()});
    // } catch (error) {
    //   console.log('error: ', error);
//    }
  }
}
