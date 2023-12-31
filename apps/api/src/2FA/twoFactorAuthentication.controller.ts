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

  @Post('turn-on')
  @HttpCode(200)
  async turnOnTwoFactorAuthentication(
    @CurrentUser() user,
    @Body() code: string,
  ) {
    const isCodeValid =
      this.twoFactorAuthenticationService.isTwoFactorAuthenticationCodeValid(
        code,
        user,
      );
    if (!isCodeValid) {
      throw new UnauthorizedException('Wrong authentication code');
    }
    console.log('User logged');
  }
}
