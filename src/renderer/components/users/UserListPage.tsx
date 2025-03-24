import React, { useState, useEffect } from "react";
import { User } from "../../../lib/types";
import { Link } from "react-router-dom";
import {
  FaCog,
  FaEdit,
  FaIdCard,
  FaPlus,
  FaSearch,
  FaTrash,
  FaUser,
  FaUserFriends,
  FaUsers,
} from "react-icons/fa";

const UserListPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const loadedUsers = await window.api.getUsers();
      setUsers(loadedUsers);
    } catch (error) {
      setError("Error loading users: " + error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (nip: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await window.api.deleteUser(nip);
        await loadUsers();
      } catch (error) {
        setError("Error deleting user: " + error);
      }
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.nip.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto space-y-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent flex items-center gap-2">
              <FaUsers className="w-8 h-8 text-blue-600" />
              User Management
            </h1>
            <Link
              to="/users/add"
              className="flex items-center gap-2 px-4 py-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg shadow-sm hover:from-blue-700 hover:to-blue-800 transition-colors duration-300"
            >
              <FaPlus />
              <span className="font-sm">Add New User</span>
            </Link>
          </div>

          <div className="mt-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search users by name or NIP..."
                className="w-full pl-4 pr-10 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-4">Loading...</div>
          ) : error ? (
            <div className="text-red-600 text-center py-4">{error}</div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-4 text-gray-500">No users found</div>
          ) : (
            <div className="mt-6 overflow-x-auto rounded-lg shadow-sm border border-gray-100">
              <table className="min-w-full divide-y divide-gray-200 bg-white">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-4 text-left">
                      <div className="flex items-center gap-2 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        <FaIdCard className="w-4 h-4 text-gray-500" />
                        NIP
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left">
                      <div className="flex items-center gap-2 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        <FaUser className="w-4 h-4 text-gray-500" />
                        Name
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left">
                      <div className="flex items-center gap-2 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        <FaUserFriends className="w-4 h-4 text-gray-500" />
                        Type
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left">
                      <div className="flex items-center gap-2 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        <FaCog className="w-4 h-4 text-gray-500" />
                        Actions
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr
                      key={user.nip}
                      className="hover:bg-blue-50/20 transition-colors duration-150"
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
                        <Link
                          to={`/users/${user.nip}/edit`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-md hover:bg-indigo-100 transition-colors duration-150"
                        >
                          <FaEdit className="w-4 h-4" />
                          Edit
                        </Link>
                        <Link
                          to="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handleDelete(user.nip);
                          }}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors duration-150"
                        >
                          <FaTrash className="w-4 h-4" />
                          Delete
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserListPage;
