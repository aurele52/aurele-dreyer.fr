import {
  ClassSerializerInterceptor,
  Controller,
  UseInterceptors,
  Res,
  Get,
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

  @Get('/generate')
  async register(@Res() response: Response, @CurrentUser() user) {
    const { otpauthUrl } =
      await this.twoFactorAuthenticationService.generateTwoFactorAuthenticationSecret(
        user,
      );
    return this.twoFactorAuthenticationService.pipeQrCodeStream(
      response,
      otpauthUrl,
    );
  }
}
