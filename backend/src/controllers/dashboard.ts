import { Request, Response, NextFunction } from "express";
import { coursePages } from "../data/course_pages";
import { widgets } from "../data/widgets";

export let getDashboardPage = (req: Request, res: Response) => {
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(coursePages[req.params.courseId], null, 3));
};

export let getWidget = (req: Request, res: Response) => {
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(widgets[req.params.widget], null, 3));
};
