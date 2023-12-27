import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    console.log("@CurrentUser: user: ", request['user']);
    return request['user'];
  },
);

export const CurrentUserID = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    console.log("@CurrentUser: user.id: ", request['user'].id);
    return request['user'].id;
  },
);
