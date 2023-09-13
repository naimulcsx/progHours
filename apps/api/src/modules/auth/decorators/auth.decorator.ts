import { SetMetadata } from "@nestjs/common";

import { AUTH_TYPE_KEY } from "../constants/auth.constants";

export { AUTH_TYPE_KEY };

export enum AuthType {
  Bearer,
  None
}

export const Auth = (authType: AuthType) => {
  return SetMetadata(AUTH_TYPE_KEY, authType);
};
