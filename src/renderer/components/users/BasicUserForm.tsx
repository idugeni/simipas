import React, { useState } from "react";
import { UserType } from "../../../lib/types";

export interface BasicUser {
  fullName: string;
  nip: string;
  password: string;
  userType: UserType;
}

interface BasicUserFormProps {
  onSubmit: (userData: BasicUser) => void;
  initialData?: BasicUser;
}

const BasicUserForm: React.FC<BasicUserFormProps> = ({
  onSubmit,
  initialData,
}) => {
  const [formData, setFormData] = useState<BasicUser>(
    initialData || {
      fullName: "",
      nip: "",
      password: "",
      userType: "PENGAMANAN",
    },
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
          Nama Lengkap
        </label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">NIP</label>
        <input
          type="text"
          name="nip"
          value={formData.nip}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Tipe User
        </label>
        <select
          name="userType"
          value={formData.userType}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="PENGAMANAN">Pengamanan</option>
          <option value="ADMINISTRASI">Staff Administrasi</option>
        </select>
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

export default BasicUserForm;
