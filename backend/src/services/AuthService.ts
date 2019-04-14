import * as express from "express";
import logger from "../util/logger";
import expressJwt = require("express-jwt");
import { JWT_SECRET } from "../util/secrets";

export const parseTokenFromRequest = (
  req: express.Request
): string | undefined => {
  const auth = req.header("authorization");
  if (
    (auth && auth.split(" ")[0] === "Bearer") ||
    (auth && auth.split(" ")[0] === "Token")
  ) {
    return auth.split(" ")[1];
  }

  logger.info(`No Token provided by the client for route ${req.route}`);
  return null;
};

export const jwtAuthRequired = expressJwt({
  secret: JWT_SECRET,
  userProperty: "payload",
  getToken: parseTokenFromRequest
});

export const jwtAuthOptional = expressJwt({
  secret: JWT_SECRET,
  userProperty: "payload",
  getToken: parseTokenFromRequest,
  credentialsRequired: false
});
