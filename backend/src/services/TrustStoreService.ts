import { Request, Response, NextFunction } from "express";
import axios from "axios";
import * as constants from "../util/constants";
import { parseTokenFromRequest } from "../services/AuthService";
import logger from "../util/logger";

export class TrustStorService {
  postToTrustStore = async (
    req: Request,
    res: Response,
    next: NextFunction,
    settings: any
  ): Promise<any> => {
    const token = parseTokenFromRequest(req);

    const config = {
      headers: {
        Authorization: "Bearer " + token
      }
    };
    const url = `${
      constants.INFRASTRUCTURE_URL
    }/ts-backend/resources/privacysettings`;

    logger.debug(`Submitting to trust store at URL: ${url}`);
    return await axios.post(url, settings, config);
  };
}
