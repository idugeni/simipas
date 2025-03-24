import React, { useState } from "react";
import { User } from "../../../lib/types";
import {
  FaCog,
  FaEdit,
  FaIdCard,
  FaSearch,
  FaTrash,
  FaUser,
  FaUserPlus,
  FaUsers,
} from "react-icons/fa";

interface UserListProps {
  users: User[];
  onUserSelect: (user: User) => void;
  onEdit: (user: User) => void;
  onDelete: (nip: string) => void;
}

const UserList: React.FC<UserListProps> = ({
  users,
  onUserSelect,
  onEdit,
  onDelete,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.nip.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
        <div className="relative w-full sm:w-96">
          <input
            type="text"
            placeholder="Cari pengguna berdasarkan NIP atau nama..."
            className="block w-full pr-10 pl-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <FaSearch className="h-4 w-4 text-gray-400" />
          </div>
        </div>
        <button
          onClick={() =>
            onEdit({
              nip: "",
              fullName: "",
              password: "",
              userType: "PENGAMANAN",
              skpkgOption: 0,
              startTime: "",
              endTime: "",
              description: "",
              quantity: 0,
            })
          }
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors duration-200 shadow-sm hover:shadow sm:w-auto justify-center"
        >
          <FaUserPlus className="h-4 w-4" />
          <span>Tambah Pengguna</span>
        </button>
      </div>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
              >
                <div className="flex items-center gap-2">
                  <FaIdCard className="w-4 h-4" />
                  NIP
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
              >
                <div className="flex items-center gap-2">
                  <FaUser className="w-4 h-4" />
                  Full Name
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
              >
                <div className="flex items-center gap-2">
                  <FaUsers className="w-4 h-4" />
                  User Type
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
              >
                <div className="flex items-center gap-2">
                  <FaCog className="w-4 h-4" />
                  Actions
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr
                key={user.nip}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {user.nip}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {user.fullName}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${user.userType === "PENGAMANAN" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}`}
                  >
                    {user.userType}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button
                    onClick={() => onUserSelect(user)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors duration-150"
                  >
                    <FaCog className="w-4 h-4" />
                    Settings
                  </button>
                  <button
                    onClick={() => onEdit(user)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-md hover:bg-indigo-100 transition-colors duration-150"
                  >
                    <FaEdit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(user.nip)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors duration-150"
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
    </div>
  );
};

export default UserList;
