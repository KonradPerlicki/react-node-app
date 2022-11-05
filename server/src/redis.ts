import Redis from "ioredis";

const redis = new Redis({ host: "redis" });

redis.on("error", (err) => console.log("Redis Client Error", err));

export default redis;
