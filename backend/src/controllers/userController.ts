import { Request, Response, NextFunction } from "express";
import logger from "../util/logger";
import { UserService } from "../services/UserService";
import { ExperimentService } from "../services/ExperimentService";

export class UserController {
  constructor(private userService: UserService) {}

  generateDefaultUsersForTesting = async () => {
    await this.userService
      .deleteUser("a")
      .catch(err => logger.error("Error trying to delete test user 'a'"));
    await this.userService
      .createUser("a", "a")
      .catch(err => logger.error("Error trying to create test user 'a'"));
  };

  getUser = async (req: Request, res: Response, next: NextFunction) => {
    if (req.payload) {
      logger.info(
        `Retrieving authenticated user for token : ${req.payload.sub}`
      );
      const user = await this.userService
        .getUser(req.payload.sub)
        .catch(err => next(err));
      if (!user) {
        return res.status(401).json({
          error: "User not found in database"
        });
      } else {
        return res.status(200).json({
          error: null,
          user: user.toAuthJSON()
        });
      }
    } else {
      return res.status(403).json({
        error: "No valid auth token found",
        user: null
      });
    }
  };
}
