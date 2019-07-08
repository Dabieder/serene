import { Request, Response, NextFunction } from "express";
import logger from "../util/logger";
import { Tag } from "../models/Tag";

export class TagController {
  constructor() {}

  postTag = async (req: Request, res: Response, next: NextFunction) => {
    logger.info(`Creating New Tag for ${req.payload.sub}`);

    try {
      const tag = await Tag.findOne({
        id: req.body.id
      }).exec();

      if (tag) {
        tag.name = req.body.name;
        await tag.save();
      } else {
        const newTag = new Tag();
        newTag.id = req.body.id;
        newTag.name = req.body.name;
        newTag.save();
      }

      res.status(200).json({
        error: null
      });
    } catch (error) {
      logger.error("Error trying to post tag", error);

      res.status(500).json({
        error: "Could not create tag"
      });
    }
  };

  deleteTag = async (req: Request, res: Response, next: NextFunction) => {
    logger.info(`Deleting Tag ${req.body.name} for ${req.payload.sub}`);

    try {
      await Tag.deleteOne({
        id: req.body.id
      }).exec();

      res.status(200).json({
        error: null
      });
    } catch (error) {
      logger.error("Error trying to delete tag", error);

      res.status(500).json({
        error: "Could not delete tag"
      });
    }
  };
}
