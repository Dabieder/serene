import passport from "passport";
import passportLocal from "passport-local";
import { User } from "../models/User";
import { Request, Response, NextFunction } from "express";
import logger from "../util/logger";

export let initPassportLocal = () => {
  const LocalStrategy = passportLocal.Strategy;

  passport.serializeUser<any, any>((user, done) => {
    done(undefined, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  logger.debug("Passport local strategy: ", LocalStrategy);

  /**
   * Sign in using Email and Password.
   */
  passport.use(
    new LocalStrategy({ usernameField: "accountName" }, (accountName, password, done) => {
      User.findOne({ accountName: accountName.toLowerCase() }, (err, user: any) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(undefined, false, {
            message: `Account name ${accountName} not found.`
          });
        }
        let pwMatch = user.comparePassword(password);
        if (pwMatch) {
          return done(undefined, user);
        } else {
          return done(undefined, false, {
            message: "Invalid email or password."
          });
        }
      });
    })
  );
};

export let isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/user/login");
};
