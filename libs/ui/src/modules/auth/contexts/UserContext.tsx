/**
 * Context for storing the current logged in user
 */
import { Role } from "@prisma/client";

import { createContext, useContext } from "react";

export type JwtPayload = {
  sub: number;
  username: string;
  fullName: string;
  email: string;
  role: Role;
  iat: number;
  exp: number;
};

export const UserContext = createContext<{ user?: JwtPayload } | undefined>(
  undefined
);

export function UserProvider({
  user,
  children
}: React.PropsWithChildren<{ user?: JwtPayload }>) {
  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser() must be used inside a UserProvider Context");
  }
  return context;
}
