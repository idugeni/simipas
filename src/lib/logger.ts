import winston from "winston";
import chalk from "chalk";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.uncolorize(),
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf(({ timestamp, level, message }) => {
      const ts = timestamp as string;
      const [date, time] = ts.split(" ");
      const customLevel = level === "info" ? "SIMIPAS" : level;
      return `${chalk.bold.blue(`[${date}] - [${time}]`)} ${customLevel}: ${message}`;
    }),
    winston.format.colorize({ all: true }),
  ),
  transports: [new winston.transports.Console()],
});

export default logger;
