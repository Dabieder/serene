require("dotenv").config({ path: ".env" });
import express from "express";
import winston from "winston";
import { Request, Response } from "express";
import path = require("path");
import expressValidator = require("express-validator");
import passport from "passport";
import bodyParser from "body-parser";
import { jwtAuthRequired, jwtAuthOptional } from "./services/AuthService";
import * as constants from "./util/constants";

import moment from "moment";

// API keys and Passport configuration
import * as passportConfig from "./config/passport";
import * as healthController from "./controllers/healthController";
import * as authController from "./controllers/authController";
import logger from "./util/logger";
import { KafkaService } from "./services/KafkaService";
import { ConsentController } from "./controllers/consentController";
import { TrustStorService } from "./services/TrustStoreService";
import { NextFunction } from "express-serve-static-core";
import { UserLogController } from "./controllers/userLogController";
import { UserService } from "./services/UserService";
import { UserController } from "./controllers/userController";
import { SrlWidgetController } from "./controllers/srlWidgetController";
import { SurveyAnalyzeService } from "./services/SurveyAnalyzeService";
import { XApiController } from "./controllers/xapiStatements";
import { DatabaseService } from "./services/DatabaseService";
import { NotificationController } from "./controllers/notificationController";
import { NotificationService } from "./services/NotificationService";
import { SettingsController } from "./controllers/settingsController";
import { SettingsService } from "./services/SettingsService";
import { PushSubscriptionService } from "./services/PushSubscriptionService";
import { PushSubscriptionController } from "./controllers/subscriptionController";
import { UserLogService } from "./services/UserLogService";
import { ExperimentService } from "./services/ExperimentService";
import { EventService } from "./services/EventService";
import { thisExpression } from "babel-types";
import { AuthController } from "./controllers/authController";
/**
 * Basic configurations of all middleware libraries are applied here.
 */
export class Server {
  kafkaService: KafkaService;
  trustStoreService: TrustStorService;
  userService: UserService;
  surveyService: SurveyAnalyzeService;
  databaseService: DatabaseService;
  notificationService: NotificationService;
  settingsService: SettingsService;
  pushSubscriptionService: PushSubscriptionService;
  userLogService: UserLogService;
  experimentService: ExperimentService;
  eventService: EventService;

  userController: UserController;
  consentController: ConsentController;
  userLogController: UserLogController;
  srlWidgetController: SrlWidgetController;
  xApiController: XApiController;
  notificationController: NotificationController;
  settingsController: SettingsController;
  pushSubscriptionController: PushSubscriptionController;
  authController: AuthController;

  app: express.Application;

