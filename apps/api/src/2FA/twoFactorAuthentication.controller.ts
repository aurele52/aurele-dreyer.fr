import {
  ClassSerializerInterceptor,
  Controller,
  UseInterceptors,
  Res,
  Get,
  Post,
  Body,
  HttpCode,
  UnauthorizedException,
  Query,
  Param,
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
  @Get('/generate/:id')
  async register(@Res() response: Response, @Param('id') id: number) {
    const { otpauthUrl } =
      await this.twoFactorAuthenticationService.generateTwoFactorAuthenticationSecret(
        id,
      );
    return this.twoFactorAuthenticationService.pipeQrCodeStream(
      response,
      otpauthUrl,
    );
  }

  @Public()
  @Post('submit/:id')
  async submitTwoFactorAuthenticationCode(
    @Param('id') id: number,
    @Body('validation-code') code: string,
  ) {
    const user = await
      this.twoFactorAuthenticationService.checkUserFirstAuthentication(id);
    const isCodeValid =
      this.twoFactorAuthenticationService.isTwoFactorAuthenticationCodeValid(
        code,
        user,
      );
    if (!isCodeValid) {
      throw new UnauthorizedException('Wrong authentication code');
    }
    //    return { url: `http://localhost:5173/auth/redirect/${token.access_token}` };
  }
}
