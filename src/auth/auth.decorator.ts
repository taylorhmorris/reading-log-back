import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export const AuthUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (!request?.user) {
      throw new UnauthorizedException('No authenticated user');
    }
    console.log(request.user);
    return request.user;
  },
);
