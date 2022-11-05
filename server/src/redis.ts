import { createClient } from "redis";

const client = createClient({
  url: "redis://redis:6379",
});

client.on("error", (err) => console.log("Redis Client Error", err));

export default client;
