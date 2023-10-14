import { registerAs } from "@nestjs/config";

export default registerAs("codechef", () => {
  return {
    clientId: process.env.CODECHEF_CLIENT_ID,
    secret: process.env.CODECHEF_SECRET
  };
});
