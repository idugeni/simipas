import winston from "winston";

const colorMapping: Record<string, string> = {
  info: "\x1b[32m",
  warn: "\x1b[33m",
  error: "\x1b[31m",
  debug: "\x1b[36m",
};

const dateColor = "\x1b[36m";
const timeColor = "\x1b[35m";
const resetColor = "\x1b[0m";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf(({ timestamp, level, message }) => {
      const [date, time] = (timestamp as string).split(" ");
      const levelColor = colorMapping[level.toLowerCase()] || "";
      return `${dateColor}[${date}]${resetColor} - ${timeColor}[${time}]${resetColor} ${levelColor}SIMIPAS${resetColor}: ${message}`;
    })
  ),
  transports: [new winston.transports.Console()],
});

export default logger;
