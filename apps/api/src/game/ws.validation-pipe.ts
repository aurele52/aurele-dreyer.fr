import { Injectable, ValidationPipe } from '@nestjs/common';

@Injectable()
export class WsValidationPipe extends ValidationPipe {}
