import express, { Request, Response } from "express";
import "reflect-metadata";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({ path: "./../.env" });
import User from "./entity/User";
import AppDataSource from "./data-source";

const app = express();

/* Test */
app.use(cors());
app.get("/", async (req: Request, res: Response) => {
  await User.create({
    firstName: "test",
    lastName: "test",
    password: "test",
    email: "test2",
  }).save();
  res.json([
    {
      id: "1",
      title: "Bookasdax sRsevisewasd: The Bear & The Nightingale",
    },
    {
      id: "2",
      title: "Gaxmxaxxxxaea Resviews: Pokemon Brillian Diamond",
    },
    {
      id: process.env.DOCKER_NODE_PORT || 5000,
      title: "Showsdbbbbaaasaaa Review: Alice in Borderland",
    },
  ]);
});

app.listen(process.env.DOCKER_NODE_PORT, async () => {
  let retries = 5;
  while (retries) {
    try {
      AppDataSource.initialize();
      break;
    } catch (err) {
      retries -= 1;
      console.log(err);
      console.log(`retries left: ${retries}`);

      //Wait 5 seconds
      await new Promise((res) => setTimeout(res, 5000));
    }
  }

  console.log("listening for requests on port " + process.env.DOCKER_NODE_PORT);
});
