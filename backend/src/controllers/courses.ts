import { Request, Response, NextFunction } from "express";
import { Course, CourseModel } from "../models/Course";
import logger from "../util/logger";
import { KafkaService, KAFKA_TOPICS } from "../services/KafkaService";
import { consent } from "../data/consent";
import { CoursePage } from "../models/CoursePage";

export class CourseController {
  constructor(private kafkaService: KafkaService) {}

  generateDefaultCourseForTesting = () => {
    const course = new Course({
      title: "Seminar Educational Technologies",
      id: "7c28b117-b30b-4c7b-9ca6-2dc6266f0434",
      startDate: "20181016",
      endDate: "20190211",
      consent: consent,
      pages: ["index"]
    });

    Course.deleteMany({}, err => {}).exec((err, res) => {
      course.save(err => {
        if (err) {
          logger.info(`Error while trying to create example course:  ${err}`);
        }
      });
    });

    const coursePage = new CoursePage({
      courseId: course.id,
      pageId: "index",
      name: "index",
      rows: {
        index: [
          {
            id: "c1_p1_r1",
            columns: [
              {
                id: "c1_p1_r1_c1",
                width: 10,
                classes: "col-lg-10 col-xs-10",
                widgetId: "srlWidget",
                widgets: [
                  {
                    type: "srlWidget",
                    queryId: "queryId3",
                    resultsFormat: "format1",
                    config: {}
                  }
                ],
                title: "SRL Widget"
              }
            ]
          }
        ]
      },
      columns: [
        {
          id: "c1_p1_r1_c2",
          width: 10,
          classes: "col-lg-10",
          widgetId: "w1",
          widgets: [
            {
              type: "srlWidget",
              queryId: "queryId3",
              resultsFormat: "format1",
              config: {}
            }
          ],
          title: "SRL Widget"
        }
      ]
    });

    CoursePage.deleteMany({}, err => {
      CoursePage.findOne(
        { courseId: coursePage.courseId, name: coursePage.name },
        (err, existing) => {
          if (!existing) {
            coursePage.save(err => {
              if (err) {
                logger.error(
                  "Error while trying to create example course page: ",
                  [err]
                );
              }
            });
          }
        }
      );
    });
  };

  getCourse = (req: Request, res: Response, next: NextFunction) => {
    return res.status(501);
  };

  postCourse = (req: Request, res: Response, next: NextFunction) => {
    Course.findOne({ id: req.params.courseId })
      .then(course => {
        if (!course) {
          const course = new Course({
            title: req.body.title,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            consent: req.body.consent
          });

          course.save(err => {
            if (err) return next(err);
            logger.debug("Saved Course: " + req.body.title);
            res.status(201).json({
              error: null,
              course: course
            });
          });
        }
      })
      .catch(next);
  };

  getAllCourses = (req: Request, res: Response, next: NextFunction) => {
    Course.find({}, function(err, courses) {
      if (!err)
        return res.json({
          courses: courses
        });
      else {
        return next(err);
      }
    });
  };

  getCoursePages = (req: Request, res: Response, next: NextFunction) => {
    Course.findOne({ id: req.params.courseId })
      .then(course => {
        if (!course) {
          return res.status(404).json({
            error: "Course for id " + req.body.id + " not found"
          });
        } else {
          return res.status(200).json(course.pages);
        }
      })
      .catch(next);
  };

  getCourseRowsForPage = (req: Request, res: Response, next: NextFunction) => {
    CoursePage.findOne({
      courseId: req.params.courseId,
      pageId: req.params.pageId
    })
      .then(page => {
        if (!page) {
          return res.status(404).json({
            error: "Course for id " + req.params.pageId + " not found"
          });
        } else {
          return res.status(200).json(page.rows[req.params.pageId]);
        }
      })
      .catch(next);
  };
}
