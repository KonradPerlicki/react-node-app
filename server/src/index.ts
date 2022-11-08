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
import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageProductionDefault,
} from "apollo-server-core";
import { buildSchema } from "type-graphql";

class App {
  private app = express();
  private server: ApolloServer;
  private graphqlResolversPath = __dirname + "/graphql/resolvers/**/*.ts";

  constructor() {
    this.initMiddlewares();
    this.initApolloServer();
    this.connectDB();
    this.startServer();
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
        if (!AppDataSource.isInitialized) AppDataSource.initialize();

        break;
      } catch (err) {
        retries -= 1;
        logger.error(err);
        logger.info(`retries left: ${retries}`);

        //Wait 1 second
        await new Promise((res) => setTimeout(res, 1000));
      }
    }
  }

  private async initApolloServer(): Promise<void> {
    const schema = await buildSchema({
      resolvers: [this.graphqlResolversPath],
    });

    this.server = new ApolloServer({
      schema,
      plugins: [
        process.env.NODE_ENV === "production"
          ? ApolloServerPluginLandingPageProductionDefault
          : ApolloServerPluginLandingPageGraphQLPlayground,
      ],
      context: ({ req, res }) => ({ req, res }),
    });

    await this.server.start();

    this.server.applyMiddleware({ app: this.app });
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
