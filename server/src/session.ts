import session from "express-session";
import connectRedis from "connect-redis";
import redis from "./redis";

const RedisStore = connectRedis(session);

export default {
  store: new RedisStore({
    client: redis as any,
  }),
  secret: process.env.SESSION_SECRET,
  name: "session",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days,
  },
} as session.SessionOptions;
