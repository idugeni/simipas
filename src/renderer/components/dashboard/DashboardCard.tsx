import React from "react";

export interface DashboardCardProps {
  title: string;
  children?: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, children }) => {
  return (
    <div className="h-full flex flex-col justify-between bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
      <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>
      <div className="flex-grow flex flex-col justify-center">{children}</div>
    </div>
  );
};

export default DashboardCard;
