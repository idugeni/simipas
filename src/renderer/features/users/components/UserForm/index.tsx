import React from "react";
import { UserType } from "../../../../../lib/types";
import BasicUserForm, { BasicUser } from "./BasicUserForm";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaEdit,
  FaUserPlus,
} from "react-icons/fa";

interface UserFormProps {
  formData: {
    fullName: string;
    nip: string;
    password: string;
    userType: UserType;
  };
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onCancel: () => void;
  isEditing: boolean;
}

const UserForm: React.FC<UserFormProps> = ({
  formData,
  onInputChange,
  onSubmit,
  onCancel,
  isEditing,
}) => {
  const handleBasicUserSubmit = (data: BasicUser) => {
    // This function is used to update the parent formData when BasicUserForm changes
    // We'll simulate the input change events to update the parent state
    Object.entries(data).forEach(([key, value]) => {
      const event = {
        target: { name: key, value },
      } as React.ChangeEvent<HTMLInputElement | HTMLSelectElement>;
      onInputChange(event);
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
          {isEditing ? (
            <FaEdit className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
          ) : (
            <FaUserPlus className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
          )}
          {isEditing ? "Edit User" : "Add New User"}
        </h2>
        <form
          onSubmit={onSubmit}
          className="space-y-8 bg-gray-50 rounded-xl p-6 transition-all duration-300 hover:bg-white hover:shadow-md"
        >
          <div className="space-y-6">
            <BasicUserForm
              onSubmit={handleBasicUserSubmit}
              initialData={{
                fullName: formData.fullName,
                nip: formData.nip,
                password: formData.password,
                userType: formData.userType,
              }}
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 inline-flex justify-center items-center gap-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              <FaCheckCircle className="w-4 h-4" />
              {isEditing ? "Update User" : "Add User"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 inline-flex justify-center items-center gap-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              <FaTimesCircle className="w-4 h-4" />
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
