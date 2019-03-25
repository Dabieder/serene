import logger from "../util/logger";
import mongoose = require("mongoose");

export class DatabaseService {
  connect = async () => {
    const mongoUrl = process.env["DB_URI"];
    const user = encodeURIComponent(process.env["DB_USERNAME"]);
    const pass = encodeURIComponent(process.env["DB_PASSWORD"]);
    const dbName = encodeURIComponent(process.env["DB_NAME"]);

    const connectUrl = `mongodb://${user}:${pass}@${mongoUrl}/${dbName}`;

    logger.debug("Trying to connect to MongoDB on URL: " + connectUrl);
    return await mongoose
      .connect(
        connectUrl,
        {
          useNewUrlParser: true
        }
      )
      .catch(err => {
        logger.error("MongoDB connection error: " + err);
      });
  };
}
