import React, { useState, useEffect } from "react";
import { User, ShiftConfig } from "../../lib/database";
import { ShiftManager } from "../../lib/shiftManager";

interface ShiftAutomationProps {
  users: User[];
}

export const ShiftAutomation: React.FC<ShiftAutomationProps> = ({ users }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [shiftConfigs, setShiftConfigs] = useState<ShiftConfig[]>([]);
  const [selectedConfig, setSelectedConfig] = useState<ShiftConfig | null>(
    null,
  );
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (selectedUser?.id) {
      loadShiftConfigs(selectedUser.id);
    }
  }, [selectedUser]);

  const loadShiftConfigs = async (userId: number) => {
    try {
      const configs = await window.electron.invoke("get-shift-configs", userId);
      setShiftConfigs(configs.filter((config) => config.isTemplate));
    } catch (error) {
      setError("Gagal memuat konfigurasi shift");
      console.error("Error loading shift configs:", error);
    }
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const user = users.find((u) => u.id === Number(event.target.value));
    setSelectedUser(user || null);
    setSelectedConfig(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser?.id || !selectedConfig || !startDate || !endDate) {
      setError("Mohon lengkapi semua field");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await ShiftManager.applyShiftConfig(
        selectedUser.id,
        new Date(startDate),
        new Date(endDate),
        selectedConfig,
      );
      setError("Berhasil menjalankan automasi shift");
    } catch (error) {
      setError("Gagal menjalankan automasi shift");
      console.error("Error applying shift config:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">
        Automasi Pengisian Shift
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Pilih User
          </label>
          <select
            value={selectedUser?.id || ""}
            onChange={handleUserChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Pilih user...</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.fullName} ({user.userType})
              </option>
            ))}
          </select>
        </div>

        {selectedUser && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Template Shift
            </label>
            <select
              value={selectedConfig?.id || ""}
              onChange={(e) => {
                const config = shiftConfigs.find(
                  (c) => c.id === Number(e.target.value),
                );
                setSelectedConfig(config || null);
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Pilih template shift...</option>
              {shiftConfigs.map((config) => (
                <option key={config.id} value={config.id}>
                  {config.shiftType.replace("_", " ")}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tanggal Mulai
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tanggal Selesai
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">{error}</h3>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
          >
            {isLoading ? "Memproses..." : "Jalankan Automasi"}
          </button>
        </div>
      </form>
    </div>
  );
};
