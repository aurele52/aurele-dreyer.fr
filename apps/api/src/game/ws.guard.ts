import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class WsGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('WSGUARD');
    const token = context
      .switchToWs()
      .getClient()
      .handshake.headers.authorization.split(' ')[1]; // token saved as `Bearer ${token}`

    try {
      const payload = await this.authService.checkTokenValidity(
        String(token),
        process.env.APP_SECRET,
      );

      return new Promise((resolve, reject) => {
        return this.userService.getUser(payload.id).then((user) => {
          if (user) {
            context.switchToWs().getData().user = user; // save user info to a user object.
            resolve(Boolean(user));
          } else {
            reject(false);
          }
        });
      });
    } catch (ex) {
      throw new WsException(ex.message);
    }
  }
}
