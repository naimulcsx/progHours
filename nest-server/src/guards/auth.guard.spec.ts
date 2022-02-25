import { AuthService } from 'src/modules/auth/auth.service';
import { IsAuthenticatedGuard } from './is-authenticated';

describe('AuthGuard', () => {
  it('should be defined', () => {
    let authService: AuthService;
    expect(new IsAuthenticatedGuard(authService)).toBeDefined();
  });
});
