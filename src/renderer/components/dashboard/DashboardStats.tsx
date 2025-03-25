import React from "react";
import { FaCalendar, FaClock, FaUsers } from "react-icons/fa";

const DashboardStats: React.FC = () => {
  return (
    <div className="w-full px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card Total Users */}
        <div className="flex items-center bg-white rounded-xl shadow p-6 border-l-4 border-blue-500 transition hover:shadow-xl">
          <div className="p-4 rounded-full bg-blue-100 mr-4">
            <FaUsers className="text-blue-600 w-10 h-10" />
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-700">Total Users</p>
            <p className="text-3xl font-bold text-blue-600">0</p>
          </div>
        </div>

        {/* Card Active Shifts */}
        <div className="flex items-center bg-white rounded-xl shadow p-6 border-l-4 border-green-500 transition hover:shadow-xl">
          <div className="p-4 rounded-full bg-green-100 mr-4">
            <FaCalendar className="text-green-600 w-10 h-10" />
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-700">Active Shifts</p>
            <p className="text-3xl font-bold text-green-600">0</p>
          </div>
        </div>

        {/* Card Pending Activities */}
        <div className="flex items-center bg-white rounded-xl shadow p-6 border-l-4 border-yellow-500 transition hover:shadow-xl">
          <div className="p-4 rounded-full bg-yellow-100 mr-4">
            <FaClock className="text-yellow-600 w-10 h-10" />
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-700">
              Pending Activities
            </p>
            <p className="text-3xl font-bold text-yellow-600">0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
