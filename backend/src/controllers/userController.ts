import { Request, Response, NextFunction } from "express";
import logger from "../util/logger";
import { UserService } from "../services/UserService";
import { ExperimentService } from "../services/ExperimentService";
import { Role } from "../models/User";

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

  getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    const requestingUser = await this.userService.getUser(req.payload.sub);

    if (requestingUser.role !== Role.Administrator) {
      logger.info(
        `User ${req.payload.sub} without privileges tried to access all users`
      );
      return res.status(403).json({
        error: "Not allowed to get all users"
      });
    }
    const users = await this.userService.getAllUsers();

    if (users) {
      res.status(200).json({
        data: users.map(u => u.toUserInfo())
      });
    } else {
      res.status(401).json({
        error: "Users not found"
      });
    }
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
          data: user.toAuthJSON()
        });
      }
    } else {
      return res.status(403).json({
        error: "No valid auth token found",
        data: null
      });
    }
  };
}
