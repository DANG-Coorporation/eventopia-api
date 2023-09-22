import sequelize, { Sequelize } from "sequelize";
import dotenv from "dotenv";
import configConstants from "./constants";
import path from "path";
dotenv.config();

const sequelizeConfig = path.resolve(__dirname, "./config.js");
const env = process.env.NODE_ENV || "development";
const config = require(sequelizeConfig)[env];
export default class Database {
  db: string;
  user: string;
  password: string;
  host: string;
  port: number;
  maxPool: number;
  minPool: number;
  database: sequelize.Sequelize;

  constructor() {
    this.db = config.database;
    this.user = config.username;
    this.password = config.password;
    this.host = config.host;
    this.port = config.port;
    this.maxPool = configConstants.DB_MAX_POOL;
    this.minPool = configConstants.DB_MIN_POOL;
    this.database = new Sequelize(this.db, this.user, this.password, {
      host: this.host,
      dialect: "mysql",
      port: this.port,
      logging: false,
      operatorsAliases: {
        $and: sequelize.Op.and,
        $or: sequelize.Op.or,
        $eq: sequelize.Op.eq,
        $gt: sequelize.Op.gt,
        $lt: sequelize.Op.lt,
        $lte: sequelize.Op.lte,
        $like: sequelize.Op.like,
      },
      pool: {
        max: this.maxPool,
        min: this.minPool,
        acquire: 30000,
        idle: 10000,
      },
    });

    this.database
      .authenticate()
      .then(() => {
        console.log("Connection database has been established successfully.");
      })
      .catch((err) => {
        console.error("Unable to connect to the database:", err);
      });

    this.database.sync({
      alter: false,
      force: false,
      // Using 'force' will drop any table defined in the models and create them again.
      // force: true
    });
  }
}
