export type User = {
  email: string;
  username: string;
  fullName: string;
  id: string;
  role: string;
};

export type JwtPayload = {
  exp: number;
  username: string;
  fullName: string;
  sub: string;
  role: string;
  email: string;
};
