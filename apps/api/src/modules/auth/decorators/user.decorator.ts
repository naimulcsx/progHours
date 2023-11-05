import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export type ActiveUserData = {
  sub: string;
  email: string;
  username: string;
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
