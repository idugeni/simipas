import React, { useState, useEffect } from "react";
import { User, UserType } from "../../../lib/types";
import UserList from "./UserList";
import ActivitySettings from "../activities/ActivitySettings";
import BasicUserForm from "./BasicUserForm";
import DetailUserForm from "./DetailUserForm";
import {
  FaCheckCircle,
  FaEdit,
  FaPlus,
  FaSync,
  FaTimesCircle,
  FaUserFriends,
  FaUserPlus,
  FaUsers,
} from "react-icons/fa";

interface UserFormData {
  fullName: string;
  nip: string;
  password: string;
  userType: UserType;
  skpkgOption: number;
  startTime: string;
  endTime: string;
  description: string;
  quantity: number;
}

const initialFormData: UserFormData = {
  fullName: "",
  nip: "",
  password: "",
  userType: "PENGAMANAN",
  skpkgOption: 1,
  startTime: "07:30",
  endTime: "14:30",
  description: "",
  quantity: 1,
};

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState<UserFormData>(initialFormData);
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const allUsers = await window.api.getAllUsers();
      setUsers(allUsers);
    } catch (error) {
      setMessage({ text: `Error loading users: ${error}`, type: "error" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userData: User = {
        ...formData,
        id: editingUser ? Number(editingUser) : undefined,
      };

      if (editingUser) {
        await window.api.updateUser(userData);
        setMessage({ text: "User updated successfully", type: "success" });
      } else {
        await window.api.addUser(userData);
        setMessage({ text: "User added successfully", type: "success" });
      }
      setFormData(initialFormData);
      setEditingUser(null);
      loadUsers();
    } catch (error) {
      setMessage({ text: `Error: ${error}`, type: "error" });
    }
  };

  const handleEdit = (user: User) => {
    setFormData({
      fullName: user.fullName,
      skpkgOption: user.skpkgOption || initialFormData.skpkgOption,
      startTime: user.startTime || initialFormData.startTime,
      endTime: user.endTime || initialFormData.endTime,
      description: user.description || initialFormData.description,
      quantity: user.quantity || initialFormData.quantity,
      nip: user.nip,
      password: user.password,
      userType: user.userType,
    });
    setEditingUser(user.nip);
    setSelectedUser(null);
  };

  const handleDelete = async (nip: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await window.api.deleteUser(nip);
        setMessage({ text: "User deleted successfully", type: "success" });
        loadUsers();
      } catch (error) {
        setMessage({ text: `Error deleting user: ${error}`, type: "error" });
      }
    }
  };

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setEditingUser(null);
    setFormData(initialFormData);
  };

  if (selectedUser) {
    return (
      <ActivitySettings
        user={selectedUser}
        onBack={() => setSelectedUser(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-3 sm:p-4 md:p-6 transition-all duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 mb-6 transition-all hover:shadow-xl">
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent flex items-center gap-3">
            <FaUsers className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600 transform transition-transform hover:scale-110" />
            User Management
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          <div className="xl:col-span-3">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
              <div className="p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                  <FaUserFriends className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 animate-pulse" />
                  User List
                </h2>
                <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                  <UserList
                    users={users}
                    onUserSelect={handleUserSelect}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
            <div className="p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                {editingUser ? (
                  <FaEdit className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 transform transition-transform group-hover:scale-110" />
                ) : (
                  <FaUserPlus className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 transform transition-transform group-hover:scale-110" />
                )}
                {editingUser ? "Edit User" : "Add New User"}
              </h2>
              <form
                onSubmit={handleSubmit}
                className="space-y-8 bg-gray-50 rounded-xl p-6 transition-all duration-300 hover:bg-white hover:shadow-md"
              >
                <div className="space-y-6 transition-all duration-300 transform hover:translate-x-1">
                  <BasicUserForm
                    onSubmit={(data) => {
                      setFormData((prev) => ({ ...prev, ...data }));
                    }}
                    initialData={{
                      fullName: formData.fullName,
                      nip: formData.nip,
                      password: formData.password,
                      userType: formData.userType,
                    }}
                  />
                </div>

                <div className="space-y-6 transition-all duration-300 transform hover:translate-x-1">
                  <DetailUserForm
                    onSubmit={(data) => {
                      setFormData((prev) => ({ ...prev, ...data }));
                    }}
                    initialData={{
                      ...formData,
                      id: editingUser ? Number(editingUser) : undefined,
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex justify-center items-center gap-3 py-4 px-6 border border-transparent rounded-xl shadow-lg text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] hover:shadow-xl"
                >
                  {editingUser ? (
                    <FaSync className="w-6 h-6 transition-transform duration-300 group-hover:rotate-180" />
                  ) : (
                    <FaPlus className="w-6 h-6 transition-transform duration-300 group-hover:rotate-180" />
                  )}
                  {editingUser ? "Update User" : "Add User"}
                </button>
              </form>

              {message && (
                <div
                  className={`mt-6 p-4 rounded-lg border ${message.type === "success" ? "bg-green-50 border-green-200 text-green-800" : "bg-red-50 border-red-200 text-red-800"} flex items-center gap-2 transition-all animate-fadeIn`}
                >
                  {message.type === "success" ? (
                    <FaCheckCircle className="w-5 h-5" />
                  ) : (
                    <FaTimesCircle className="w-5 h-5" />
                  )}
                  {message.text}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
