var winston = require("winston");

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/customerLog.log" })
  ]
});
const error = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/customerError.log" })
  ]
});

logger.log({
  level: "info",
  data: new Date(),
  message: "this is log"
});

error.log({
  level: "info",
  data: new Date(),
  message: "this is error"
});

module.exports = { logger, error };
