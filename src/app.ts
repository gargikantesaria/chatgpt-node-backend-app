import * as dotenv from "dotenv";
import * as express from "express";
import helmet from "helmet"; // Security
import { Routes } from "./routes";
import * as cors from 'cors';
import * as timeout from 'express-timeout-handler';
import { ResponseMessages } from "./config/response_messages";
import ErrorLogHandler from "./errors/handlers/errorLogHandler";
import ErrorHandler from "./errors/handlers/errorHandler";
// import fileUpload from 'express-fileupload';
const fileUpload = require('express-fileupload');

dotenv.config();

export class App {
  public options = {
    timeout: 10000000,
    onTimeout(req, res) {
      res.status(408).send({ error: ResponseMessages.common.ERR_SERVER_TIMEOUT, status: 'Error' });
    },
    disable: ['write', 'setHeaders', 'send', 'json', 'end'],
  };

  public app: express.Application;

  constructor() {

    this.app = express();
    this.app.use(cors());
    this.app.use(helmet());
    this.app.all("/*", (req, res, next) => {

      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Request-Headers", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept,Access-Control-Allow-Headers, Authorization, token, x-device-type, x-app-version, x-build-number, uuid, x-auth-token, x-l10n-locale"
      );
      res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
      if (req.method === "OPTIONS") {
        res.writeHead(200);
        res.end();
      } else {
        next();
      }

    });

    this.app.use(
      fileUpload({
        parseNested: true,
        useTempFiles: true,
        tempFileDir: '/tmp/',
      })
    );

    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(express.json());

    const routes = new Routes();
    this.app.use(timeout.handler(this.options));

    // If route match
    this.app.use("/v1", routes.path());

    // Error handling as last middlewares
    this.app.use(ErrorLogHandler);
    this.app.use(ErrorHandler);

  }
}
