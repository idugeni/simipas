import React from "react";
import { User, UserActivity } from "../../../../../lib/types";
import ActivityForm from "./ActivityForm";
import ActivityList from "./ActivityList";
import { FaPlus } from "react-icons/fa";

interface UserActivitiesProps {
  user: User;
  activities: UserActivity[];
  activityFormData: {
    id?: number;
    title: string;
    description: string;
    startTime: string;
    endTime: string;
    status?: string;
  };
  editingActivity: number | null;
  onActivitySubmit: (e: React.FormEvent) => Promise<void>;
  onActivityInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEditActivity: (activity: UserActivity) => void;
  onDeleteActivity: (activityId: number) => void;
  onResetActivityForm: () => void;
}

const UserActivities: React.FC<UserActivitiesProps> = ({
  user,
  activities,
  activityFormData,
  editingActivity,
  onActivitySubmit,
  onActivityInputChange,
  onEditActivity,
  onDeleteActivity,
  onResetActivityForm,
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          Activities for {user.fullName}
        </h2>
        <button
          onClick={onResetActivityForm}
          className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
        >
          <FaPlus className="w-4 h-4" />
          Add New Activity
        </button>
      </div>

      {/* Activity Form */}
      <ActivityForm
        activityFormData={activityFormData}
        editingActivity={editingActivity}
        onSubmit={onActivitySubmit}
        onCancel={onResetActivityForm}
        onInputChange={onActivityInputChange}
      />

      {/* Activities List */}
      <div className="mt-6">
        <h3 className="font-medium text-lg mb-3">User Activities</h3>
        <ActivityList
          activities={activities}
          onEdit={onEditActivity}
          onDelete={onDeleteActivity}
        />
      </div>
    </div>
  );
};

export default UserActivities;
