import { Query } from "../models/Query";
import { NextFunction, Request, Response } from "express";

export class QueryController {
  constructor() {}

  generateDefaultQueriesForTesting = () => {
    const query1 = new Query({
      id: "queryId3",
      metadata: {
        xAxis: "Country",
        yAxis: "Population"
      },
      data: [
        {
          name: "Netherlands",
          value: 52
        },
        {
          name: "France",
          value: 72
        }
      ]
    });

    Query.findOne({ id: query1.id }, (err, existing) => {
      if (!existing) {
        query1.save();
      }
    });

    const query2 = new Query({
      id: "queryId2",
      metadata: {
        xAxis: "Country",
        yAxis: "Population"
      },
      data: [
        {
          name: "Belgium",
          value: 13
        },
        {
          name: "France",
          value: 72
        }
      ]
    });

    Query.findOne({ id: query2.id }, (err, existing) => {
      if (!existing) {
        query2.save();
      }
    });
  };

  getQueryById = (req: Request, res: Response, next: NextFunction) => {
    Query.findOne({ id: req.params.queryId })
      .then(query => {
        if (!query) {
          return res.status(404).json({
            error:
              "Query with id: " + req.params.queryId + " not found in database2"
          });
        } else {
          return res.status(200).json({
            query
          });
        }
      })
      .catch(next);
  };
}
