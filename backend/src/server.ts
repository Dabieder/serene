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
import * as dashboardController from "./controllers/dashboard";
import * as healthController from "./controllers/health";
import * as authController from "./controllers/auth";
import logger from "./util/logger";
import { KafkaService } from "./services/KafkaService";
import { CourseController } from "./controllers/courses";
import { ConsentController } from "./controllers/consent";
import { TrustStorService } from "./services/TrustStoreService";
import { NextFunction } from "express-serve-static-core";
import { QueryController } from "./controllers/queries";
import { UserLogController } from "./controllers/userLogController";
import { UserService } from "./services/UserService";
import { UserController } from "./controllers/userController";
import { SrlWidgetController } from "./controllers/widgets/srl-widget";
import { SurveyAnalyzeService } from "./services/SurveyAnalyzeService";
import { XApiController } from "./controllers/xapiStatements";
import { DatabaseService } from "./services/DatabaseService";
import { NotificationController } from "./controllers/notificationController";
import { NotificationService } from "./services/NotificationService";
import { SettingsController } from "./controllers/settingsController";
import { SettingsService } from "./services/SettingsService";
import { PushSubscriptionService } from "./services/PushSubscriptionService";
import { PushSubscriptionController } from "./controllers/subscriptionController";
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

  userController: UserController;
  consentController: ConsentController;
  courseController: CourseController;
  queryController: QueryController;
  userLogController: UserLogController;
  srlWidgetController: SrlWidgetController;
  xApiController: XApiController;
  notificationController: NotificationController;
  settingsController: SettingsController;
  pushSubscriptionController: PushSubscriptionController;

  public async start() {
    moment.locale("de");
    const app = express();

    let connected = await this.connectToDatabase();
    if (!connected) {
      logger.error("No Connection to Database possible!, Aborting");
      return false;
    }
    logger.info(`Connected to database`);

    app.set("port", constants.PORT);
    app.set("views", path.join(__dirname, "../views"));

    this.setupCors(app);
    app.set("view engine", "pug");
    app.use(bodyParser.json());
    app.use(expressValidator());

    app.use(passport.initialize());
    app.use(passport.session());
    app.use((req, res, next) => {
      res.locals.user = req.user;
      next();
    });
    await this.initServices();
    await this.initControllers();
    this.setupRoutes(app);
    // Any unhandled routes
    app.use((req: Request, res: Response, next: NextFunction) => {
      logger.warn(`Requested ${req.method} for unhandled route: ${req.url}`);
      return next();
    });
    app.listen(constants.PORT, () =>
      winston.log(
        "info",
        "--> Server successfully started at port " + constants.PORT
      )
    );
    app.use(express.static("public"));
    passportConfig.initPassportLocal();
    this.createDefaultDataForTesting();
    this.errorHandling(app);

    return true;
  }

  // TODO: REMOVE
  private createDefaultDataForTesting = () => {
    this.courseController.generateDefaultCourseForTesting();
    this.queryController.generateDefaultQueriesForTesting();
  };

  private errorHandling = (app: express.Express): void => {
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
    this.kafkaService = new KafkaService();
    this.trustStoreService = new TrustStorService();
    this.userService = new UserService();
    await this.userService.generateUsersFromFile();
    this.surveyService = new SurveyAnalyzeService(this.kafkaService);
    this.pushSubscriptionService = new PushSubscriptionService();
    this.notificationService = new NotificationService(
      this.pushSubscriptionService
    );
    this.settingsService = new SettingsService();
  }

  private async initControllers() {
    this.courseController = new CourseController(this.kafkaService);
    this.consentController = new ConsentController(
      this.kafkaService,
      this.trustStoreService,
      this.userService
    );

    this.userController = new UserController(this.userService);
    this.queryController = new QueryController();
    this.userLogController = new UserLogController();
    this.srlWidgetController = new SrlWidgetController(
      this.notificationService
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

  private setupCors(app: express.Express): void {
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
  private setupRoutes = (app: express.Express): void => {
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

    app.post(API_PREFIX + "/auth/signup", authController.postSignup);
    app.post(API_PREFIX + "/auth/signin", authController.postSignIn);
    app.get(API_PREFIX + "/auth/casvalidate", authController.getCasValidate);
    app.get(
      API_PREFIX + "/dashboard/pages/:courseId",
      jwtAuthOptional,
      dashboardController.getDashboardPage
    );

    app.get(
      API_PREFIX + "/courses/:courseId/consent",
      jwtAuthOptional,
      this.consentController.getCourseConsent
    );
    app.post(
      API_PREFIX + "/courses/:courseId/consent",
      jwtAuthRequired,
      this.consentController.postCourseConsent
    );
    app.post(
      API_PREFIX + "/courses",
      jwtAuthRequired,
      this.courseController.postCourse
    );
    app.get(
      API_PREFIX + "/courses",
      jwtAuthOptional,
      this.courseController.getAllCourses
    );
    app.get(
      API_PREFIX + "/courses/:courseId/pages",
      jwtAuthOptional,
      this.courseController.getCoursePages
    );
    app.get(
      API_PREFIX + "/courses/:courseId/pages/:pageId/rows",
      jwtAuthOptional,
      this.courseController.getCourseRowsForPage
    );
    app.get(
      API_PREFIX + "/courses/:courseId/pages/:pageId/rows/:columnId/co",
      jwtAuthOptional,
      this.courseController.getCourseRowsForPage
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

    app.get(
      API_PREFIX + "/queries/:queryId",
      jwtAuthOptional,
      this.queryController.getQueryById
    );

    app.post(
      API_PREFIX + "/logs",
      jwtAuthRequired,
      this.userLogController.submitLogs
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
