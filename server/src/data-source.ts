import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  synchronize: process.env.NODE_ENV === "production" ? false : true,
  logging: process.env.NODE_ENV === "production" ? false : true,
  database: process.env.POSTGRES_DB_NAME,
  entities: ["src/entity/*.*"],
  migrations: ["src/migrations/*.*"],
  subscribers: [],
  migrationsTableName: "migrations",
});

export default AppDataSource;
