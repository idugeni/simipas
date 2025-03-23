import winston from "winston";
import { BrowserWindow } from 'electron';

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf(({ timestamp, level, message }) => {
      const [date, time] = (timestamp as string).split(" ");
      const formattedLevel = level.toUpperCase();
      const logMessage = `[${date}] - [${time}] [${formattedLevel}] SIMIPAS: ${message}`;
      
      // Send log to renderer process with formatted level and timestamp
      const windows = BrowserWindow.getAllWindows();
      windows.forEach(window => {
        window.webContents.send('log-message', {
          timestamp: `${date} ${time}`,
          level: formattedLevel,
          message: message // Send original message for better display in GUI
        });
      });

      return logMessage;
    })
  ),
  transports: [new winston.transports.Console()],
});

export default logger;
