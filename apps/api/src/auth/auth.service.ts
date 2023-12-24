import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async fetchAccessToken(code: string, state: string) {
    return fetch('https://api.intra.42.fr/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        grant_type: 'authorization_code',
        client_id: process.env.API42_ID,
        client_secret: process.env.API42_SECRET,
        code: code,
        redirect_uri: process.env.API42_CALLBACK,
        state: state,
      }),
    })
      .then((response) => {
        if (!response.ok) return Promise.reject(response);
        return response.json();
      })
      .then((json) => json.access_token);
  }

  async fetchUserInfo(access_token: string) {
    return fetch('https://api.intra.42.fr/v2/me', {
      method: 'GET',
      headers: { Authorization: `Bearer ${access_token}` },
    }).then((response) => {
      if (!response.ok) return Promise.reject(response);
      return response.json();
    });
  }

  async acceptUser(code: string, state: string) {
    try {
      const access_token = await this.fetchAccessToken(code, state);
      const user_info = await this.fetchUserInfo(access_token);
      const login = user_info.login;
      const avatar = user_info.image.versions;
      return { login, avatar };
    } catch (error) {
      console.log(
        `ERROR: could not get user info\nError ${error.status}: ${error.statusText}`,
      );
      error.json().then((json: any) => {
        console.log(json);
      });
      return `ERROR ${error.status}: ${error.statusText}`;
    }
  }
}
