import { Request, Response, NextFunction } from "express";
import mongoose = require("mongoose");

export let getHealth = (req: Request, res: Response, next: NextFunction) => {
  const mongooseState = getDbConnectionState();

  return res.json({
    base: {
      name: "base",
      description: "API responding",
      status: true
    },
    database: {
      name: "database",
      status: mongooseState,
      description: "Check if database is connected"
    }
  });
};

export let getDbConnectionState = () => {
  let mongooseConnection = mongoose.connection.readyState;
  if (mongooseConnection === 0) return "disconnected";
  if (mongooseConnection === 1) return "connected";
  if (mongooseConnection === 2) return "connecting";
  if (mongooseConnection === 3) return "disconnecting";
  if (mongooseConnection === 4) return "unauthorized";
  if (mongooseConnection === 99) return "mongoose unitialized";
  return "unknown status";
};
