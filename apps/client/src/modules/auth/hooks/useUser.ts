import jwtDecode from "jwt-decode";

import { storage } from "@proghours/data-access";

import { JwtPayload, User } from "../types";

export function useUser() {
  const token = storage.getToken();
  let user: User | null = null;
  if (token) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
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
