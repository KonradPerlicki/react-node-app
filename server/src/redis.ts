import Redis from "ioredis";
import logger from "./utils/logger";

const redis = new Redis({ host: "redis" });

redis.on("error", (err) => logger.error("Redis Client Error", err));

export default redis;
