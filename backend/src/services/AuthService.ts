/*
 *
 *  * Copyright 2018 Educational Technologies - DIPF | Leibniz Institute for Research and Information in Education (ciordas@dipf.de).
 *  *
 *  * Licensed under the GNU Lesser General Public License, Version 3.0 (the "License");
 *  * you may not use this file except in compliance with the License.
 *  * You may obtain a copy of the License at
 *  *
 *  *      https://www.gnu.org/licenses/lgpl-3.0.en.html
 *  *
 *  * Unless required by applicable law or agreed to in writing, software
 *  * distributed under the License is distributed on an "AS IS" BASIS,
 *  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  * See the License for the specific language governing permissions and
 *  * limitations under the License.
 *
 */
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
