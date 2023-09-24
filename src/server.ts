import bodyParser from "body-parser";
import compression from "compression";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import MainRouter from "./routes";
import AuthRouter from "./routes/auth";
import OrderRouter from "./routes/order";
import ExternalRouter from "./routes/external";
import AuthMiddleware from "./middleware/auth.middleware";
import { CronJob } from "./cronjob/cronjob";

export default class Server {
  expressInstance: express.Express;

  constructor() {
    this.expressInstance = express();
    this.middlewareSetup();
    this.routesSetup();
    new CronJob();
  }

  private middlewareSetup() {
    // Setup common security protection (Helmet should come first)
    this.expressInstance.use(helmet());

    // Setup Cross Origin access (CORS can be configured as needed)
    this.expressInstance.use(cors());

    // Setup requests format parsing (BodyParser should come before other routes)
    this.expressInstance.use(bodyParser.urlencoded({ extended: true }));
    this.expressInstance.use(bodyParser.json());

    // Setup requests gZip compression (Should be the last middleware)
    this.expressInstance.use(compression());
    this.expressInstance.use(new AuthMiddleware().checkAuth);
  }

  private routesSetup() {
    // Instantiate mainRouter object
    let router = new MainRouter().router;
    let authRouter = new AuthRouter().router;
    let orderRouter = new OrderRouter().router;
    let externalRoute = new ExternalRouter().router;

    // Add to server routes
    this.expressInstance.use("/", router);
    this.expressInstance.use("/auth", authRouter);
    this.expressInstance.use("/order", orderRouter);
    this.expressInstance.use("/external", externalRoute);
  }
}
