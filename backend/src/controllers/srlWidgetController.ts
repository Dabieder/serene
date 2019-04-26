import { Request, Response, NextFunction } from "express";
import logger from "../util/logger";
import {
  SrlWidgetModel,
  SrlWidget,
  generateNewPlanForId
} from "../models/SRL/SrlWidget";
import { NotificationService } from "../services/NotificationService";
import { LogService } from "../services/LogService";

export class SrlWidgetController {
  constructor(
    private notificationService: NotificationService,
    private userLogService: LogService
  ) {}

  /**
   * Method to build the response for the frontend in one response
   */
  private toReturnData = (widget: SrlWidgetModel) => {
    return {
      reasons: widget.reasons,
      metaSettings: widget.metaSettings,
      learningPlans: widget.learningPlans ? widget.learningPlans : [],
      monitorings: widget.monitorings ? widget.monitorings : []
    };
  };

  getWidgetData = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.payload) {
      return res.status(403).json({
        error: "No valid auth token found",
        user: null
      });
    }
    logger.debug(`Request Widget Data For: ${req.payload.sub}`);

    let widgetSettings = await this.retrieveWidgetData(req, res, next);

    if (!widgetSettings) {
      logger.verbose("Creating new empty weekly plan for user that had none");
      const newPlan = generateNewPlanForId(req.payload.sub);
      widgetSettings = await this.saveWidgetData(newPlan, req, res, next);
    }

    const returnData = this.toReturnData(<SrlWidgetModel>widgetSettings);
    return res.status(202).json(returnData);
  };

  postLearningPlans = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    logger.verbose(`Post Learning Plans for user id: ${req.payload.sub}`);

    let userWidgetData = await this.retrieveWidgetData(req, res, next);

    userWidgetData = userWidgetData as SrlWidgetModel;

    for (const plan of req.body) {
      const index = userWidgetData.learningPlans.findIndex(
        x => x.id === plan.id
      );
      if (index >= 0) {
        userWidgetData.learningPlans[index] = plan;
      } else {
        userWidgetData.learningPlans.push(plan);
      }
      await this.notificationService.handlePlanReminder(plan, req.payload.sub);
    }

    userWidgetData.markModified("learningPlans");
    await this.saveWidgetData(userWidgetData, req, res, next);

    res.status(200).json({
      message: "Updated Learning Plans successfully",
      errror: null
    });

    for (const plan of req.body) {
      await this.userLogService.addEditLog(plan, req.payload.sub);
    }
  };

  deletePlan = async (req: Request, res: Response, next: NextFunction) => {
    logger.verbose(
      `Trying to delete Learning Plan ${req.params.planId} for user id: ${
        req.payload.sub
      }`
    );

    let userWidgetData = await this.retrieveWidgetData(req, res, next);
    const index = userWidgetData.learningPlans.findIndex(
      x => x.id === req.params.planId
    );
    if (index >= 0) {
      const removedPlans = userWidgetData.learningPlans.splice(index, 1);
      userWidgetData.markModified("learningPlans");
      const saved = await this.saveWidgetData(userWidgetData, req, res, next);

      res.status(200).json({
        message: `Deleted learning plan with ${req.params.planId}`,
        errror: null
      });

      logger.info(
        `Deleted Learning Plan ${req.params.planId} for user ${req.payload.sub}`
      );

      for (const removedPlan of removedPlans) {
        await this.notificationService.deleteRemindersForPlan(removedPlan);
        await this.userLogService.addDeletionLog(removedPlan, req.payload.sub);
      }
    } else {
      logger.error(
        `Plan ${req.params.planId} not found and could therefore not be deleted`
      );
      return res.status(404).json({
        message: "Resource to delete not found",
        errror: "Resource to delete not found"
      });
    }
  };

  postMonitorings = async (req: Request, res: Response, next: NextFunction) => {
    logger.verbose(`Post Monitoring for user id: ${req.payload.sub}`);

    let userWidgetData = await this.retrieveWidgetData(req, res, next);

    userWidgetData = userWidgetData as SrlWidgetModel;
    userWidgetData.monitorings = userWidgetData.monitorings.concat(req.body);

    for (const monitoring of req.body) {
      for (const plan of monitoring.plans) {
        const index = userWidgetData.learningPlans.findIndex(
          x => x.id === plan.id
        );
        if (index >= 0) {
          userWidgetData.learningPlans[index] = plan;
        } else {
          userWidgetData.learningPlans.push(plan);
        }
        if (plan.progress >= 100) {
          await this.notificationService.deleteRemindersForPlan(plan);
        }
      }
    }

    userWidgetData.markModified("learningPlans");
    userWidgetData.markModified("monitorings");
    const savedData = await this.saveWidgetData(userWidgetData, req, res, next);

    logger.verbose(`Updated the monitorings for user ${req.payload.sub} `);

    return res.status(200).json({
      message: "Updated Monitorings successfully",
      errror: null
    });
  };

  retrieveWidgetData = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    let userWidgetData = await SrlWidget.findOne({
      accountName: req.payload.sub
    })
      .exec()
      .catch(err => {
        const msg = `Error retrieving widget data for user: ${req.payload.sub}`;
        logger.error(msg);
        res.status(500).json({
          error: msg
        });
        return next(err);
      });
    userWidgetData = userWidgetData as SrlWidgetModel;
    return userWidgetData;
  };

  saveWidgetData = async (
    widgetData: SrlWidgetModel,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    let savedData = await widgetData.save().catch(err => {
      const msg = `Error saving widget data for user: ${req.payload.sub}`;
      logger.error(msg);
      res.status(500).json({
        error: msg
      });
      return next(err);
    });

    savedData = savedData as SrlWidgetModel;
    return savedData;
  };
}
