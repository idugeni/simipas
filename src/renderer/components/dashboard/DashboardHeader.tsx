import React from "react";
import { FaChartBar } from "react-icons/fa";

const DashboardHeader: React.FC = () => {
  return (
    <div className="flex items-center space-x-4">
      <FaChartBar className="text-3xl text-blue-600" />
      <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
    </div>
  );
};

export default DashboardHeader;
