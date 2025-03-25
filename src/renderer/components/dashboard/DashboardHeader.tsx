import React from "react";

const DashboardHeader: React.FC = () => {
  return (
    <header className="bg-white shadow-md rounded-lg p-6 mb-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-500 mt-2">
          Insights at a glance for your business performance
        </p>
      </div>
    </header>
  );
};

export default DashboardHeader;
