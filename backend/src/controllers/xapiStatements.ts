import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { XApiStatement } from "../models/XApiStatement";
import logger from "../util/logger";
import { parseTokenFromRequest } from "../services/AuthService";
import { INFRASTRUCTURE_URL } from "../util/constants";
import axios from "axios";

export class XApiController {
  postStatement = async (req: Request, res: Response, next: NextFunction) => {
    const sanitizedJsonString = JSON.stringify(req.body).replace(/\./, "&#46;");

    const statement = new XApiStatement({
      statement: JSON.parse(sanitizedJsonString)
    });

    await statement.save().catch(err => {
      logger.error("Error saving xAPI Statement");
      res.status(500).json({
        error: "Error trying to save xAPI Statements on the server"
      });
      return next(err);
    });
    logger.verbose("Stored xAPI statement");

    const token = parseTokenFromRequest(req);
    const config = {
      headers: {
        Authorization: "Bearer " + token
      }
    };
    const url = `${INFRASTRUCTURE_URL}/lrs-backend/resources/users/xapi/statements`;
    await axios.post(url, req.body, config).catch(err => {
      logger.error("Error forwarding the xAPI Statement to the infrastructure");
    });

    return res.json({
      error: null
    });
  };
}
