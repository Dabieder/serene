import { Request, Response, NextFunction } from "express";
import * as querystring from "querystring";
import * as xml2js from "xml2js";
import logger from "../util/logger";
import passport from "passport";
import { User, UserModel, getHashAndSalt } from "../models/User";
import { IVerifyOptions } from "passport-local";
import requestPromise from "request-promise";
import xmldoc from "xmldoc";
import { EventService } from "../services/EventService";
import { EventUserCreate } from "../util/Events";
const request = require("request");

export class AuthController {
  constructor(private eventService: EventService) {}

  getCasValidate = async (
    req: Request,
    response: Response,
    next: NextFunction
  ) => {
    const casValidateUrl =
      "https://ssl.studiumdigitale.uni-frankfurt.de/cas/serviceValidate?";
    const casurl = req.query.service;
    const ticket = req.query.ticket;

    const queryParams = querystring.stringify({
      ticket: ticket,
      service: casurl
    });
    const validationurl = casValidateUrl + queryParams;

    logger.debug("Attempting to login via CAS");

    request(validationurl, {}, (err: any, res: any, body: any) => {
      if (err) {
        logger.error("Error Validating Cas: ", [err]);
        return next(err);
      }

      xml2js.parseString(body, (err: any, parsedXml: any) => {
        if (err) return next(err);

        if (parsedXml) {
          try {
            const accountName = this.getAccountNameFromCasXML(parsedXml);

            const user = new User({
              accountName: accountName
            });

            User.findOne(
              { accountName: accountName },
              (err: any, existingUser) => {
                if (err) {
                  logger.error(`Error trying to retrieve existing user:`, err);
                  return next(err);
                }
                if (existingUser) {
                  response.json({
                    data: existingUser.toAuthJSON()
                  });
                } else {
                  user.save((err, createdUser) => {
                    if (err) {
                      logger.error(`Error trying to create new user:`, err);
                      return next(err);
                    }
                    logger.debug("Created user: " + accountName);
                    response.json({
                      data: createdUser.toAuthJSON()
                    });
                    this.eventService.GlobalEventEmitter.emit(
                      EventUserCreate,
                      createdUser
                    );
                  });
                }
              }
            );
          } catch (e) {
            logger.error("Error while trying to parse CAS XML: ", e);
          }
        }
      });
    });
  };

  getAccountNameFromCasXML = (xml: any) => {
    return xml["cas:serviceResponse"]["cas:authenticationSuccess"][0][
      "cas:user"
    ][0];
  };

  postSignIn = (req: Request, res: Response, next: NextFunction) => {
    req.assert("password", "Password cannot be blank").notEmpty();

    const errors = req.validationErrors();
    if (errors) {
      logger.error("Validation Errors", errors);
      return res.redirect("/users/login");
    }

    logger.debug("Received login request");

    passport.authenticate(
      "local",
      (err: Error, user: UserModel, info: IVerifyOptions) => {
        if (err) {
          logger.error("Login Error: ", err);
          return next(err);
        }
        if (!user) {
          logger.debug("No User Found: ", info.message);
          return res.status(404).json({
            user: null,
            error: "User Not Found"
          });
        }
        req.logIn(user, err => {
          if (err) {
            return next(err);
          }
          return res.json({ data: user.toAuthJSON() });
        });
      }
    )(req, res, next);
  };
}

export let getCasLogout = (
  req: Request,
  response: Response,
  next: NextFunction
) => {
  return response.status(501);
};

/**
 * Create new account
 */
export let postSignup = (req: Request, res: Response, next: NextFunction) => {
  req.assert("email", "Email is not valid").isEmail();
  req
    .assert("password", "Password must be at least 4 characters long")
    .len({ min: 4 });
  req.sanitize("email").normalizeEmail({ gmail_remove_dots: false });

  const errors = req.validationErrors();
  if (errors) {
    logger.error("Validation Errors: " + errors);
  }

  const hashSalt = getHashAndSalt(req.body.password);
  const user = new User({
    email: req.body.email,
    accountName: req.body.username,
    password: hashSalt.hash,
    salt: hashSalt.salt
  });

  User.findOne({ email: req.body.email }, (err, existingUser) => {
    if (err) {
      return next(err);
    }
    if (existingUser) {
      return res.json({
        error: "User Already Exists"
      });
    }

    user.save(err => {
      if (err) {
        return next(err);
      }
      logger.debug("User saved: " + req.body.email);
      res.json({
        error: null,
        data: user.toAuthJSON()
      });
    });
  });
};
