import Redis from "ioredis";

export const redis = new Redis(
  (process.env.NODE_ENV === "production"
    ? process.env.REDIS_PROD_URL
    : process.env.REDIS_DEV_URL) || "redis://localhost:500"
);
