import logger from "./logger";
export const ENVIRONMENT = process.env.NODE_ENV;
export const isProduction = ENVIRONMENT === "production"; // Anything else is treated as 'dev'
export const INFRASTRUCTURE_URL = process.env["INFRASTRUCTURE_URL"];
export const PORT = process.env["PORT"];
logger.info(`Starting with environment: ${ENVIRONMENT}`);
