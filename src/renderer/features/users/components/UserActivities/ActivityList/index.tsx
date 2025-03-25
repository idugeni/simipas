import React from "react";
import { UserActivity } from "../../../../../../lib/types";
import { FaEdit, FaTrash } from "react-icons/fa";

interface ActivityListProps {
  activities: UserActivity[];
  onEdit: (activity: UserActivity) => void;
  onDelete: (activityId: number) => void;
}

const ActivityList: React.FC<ActivityListProps> = ({
  activities,
  onEdit,
  onDelete,
}) => {
  if (activities.length === 0) {
    return (
      <p className="text-gray-500 italic">No activities found for this user.</p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Title
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Time
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Description
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {activities.map((activity) => (
            <tr key={activity.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {activity.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {activity.startTime} - {activity.endTime}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {activity.description}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {activity.status || "pending"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                <button
                  onClick={() => onEdit(activity)}
                  className="text-indigo-600 hover:text-indigo-900 inline-flex items-center gap-1"
                >
                  <FaEdit className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => activity.id && onDelete(activity.id)}
                  className="text-red-600 hover:text-red-900 inline-flex items-center gap-1"
                >
                  <FaTrash className="w-4 h-4" />
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActivityList;
