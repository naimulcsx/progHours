import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class IsAuthenticatedGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const { accessToken } = req.cookies;
    // ! If there is no accessToken
    if (!accessToken) return false;
    try {
      const data: any = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET,
      );
      req.user = data;
      return true;
    } catch (err) {
      // ! If the accessToken is invalid
      return false;
    }
  }
}
