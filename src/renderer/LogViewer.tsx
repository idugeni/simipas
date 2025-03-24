import React, { useState, useEffect } from "react";
import "./LogViewer.css";

interface LogMessage {
  timestamp: string;
  level: string;
  message: string;
}

const LogViewer: React.FC = () => {
  const [logs, setLogs] = useState<LogMessage[]>([]);

  useEffect(() => {
    window.api.onLogMessage((log: LogMessage) => {
      setLogs((prevLogs) => [...prevLogs, log]);
    });
  }, []);

  return (
    <div className="log-viewer">
      <h2>Log Output</h2>
      <div className="log-container">
        {logs.map((log, index) => (
          <div
            key={index}
            className={`log-entry log-${log.level.toLowerCase()}`}
          >
            <span className="log-timestamp">[{log.timestamp}]</span>
            <span className="log-level">[{log.level}]</span>
            <span className="log-message">{log.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogViewer;
