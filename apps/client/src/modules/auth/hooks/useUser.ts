import jwtDecode from "jwt-decode";

import { storage } from "@proghours/data-access";

type User = {
  email: string;
  username: string;
  fullName: string;
  id: string;
  role: string;
};

export function useUser() {
  const token = storage.getToken();
  let user: User | null = null;
  if (token) {
    try {
      const decoded = jwtDecode<{
        exp: number;
        username: string;
        fullName: string;
        sub: string;
        role: string;
        email: string;
      }>(token);
      const currentTimestamp = Math.floor(Date.now() / 1000);
      if (currentTimestamp < decoded.exp) {
        user = {
          id: decoded.sub,
          username: decoded.username,
          fullName: decoded.fullName,
          role: decoded.role,
          email: decoded.email
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
