import {
  ClassSerializerInterceptor,
  Controller,
  Header,
  Post,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { TwoFactorAuthenticationService } from './twoFactorAuthentication.service';
import { Response } from 'express';
import { CurrentUser, CurrentUserID } from 'src/decorators/user.decorator';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('/2fa')
@UseInterceptors(ClassSerializerInterceptor)
export class TwoFactorAuthenticationController {
  constructor(
    private readonly twoFactorAuthenticationService: TwoFactorAuthenticationService,
  ) {}
 
  @Public()
  @Post('/generate')
  async register(@Res() response: Response, @CurrentUser() user){
    const { otpauthUrl } = await this.twoFactorAuthenticationService.generateTwoFactorAuthenticationSecret(user);
    // return ("bonjour");
    return this.twoFactorAuthenticationService.pipeQrCodeStream(response, otpauthUrl);
  }
}