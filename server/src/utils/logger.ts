import winston from "winston";
import dayjs from "dayjs";
import { capitalize } from "lodash";

const myFormat = winston.format.printf(({ level, message }) => {
  return `[${dayjs().add(1, "hour").format()}] - ${capitalize(level)}: ${message}`;
});

const logger = winston.createLogger({
  format: myFormat,
  exceptionHandlers: [
    new winston.transports.File({ filename: "var/logs/exceptions.log" }),
  ],
});

if (process.env.NODE_ENV === "development") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), myFormat),
    })
  );
  logger.add(
    new winston.transports.File({
      filename: "var/logs/error.log",
      level: "error",
    })
  );
} else {
  logger.add(
    new winston.transports.File({
      filename: "var/logs/all-logs.log",
    })
  );
}

export default logger;
