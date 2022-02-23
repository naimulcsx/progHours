import { AuthService } from 'src/modules/auth/auth.service';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  it('should be defined', () => {
    let authService: AuthService;
    expect(new AuthGuard(authService)).toBeDefined();
  });
});
