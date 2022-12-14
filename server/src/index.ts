import express, { Request, Response } from "express";
import "reflect-metadata";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({ path: "./../.env" });
import User from "./entity/User";
import AppDataSource from "./data-source";
import sessionConfig from "./session";
import session from "express-session";
import logger from "./utils/logger";
import morgan from "morgan";

class App {
  private app = express();

  constructor() {
    this.initMiddlewares();
    this.connectDB();
  }

  private initMiddlewares(): void {
    this.app.use(cors());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(session(sessionConfig));
    this.app.use(express.json());
    this.app.use(morgan("dev"));
  }

  private async connectDB(): Promise<void> {
    let retries = 5;
    while (retries) {
      try {
        AppDataSource.initialize();

        await this.startServer();

        break;
      } catch (err) {
        retries -= 1;
        logger.error(err);
        logger.info(`retries left: ${retries}`);

        //Wait 5 seconds
        await new Promise((res) => setTimeout(res, 5000));
      }
    }
  }

  private async startServer(): Promise<void> {
    this.app.get("/", async (req: Request, res: Response) => {
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

    this.app.listen(process.env.DOCKER_NODE_PORT, async () => {
      logger.info("listening for requests on port " + process.env.DOCKER_NODE_PORT);
    });
  }
}
/* Test */
new App();
