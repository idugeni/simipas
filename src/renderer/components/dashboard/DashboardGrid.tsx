import React from "react";
import { Link } from "react-router-dom";
import DashboardCard from "./DashboardCard";
import { FaUsers, FaCalendarAlt, FaClipboardList } from "react-icons/fa";

const DashboardGrid: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/users" className="h-full">
          <DashboardCard title="Manajemen Pengguna">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-md">
                <FaUsers className="text-white text-4xl" />
              </div>
              <p className="text-gray-700 text-center">
                Kelola data pengguna sistem dengan mudah dan efisien.
              </p>
            </div>
          </DashboardCard>
        </Link>

        <Link to="/activities" className="h-full">
          <DashboardCard title="Pengaturan Aktivitas">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="p-4 bg-gradient-to-r from-green-500 to-green-600 rounded-full shadow-md">
                <FaClipboardList className="text-white text-4xl" />
              </div>
              <p className="text-gray-700 text-center">
                Atur dan monitor aktivitas serta jurnal dengan terstruktur.
              </p>
            </div>
          </DashboardCard>
        </Link>

        <Link to="/shifts" className="h-full">
          <DashboardCard title="Manajemen Shift">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="p-4 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full shadow-md">
                <FaCalendarAlt className="text-white text-4xl" />
              </div>
              <p className="text-gray-700 text-center">
                Kelola dan atur jadwal shift dengan fleksibel.
              </p>
            </div>
          </DashboardCard>
        </Link>
      </div>
    </div>
  );
};

export default DashboardGrid;
