import React from "react";

interface DashboardCardProps {
  title: string;
  content: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, content }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 h-full transition-all duration-500 ease-in-out hover:shadow-lg hover:bg-gray-50 cursor-pointer transform hover:-translate-y-1">
      <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-gray-800 text-center bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
        {title}
      </h2>
      <div className="transition-all duration-300 transform hover:scale-105">
        {content}
      </div>
    </div>
  );
};

export default DashboardCard;
