import React from "react";
import { Link } from "react-router-dom";
import DashboardCard from "./DashboardCard";
import { FaUsers, FaCalendarAlt, FaClipboardList } from "react-icons/fa";

const DashboardGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-6">
      <Link to="/users" className="h-full group">
        <DashboardCard
          title="Manajemen Pengguna"
          content={
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="flex-shrink-0 p-4 bg-blue-100 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-blue-200">
                <FaUsers className="text-4xl text-blue-600" />
              </div>
              <p className="text-gray-600">
                Kelola data pengguna sistem dengan mudah dan efisien
              </p>
            </div>
          }
        />
      </Link>

      <Link to="/activities" className="h-full">
        <DashboardCard
          title="Pengaturan Aktivitas"
          content={
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="flex-shrink-0 p-4 bg-green-100 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-green-200">
                <FaClipboardList className="text-4xl text-green-600" />
              </div>
              <p className="text-gray-600">
                Atur dan monitor aktivitas serta jurnal dengan terstruktur
              </p>
            </div>
          }
        />
      </Link>

      <Link to="/shifts" className="h-full">
        <DashboardCard
          title="Manajemen Shift"
          content={
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="flex-shrink-0 p-4 bg-purple-100 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-purple-200">
                <FaCalendarAlt className="text-4xl text-purple-600" />
              </div>
              <p className="text-gray-600">
                Kelola dan atur jadwal shift dengan fleksibel
              </p>
            </div>
          }
        />
      </Link>
    </div>
  );
};

export default DashboardGrid;
