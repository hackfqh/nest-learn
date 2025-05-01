import "reflect-metadata";
import { DataSource } from "typeorm";
import { Article } from "./entity/Article";
import { Tag } from "./entity/Tag";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "root",
  database: "typeorm_test",
  synchronize: true,
  logging: true,
  entities: [Article, Tag],
  connectorPackage: "mysql2",
  migrations: [],
  subscribers: [],
});
