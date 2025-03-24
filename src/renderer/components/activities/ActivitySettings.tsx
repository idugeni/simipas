import React, { useState } from "react";
import { User } from "../../../lib/types";

interface ActivityFormData {
  skpkgOption: number;
  startTime: string;
  endTime: string;
  description: string;
  quantity: number;
}

interface ActivitySettingsProps {
  user: User;
  onBack: () => void;
}

const initialFormData: ActivityFormData = {
  skpkgOption: 1,
  startTime: "",
  endTime: "",
  description: "",
  quantity: 1,
};

export default function ActivitySettings({
  user,
  onBack,
}: ActivitySettingsProps) {
  const [formData, setFormData] = useState<ActivityFormData>(initialFormData);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "skpkgOption" || name === "quantity" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await window.api.updateUserActivity(user.nip, formData);
      setMessage({
        text: "Activity settings updated successfully",
        type: "success",
      });
    } catch (error) {
      setMessage({ text: `Error: ${error}`, type: "error" });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          Activity Settings for {user.fullName}
        </h2>
        <button
          onClick={onBack}
          className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
        >
          Back to User List
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-group">
          <label
            htmlFor="skpkgOption"
            className="block text-sm font-medium text-gray-700"
          >
            SKPKG Option:
          </label>
          <input
            type="number"
            id="skpkgOption"
            name="skpkgOption"
            value={formData.skpkgOption}
            onChange={handleInputChange}
            min="1"
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
            value={formData.startTime}
            onChange={handleInputChange}
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
            value={formData.endTime}
            onChange={handleInputChange}
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
            value={formData.description}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="form-group">
          <label
            htmlFor="quantity"
            className="block text-sm font-medium text-gray-700"
          >
            Quantity:
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            min="1"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Save Activity Settings
        </button>
      </form>

      {message && (
        <div
          className={`mt-4 p-4 rounded-md ${message.type === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
}
