import {
  Inject,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../modules/auth/auth.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject(AuthService) private authService: AuthService) {}
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
      return new Promise<boolean>(async (resolve, reject) => {
        const user = await this.authService.getUser(data.username);
        //! Making sure the user exists in our system
        if (!user) return resolve(false);
        return resolve(true);
      });
    } catch (err) {
      // ! If the accessToken is invalid
      return false;
    }
  }
}
