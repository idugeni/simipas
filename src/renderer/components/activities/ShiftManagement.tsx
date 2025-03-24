import React, { useState } from "react";
import { UserInput, AutomationResult } from "../../../lib/types";

const ShiftManagement: React.FC = () => {
  const [shiftType, setShiftType] = useState<"ALL" | "SINGLE">("SINGLE");
  const [date, setDate] = useState<Date | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [totalEntries, setTotalEntries] = useState(0);

  const formatDateForBackend = (date: Date | null) => {
    if (!date) return "";
    return date.toISOString().split("T")[0];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setStatus("idle");

    const userInput: UserInput =
      shiftType === "ALL"
        ? {
            shiftType,
            startDate: formatDateForBackend(startDate),
            endDate: formatDateForBackend(endDate),
            date: null,
          }
        : {
            shiftType,
            date: formatDateForBackend(date),
            startDate: null,
            endDate: null,
          };

    try {
      const result = (await window.api.runAutomation(
        userInput,
      )) as AutomationResult;
      if (result.success) {
        setMessage("Otomasi berhasil dijalankan!");
        setStatus("success");
        setTotalEntries(result.result?.totalEntries || 0);
      } else {
        setMessage(`Error: ${result.error}`);
        setStatus("error");
      }
    } catch (error) {
      setMessage(
        `Error: ${error instanceof Error ? error.message : String(error)}`,
      );
      setStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Shift Management</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700">
              Shift Type:
            </label>
            <select
              value={shiftType}
              onChange={(e) => setShiftType(e.target.value as "ALL" | "SINGLE")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="SINGLE">Single Day</option>
              <option value="ALL">Date Range</option>
            </select>
          </div>

          {shiftType === "SINGLE" ? (
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700">
                Date:
              </label>
              <input
                type="date"
                value={date ? formatDateForBackend(date) : ""}
                onChange={(e) =>
                  setDate(e.target.value ? new Date(e.target.value) : null)
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          ) : (
            <>
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700">
                  Start Date:
                </label>
                <input
                  type="date"
                  value={startDate ? formatDateForBackend(startDate) : ""}
                  onChange={(e) =>
                    setStartDate(
                      e.target.value ? new Date(e.target.value) : null,
                    )
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700">
                  End Date:
                </label>
                <input
                  type="date"
                  value={endDate ? formatDateForBackend(endDate) : ""}
                  onChange={(e) =>
                    setEndDate(e.target.value ? new Date(e.target.value) : null)
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isLoading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
          >
            {isLoading ? "Processing..." : "Run Automation"}
          </button>
        </form>

        {message && (
          <div
            className={`mt-4 p-4 rounded-md ${status === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}
          >
            <p>{message}</p>
            {status === "success" && (
              <p className="mt-2 text-sm">
                Total entries processed: {totalEntries}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShiftManagement;
