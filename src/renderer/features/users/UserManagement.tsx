import React, { useEffect, useState } from "react";
import { User } from "../../../lib/types";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import UserActivities from "./components/UserActivities";
import { useUserForm } from "./hooks/useUserForm";
import { useUserActivities } from "./hooks/useUserActivities";

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [view, setView] = useState<"list" | "form" | "activity">("list");

  // User form hooks
  const {
    userFormData,
    setUserFormData,
    editingUser,
    message,
    setMessage,
    resetForm,
    handleEditUser,
    handleUserSubmit,
    handleDeleteUser,
  } = useUserForm(() => {
    loadUsers();
    setView("list");
  });

  // User activities hooks
  const {
    selectedUser,
    userActivities,
    activityFormData,
    editingActivity,
    handleUserSelect,
    handleActivityInputChange,
    handleActivitySubmit,
    handleEditActivity,
    handleDeleteActivity,
    resetActivityForm,
  } = useUserActivities();

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

  const handleUserEdit = (user: User) => {
    handleEditUser(user);
    setView("form");
  };

  const handleUserFormCancel = () => {
    resetForm();
    setView("list");
  };

  const handleUserActivitySelect = (user: User) => {
    handleUserSelect(user);
    setView("activity");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>

      {message && (
        <div
          className={`p-4 mb-4 rounded-md ${
            message.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
          <button className="float-right" onClick={() => setMessage(null)}>
            &times;
          </button>
        </div>
      )}

      {view === "list" && (
        <UserList
          users={users}
          onUserSelect={handleUserActivitySelect}
          onEdit={handleUserEdit}
          onDelete={handleDeleteUser}
        />
      )}

      {view === "form" && (
        <UserForm
          formData={userFormData}
          isEditing={!!editingUser}
          onInputChange={(e) => {
            const { name, value } = e.target;
            setUserFormData((prev) => ({ ...prev, [name]: value }));
          }}
          onSubmit={handleUserSubmit}
          onCancel={handleUserFormCancel}
        />
      )}

      {view === "activity" && selectedUser && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <UserList
              users={users}
              selectedUser={selectedUser}
              onUserSelect={handleUserActivitySelect}
              onEdit={handleUserEdit}
              onDelete={handleDeleteUser}
              compact
            />
          </div>
          <div className="md:col-span-2">
            <UserActivities
              user={selectedUser}
              activities={userActivities}
              activityFormData={activityFormData}
              editingActivity={editingActivity}
              onActivitySubmit={handleActivitySubmit}
              onActivityInputChange={handleActivityInputChange}
              onEditActivity={handleEditActivity}
              onDeleteActivity={handleDeleteActivity}
              onResetActivityForm={resetActivityForm}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
