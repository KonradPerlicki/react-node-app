import { DataSourceOptions } from "typeorm";

export default {
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  synchronize: true,
  logging: process.env.NODE_ENV === "production" ? false : true,
  database: process.env.POSTGRES_DB_NAME,
  entities: ["src/entity/*.*"],
  migrations: ["src/migrations/*.*"],
  subscribers: [],
} as DataSourceOptions;
