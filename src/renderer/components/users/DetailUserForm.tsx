import React, { useState } from "react";
import { User } from "../../../lib/types";

interface DetailUserFormProps {
  onSubmit: (userData: User) => void;
  initialData: User;
}

const DetailUserForm: React.FC<DetailUserFormProps> = ({
  onSubmit,
  initialData,
}) => {
  const [formData, setFormData] = useState<User>({
    ...initialData,
    skpkgOption: initialData.skpkgOption || 1,
    startTime: initialData.startTime || "07:30",
    endTime: initialData.endTime || "14:30",
    description: initialData.description || "",
    quantity: initialData.quantity || 1,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "skpkgOption" || name === "quantity" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Opsi SKP/KG
        </label>
        <input
          type="number"
          name="skpkgOption"
          value={formData.skpkgOption}
          onChange={handleInputChange}
          min="1"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Waktu Mulai
        </label>
        <input
          type="time"
          name="startTime"
          value={formData.startTime}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Waktu Selesai
        </label>
        <input
          type="time"
          name="endTime"
          value={formData.endTime}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Deskripsi
        </label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Kuantitas
        </label>
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleInputChange}
          min="1"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div className="pt-5">
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Simpan
        </button>
      </div>
    </form>
  );
};

export default DetailUserForm;
