import React from "react";
import DashboardStats from "./DashboardStats";
import DashboardHeader from "./DashboardHeader";
import DashboardGrid from "./DashboardGrid";
import ShiftSchedule from "./ShiftSchedule";
import UserActivities from "./UserActivities";

const Dashboard: React.FC = () => {
  return (
    <>
      <div className="my-6 py-6 border-b border-gray-200">
        <DashboardHeader />
      </div>
      <div className="my-6 py-6 border-b border-gray-200">
        <DashboardStats />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-4 mb-6">
        <ShiftSchedule
          currentShift={{
            type: "SIANG",
            startTime: "13:01",
            endTime: "19:01",
          }}
          nextShift={{
            type: "PAGI_MALAM",
            startTime: "07:01",
            endTime: "07:01",
          }}
        />
        <UserActivities
          activities={[
            {
              description: "Melakukan patroli rutin",
              status: "completed",
              time: "14:30",
            },
            {
              description: "Pemeriksaan CCTV",
              status: "pending",
              time: "16:00",
            },
          ]}
        />
      </div>
      <DashboardGrid />
    </>
  );
};

export default Dashboard;
