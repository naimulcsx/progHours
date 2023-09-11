import { Request } from "express";

import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { REQUEST_USER_KEY } from "../constants/auth.constants";

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token);
      request[REQUEST_USER_KEY] = payload;
    } catch {
      throw new HttpException("Invalid token", HttpStatus.EXPECTATION_FAILED);
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [token] = request.headers.authorization?.split(" ").reverse() ?? [];
    return token;
  }
}
