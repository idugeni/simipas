import React from "react";
import { FaCalendar, FaClock, FaUsers } from "react-icons/fa";

const DashboardStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 w-full px-2 sm:px-4">
      <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 transition-all duration-500 ease-in-out hover:shadow-lg hover:bg-gray-50 transform hover:-translate-y-1">
        <div className="flex flex-col items-center">
          <div className="rounded-full bg-blue-100 p-4 mb-4 transition-all duration-300 hover:bg-blue-200 hover:scale-110 shadow-md hover:shadow-lg">
            <FaUsers className="w-8 h-8 text-blue-600 transition-colors duration-300 hover:text-blue-700" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 transition-colors duration-300 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Total Users
          </h3>
          <p className="mt-3 text-4xl font-bold text-blue-600 transition-all duration-300 hover:text-blue-700 hover:scale-105">
            0
          </p>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-xl shadow-md p-8 transition-all duration-500 ease-in-out hover:shadow-lg hover:bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="rounded-full bg-green-100 p-4 mb-4 transition-colors duration-500 hover:bg-green-200">
            <FaCalendar className="w-8 h-8 text-green-600 transition-colors duration-500 hover:text-green-700" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 transition-colors duration-500">
            Active Shifts
          </h3>
          <p className="mt-3 text-4xl font-bold text-green-600 transition-colors duration-500 hover:text-green-700">
            0
          </p>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-xl shadow-md p-8 transition-all duration-500 ease-in-out hover:shadow-lg hover:bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="rounded-full bg-yellow-100 p-4 mb-4 transition-colors duration-500 hover:bg-yellow-200">
            <FaClock className="w-8 h-8 text-yellow-600 transition-colors duration-500 hover:text-yellow-700" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 transition-colors duration-500">
            Pending Activities
          </h3>
          <p className="mt-3 text-4xl font-bold text-yellow-600 transition-colors duration-500 hover:text-yellow-700">
            0
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
