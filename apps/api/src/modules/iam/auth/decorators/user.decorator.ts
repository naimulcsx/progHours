import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export type UserJwtPayload = {
  sub: number;
  email: string;
  role: string;
  iat: number;
  exp: number;
};

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  }
);
