import * as logger from "winston";
import fs from "fs";

const logDir = "log";
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const transportOptions = {
  file: {
    level: "info",
    filename: process.env["LOG_PATH"],
    handleExceptions: true,
    json: true,
    maxsize: 5242880,
    maxFiles: 5,
    colorize: false
  },
  console: {
    level: "debug",
    handleExceptions: true,
    json: false,
    colorize: true
  }
};

// TODO: Add logging to file and DB
logger.configure({
  level: "debug",
  format: logger.format.combine(
    logger.format.colorize(),
    logger.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss"
    }),
    logger.format.simple()
  ),
  transports: [new logger.transports.Console(transportOptions.console)]
});

if (process.env.NODE_ENV !== "production") {
  logger.debug("Logging initialized at debug level");
}

export default logger;
