import { storage } from "@proghours/data-access";
import jwtDecode from "jwt-decode";

type User = {
  email: string;
  id: number;
  role: string;
};

export function useUser() {
  const token = storage.getToken();
  let user: User | null = null;
  if (token) {
    try {
      const decoded = jwtDecode<{
        exp: number;
        email: string;
        sub: number;
        role: string;
      }>(token);
      const currentTimestamp = Math.floor(Date.now() / 1000);
      if (currentTimestamp < decoded.exp) {
        user = {
          id: decoded.sub,
          email: decoded.email,
          role: decoded.role
        };
      }
    } catch {
      user = null;
    }
  }
  return {
    user
  };
}
