import React from "react";
import { FaCalendarAlt, FaUserClock } from "react-icons/fa";

interface ShiftScheduleProps {
  currentShift?: {
    type: string;
    startTime: string;
    endTime: string;
  };
  nextShift?: {
    type: string;
    startTime: string;
    endTime: string;
  };
}

const ShiftSchedule: React.FC<ShiftScheduleProps> = ({
  currentShift,
  nextShift,
}) => {
  const formatShiftType = (type: string) => {
    return type
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <FaCalendarAlt className="text-blue-600" />
          Jadwal Shift
        </h2>
      </div>

      <div className="space-y-4">
        {currentShift ? (
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-600">
              Shift Saat Ini
            </h3>
            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FaUserClock className="text-blue-600 text-xl" />
                <span className="text-lg font-semibold text-blue-700">
                  {formatShiftType(currentShift.type)}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                {currentShift.startTime} - {currentShift.endTime}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500">Tidak ada shift aktif</div>
        )}

        {nextShift && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-600">
              Shift Selanjutnya
            </h3>
            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FaUserClock className="text-gray-600 text-xl" />
                <span className="text-lg font-semibold text-gray-700">
                  {formatShiftType(nextShift.type)}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                {nextShift.startTime} - {nextShift.endTime}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShiftSchedule;
