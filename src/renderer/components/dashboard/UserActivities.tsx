import React from "react";
import { FaClipboardList, FaCheckCircle } from "react-icons/fa";

interface Activity {
  description: string;
  status: "pending" | "completed";
  time: string;
}

interface UserActivitiesProps {
  activities?: Activity[];
}

const UserActivities: React.FC<UserActivitiesProps> = ({ activities = [] }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <FaClipboardList className="text-green-600" />
          Aktivitas Pengguna
        </h2>
      </div>

      <div className="space-y-4">
        {activities.length > 0 ? (
          activities.map((activity, index) => (
            <div
              key={index}
              className={`p-4 ${activity.status === "completed" ? "bg-green-50" : "bg-yellow-50"} rounded-lg`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FaCheckCircle
                    className={`text-xl ${activity.status === "completed" ? "text-green-600" : "text-yellow-600"}`}
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {activity.description}
                  </span>
                </div>
                <div className="text-sm text-gray-600">{activity.time}</div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">Tidak ada aktivitas</div>
        )}
      </div>
    </div>
  );
};

export default UserActivities;
