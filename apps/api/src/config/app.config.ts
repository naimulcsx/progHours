export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  environment: process.env.NODE_ENV || "development",
  timezone: process.env.TZ || "Asia/Dhaka",
  jwtSecret: process.env.JWT_SECRET
});
