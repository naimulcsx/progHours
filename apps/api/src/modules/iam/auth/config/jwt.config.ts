import { registerAs } from "@nestjs/config";

export default registerAs("jwt", () => {
  // TODO: add token audience and issuer
  return {
    secret: process.env.JWT_SECRET,
    accessTokenTtl: parseInt(process.env.JWT_ACCESS_TOKEN_TTL ?? "604800", 10)
  };
});
