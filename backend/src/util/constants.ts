import logger from "./logger";
export const ENVIRONMENT = process.env.NODE_ENV;
export const isProduction = ENVIRONMENT === "production"; // Anything else is treated as 'dev'
export const INFRASTRUCTURE_URL = process.env["INFRASTRUCTURE_URL"];
export const PORT = process.env["PORT"];
export const LANGUAGE = process.env["LANGUAGE"].toLowerCase();
export const TIMEZONE = process.env["Europe/Berlin"];
export const MONITORING_URL = process.env["MONITORING_URL"];

export const LANGUAGES_AVAILABLE = {
  DE: "de",
  EN: "en"
};
logger.info(`Starting with environment: ${ENVIRONMENT}`);