  public async start() {
    moment.locale("de");
    this.app = express();

    let connected = await this.connectToDatabase();
    if (!connected) {
      logger.error("No Connection to Database possible!, Aborting");
      return false;
    }
    logger.info(`Connected to database`);

    this.app.set("port", constants.PORT);
    this.app.set("views", path.join(__dirname, "../views"));

    this.setupCors(this.app);
    this.app.set("view engine", "pug");
    this.app.use(bodyParser.json());
    this.app.use(expressValidator());

    this.app.use(passport.initialize());
    this.app.use(passport.session());
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.locals.user = req.user;
      next();
    });
    await this.initServices();
    await this.initControllers();
    this.setupRoutes(this.app);
    // Any unhandled routes
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      logger.warn(`Requested ${req.method} for unhandled route: ${req.url}`);
      return next();
    });
    this.app.listen(constants.PORT, () =>
      winston.log(
        "info",
        "--> Server successfully started at port " + constants.PORT
      )
    );
    this.app.use(express.static("public"));
    passportConfig.initPassportLocal();
    this.errorHandling(this.app);

    const http = require("http").Server(this.app);
    const io = require("socket.io")(http);
    io.on("connection", (s: any) => {
      console.log("User Connected Socket: ", s);
    });

    return true;
  }

  private errorHandling = (app: express.Application): void => {
    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      if (err) {
        if (err.name === "UnauthorizedError") {
          logger.error("Error: ", err);
          return res.status(403).json({
            error: "No Token Provided"
          });
        }
      }
      logger.error("Unhandled Error: ", err.message);
      logger.error("Error: ", [err]);
      res.status(500);
      return next(err);
    });
  };

  private async initServices() {
    this.eventService = new EventService();
    this.experimentService = new ExperimentService(this.eventService);
    await this.experimentService.initialize();
    this.userService = new UserService(this.eventService);
    await this.userService.generateUsersFromFile();
    this.pushSubscriptionService = new PushSubscriptionService();
    this.notificationService = new NotificationService(
      this.pushSubscriptionService
    );
    await this.notificationService.initialie();
    this.settingsService = new SettingsService();
    this.userLogService = new UserLogService();
  }

  private async initControllers() {
    this.consentController = new ConsentController();

    this.userController = new UserController(this.userService);
    this.authController = new AuthController(this.eventService);
    this.userLogController = new UserLogController(this.userLogService);
    this.srlWidgetController = new SrlWidgetController(
      this.notificationService,
      this.userLogService
    );
    this.xApiController = new XApiController();
    this.notificationController = new NotificationController(
      this.notificationService,
      this.pushSubscriptionService
    );
    this.settingsController = new SettingsController(this.settingsService);
    this.pushSubscriptionController = new PushSubscriptionController(
      this.pushSubscriptionService
    );
  }

  private async connectToDatabase() {
    if (!this.databaseService) {
      this.databaseService = new DatabaseService();
    }
    // Try to reconnect to database every few seconds
    const retryDelay = 10000;

    let connected = await this.databaseService.connect();
    const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
    while (!connected) {
      await delay(retryDelay);
      logger.info("Retrying to connect to database after unsuccessful attempt");
      connected = await this.databaseService.connect();
    }

    return connected;
  }

  private setupCors(app: express.Application): void {
    // Set headers for CORS requests
    // TODO: Adjust these settings to your security concerns!
    app.use((req: Request, res: Response, next: any) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
      );
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With,content-type, Content-Type, Accept, Authorization"
      );
      next();
    });

    app.options("/*", function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
      );
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With,content-type, Content-Type, Accept, Authorization"
      );
      res.sendStatus(200);
    });
  }

  /**
   * Setup all endpoints of your API. You can extend this method or if there are many different routes,
   * it might be better to move this to a separate class.
   */
  private setupRoutes = (app: express.Application): void => {
    const API_PREFIX = process.env["API_PREFIX"] || "";

    app.get("/", (req: Request, res: Response) => {
      res.status(200).send("Server running ...");
    });
    // USER
    app.get(API_PREFIX + "/user", jwtAuthRequired, this.userController.getUser);
    app.get(
      API_PREFIX + "/settings",
      jwtAuthRequired,
      this.settingsController.getAllSettings
    );
    app.post(
      API_PREFIX + "/settings",
      jwtAuthRequired,
      this.settingsController.postSettings
    );

    app.get(
      API_PREFIX + "/settings/consent",
      jwtAuthRequired,
      this.settingsController.getConsentSettings
    );

    app.post(API_PREFIX + "/auth/signup", authController.postSignup);
    app.post(API_PREFIX + "/auth/signin", this.authController.postSignIn);
    app.get(
      API_PREFIX + "/auth/casvalidate",
      this.authController.getCasValidate
    );

    app.get(API_PREFIX + "/health", healthController.getHealth);

    app.get(
      API_PREFIX + "/widgets/srlwidget",
      jwtAuthOptional,
      this.srlWidgetController.getWidgetData
    );

    app.post(
      API_PREFIX + "/widgets/srlwidget/learningplans",
      jwtAuthRequired,
      this.srlWidgetController.postLearningPlans
    );
    app.delete(
      API_PREFIX + "/widgets/srlwidget/learningplans/:planId",
      jwtAuthRequired,
      this.srlWidgetController.deletePlan
    );
    app.post(
      API_PREFIX + `/widgets/srlwidget/monitorings`,
      jwtAuthRequired,
      this.srlWidgetController.postMonitorings
    );

    app.post(
      API_PREFIX + "/logs",
      jwtAuthRequired,
      this.userLogController.submitLogs
    );

    app.post(
      API_PREFIX + "/logs/sw",
      this.userLogController.submitServiceWorkerLogs
    );

    app.post(
      API_PREFIX + "/statements",
      jwtAuthRequired,
      this.xApiController.postStatement
    );

    app.post(
      API_PREFIX + "/notifications/register",
      jwtAuthOptional,
      this.pushSubscriptionController.postPushRegistration
    );

    app.post(
      API_PREFIX + "/notifications/send",
      this.notificationController.sendAllRegisteredNotifications
    );
  };
}

const server = new Server();
const started = server.start();

process.on("uncaughtException", function(err) {
  logger.error("UNCAUGHT EXCEPTION: ", [err]);
});
