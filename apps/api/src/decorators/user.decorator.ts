import { createParamDecorator } from '@nestjs/common';

export const CurrentUser = createParamDecorator(() => {
  return {
    id: 1,
  };
});
