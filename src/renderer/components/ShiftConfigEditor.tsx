import React, { useState, useEffect } from "react";
import { ShiftConfig, ShiftType, User, UserType } from "../../lib/database";
import { ShiftManager } from "../../lib/shiftManager";

interface ShiftActivity {
  title: string;
  description: string;
  status?: string;
}

interface ShiftConfigEditorProps {
  user: User;
  onSave: (config: ShiftConfig) => void;
  existingConfig?: ShiftConfig;
}

export const ShiftConfigEditor: React.FC<ShiftConfigEditorProps> = ({
  user,
  onSave,
  existingConfig,
}) => {
  const [shiftType, setShiftType] = useState<ShiftType>(
    existingConfig?.shiftType || getDefaultShiftType(user.userType),
  );
  const [startTime, setStartTime] = useState(existingConfig?.startTime || "");
  const [endTime, setEndTime] = useState(existingConfig?.endTime || "");
  const [activities, setActivities] = useState<ShiftActivity[]>(
    existingConfig?.activities || [],
  );

  useEffect(() => {
    const defaultConfig = ShiftManager.getDefaultShiftConfig(
      user.userType,
      shiftType,
    );
    setStartTime(defaultConfig.startTime || "");
    setEndTime(defaultConfig.endTime || "");
  }, [shiftType, user.userType]);

  const getShiftTypeOptions = (userType: UserType): ShiftType[] => {
    if (userType === "PENGAMANAN") {
      return ["SIANG", "PAGI_MALAM", "LEPAS_PIKET", "LIBUR"];
    }
    return ["NON_SHIFT", "SHIFT_SIANG_KHUSUS"];
  };

  const getDefaultShiftType = (userType: UserType): ShiftType => {
    return userType === "PENGAMANAN" ? "SIANG" : "NON_SHIFT";
  };

  const handleAddActivity = () => {
    setActivities([
      ...activities,
      { title: "", description: "", status: "pending" },
    ]);
  };

  const handleActivityChange = (
    index: number,
    field: keyof ShiftActivity,
    value: string,
  ) => {
    const newActivities = [...activities];
    newActivities[index] = {
      ...newActivities[index],
      [field]: value,
    };
    setActivities(newActivities);
  };

  const handleRemoveActivity = (index: number) => {
    setActivities(activities.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const config: ShiftConfig = {
      userId: user.id!,
      shiftType,
      startTime,
      endTime,
      activities,
      isTemplate: true,
    };
    onSave(config);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Tipe Shift
        </label>
        <select
          value={shiftType}
          onChange={(e) => setShiftType(e.target.value as ShiftType)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          {getShiftTypeOptions(user.userType).map((type) => (
            <option key={type} value={type}>
              {type.replace("_", " ")}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Waktu Mulai
          </label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Waktu Selesai
          </label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Kegiatan</h3>
          <button
            type="button"
            onClick={handleAddActivity}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Tambah Kegiatan
          </button>
        </div>

        {activities.map((activity, index) => (
          <div key={index} className="border rounded-md p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Judul Kegiatan
              </label>
              <input
                type="text"
                value={activity.title}
                onChange={(e) =>
                  handleActivityChange(index, "title", e.target.value)
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Deskripsi Kegiatan
              </label>
              <textarea
                value={activity.description}
                onChange={(e) =>
                  handleActivityChange(index, "description", e.target.value)
                }
                rows={2}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                value={activity.status || "pending"}
                onChange={(e) =>
                  handleActivityChange(index, "status", e.target.value)
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <button
              type="button"
              onClick={() => handleRemoveActivity(index)}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
            >
              Hapus
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Simpan Konfigurasi
        </button>
      </div>
    </form>
  );
};
