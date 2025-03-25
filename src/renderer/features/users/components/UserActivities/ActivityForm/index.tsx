import React from "react";

interface ActivityFormProps {
  activityFormData: {
    id?: number;
    title: string;
    description: string;
    startTime: string;
    endTime: string;
    status?: string;
  };
  editingActivity: number | null;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onCancel: () => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ActivityForm: React.FC<ActivityFormProps> = ({
  activityFormData,
  editingActivity,
  onSubmit,
  onCancel,
  onInputChange,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4 mb-6 bg-gray-50 p-4 rounded-lg"
    >
      <h3 className="font-medium text-lg">
        {editingActivity ? "Edit Activity" : "Add New Activity"}
      </h3>
      <div className="form-group">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Activity Title:
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={activityFormData.title}
          onChange={onInputChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="form-group">
        <label
          htmlFor="startTime"
          className="block text-sm font-medium text-gray-700"
        >
          Start Time:
        </label>
        <input
          type="time"
          id="startTime"
          name="startTime"
          value={activityFormData.startTime}
          onChange={onInputChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="form-group">
        <label
          htmlFor="endTime"
          className="block text-sm font-medium text-gray-700"
        >
          End Time:
        </label>
        <input
          type="time"
          id="endTime"
          name="endTime"
          value={activityFormData.endTime}
          onChange={onInputChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="form-group">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Activity Description:
        </label>
        <input
          type="text"
          id="description"
          name="description"
          value={activityFormData.description}
          onChange={onInputChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="form-group">
        <label
          htmlFor="status"
          className="block text-sm font-medium text-gray-700"
        >
          Status:
        </label>
        <input
          type="text"
          id="status"
          name="status"
          value={activityFormData.status || "pending"}
          onChange={onInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="flex space-x-3">
        <button
          type="submit"
          className="flex-1 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {editingActivity ? "Update Activity" : "Add Activity"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ActivityForm;
