import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaFilter,
  FaDownload,
  FaTrash,
  FaInfoCircle,
  FaExclamationTriangle,
  FaExclamationCircle,
  FaBug,
} from "react-icons/fa";
import "./LogViewer.css";

interface LogMessage {
  timestamp: string;
  level: string;
  message: string;
}

const LogViewer: React.FC = () => {
  const [logs, setLogs] = useState<LogMessage[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLevel, setFilterLevel] = useState<string | null>(null);

  useEffect(() => {
    window.api.onLogMessage((log: LogMessage) => {
      setLogs((prevLogs) => [...prevLogs, log]);
    });
  }, []);

  const clearLogs = () => {
    setLogs([]);
  };

  const downloadLogs = () => {
    const logText = logs
      .map((log) => `[${log.timestamp}] [${log.level}] ${log.message}`)
      .join("\n");
    const blob = new Blob([logText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `simipas-logs-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.timestamp.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterLevel
      ? log.level.toLowerCase() === filterLevel.toLowerCase()
      : true;
    return matchesSearch && matchesFilter;
  });

  const getLogIcon = (level: string) => {
    switch (level.toLowerCase()) {
      case "info":
        return <FaInfoCircle className="text-blue-500" />;
      case "warn":
      case "warning":
        return <FaExclamationTriangle className="text-yellow-500" />;
      case "error":
        return <FaExclamationCircle className="text-red-500" />;
      case "debug":
        return <FaBug className="text-green-500" />;
      default:
        return <FaInfoCircle className="text-gray-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Log Aplikasi</h2>
        <div className="flex space-x-2">
          <button
            onClick={downloadLogs}
            className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
          >
            <FaDownload className="mr-2" /> Export
          </button>
          <button
            onClick={clearLogs}
            className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center"
          >
            <FaTrash className="mr-2" /> Clear
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="md:w-48">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaFilter className="text-gray-400" />
            </div>
            <select
              value={filterLevel || ""}
              onChange={(e) => setFilterLevel(e.target.value || null)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
            >
              <option value="">All Levels</option>
              <option value="info">Info</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
              <option value="debug">Debug</option>
            </select>
          </div>
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between">
          <div className="w-48 font-medium text-gray-700">Timestamp</div>
          <div className="w-24 font-medium text-gray-700">Level</div>
          <div className="flex-1 font-medium text-gray-700">Message</div>
        </div>

        <div className="log-container overflow-y-auto max-h-[calc(100vh-350px)]">
          {filteredLogs.length > 0 ? (
            filteredLogs.map((log, index) => (
              <div
                key={index}
                className={`px-4 py-3 border-b border-gray-200 flex items-start hover:bg-gray-50 transition-colors ${
                  log.level.toLowerCase() === "error"
                    ? "bg-red-50"
                    : log.level.toLowerCase() === "warning"
                      ? "bg-yellow-50"
                      : log.level.toLowerCase() === "debug"
                        ? "bg-green-50"
                        : ""
                }`}
              >
                <div className="w-48 text-gray-600 text-sm">
                  {log.timestamp}
                </div>
                <div className="w-24 flex items-center">
                  <span className="flex items-center text-sm font-medium">
                    {getLogIcon(log.level)}
                    <span className="ml-2">{log.level}</span>
                  </span>
                </div>
                <div className="flex-1 text-gray-800 text-sm break-all">
                  {log.message}
                </div>
              </div>
            ))
          ) : (
            <div className="px-4 py-8 text-center text-gray-500">
              {logs.length === 0
                ? "No logs available"
                : "No logs match your search criteria"}
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-500 flex justify-between">
        <div>Total logs: {logs.length}</div>
        <div>Filtered logs: {filteredLogs.length}</div>
      </div>
    </div>
  );
};

export default LogViewer;
