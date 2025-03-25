import { useState } from "react";
import { User, UserActivity } from "../../../../lib/types";

interface ActivityFormData {
  id?: number;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  status?: string;
}

const initialActivityFormData: ActivityFormData = {
  title: "",
  startTime: "07:30",
  endTime: "14:30",
  description: "",
  status: "pending",
};

export const useUserActivities = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userActivities, setUserActivities] = useState<UserActivity[]>([]);
  const [activityFormData, setActivityFormData] = useState<ActivityFormData>(
    initialActivityFormData,
  );
  const [editingActivity, setEditingActivity] = useState<number | null>(null);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  const loadUserActivities = async (nip: string) => {
    try {
      const activities = await window.api.getUserActivities(nip);
      setUserActivities(activities);
    } catch (error) {
      setMessage({ text: `Error loading activities: ${error}`, type: "error" });
    }
  };

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    loadUserActivities(user.nip);
    resetActivityForm();
  };

  const resetActivityForm = () => {
    setActivityFormData(initialActivityFormData);
    setEditingActivity(null);
  };

  const handleActivityInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    setActivityFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleActivitySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;

    try {
      const activityData: UserActivity = {
        ...activityFormData,
        userId: selectedUser.id,
      };

      if (editingActivity) {
        activityData.id = editingActivity;
        await window.api.updateUserActivity(selectedUser.nip, activityData);
        setMessage({
          text: "Activity updated successfully",
          type: "success",
        });
      } else {
        await window.api.addUserActivity(selectedUser.nip, activityData);
        setMessage({
          text: "Activity added successfully",
          type: "success",
        });
      }

      resetActivityForm();
      loadUserActivities(selectedUser.nip);
    } catch (error) {
      setMessage({ text: `Error: ${error}`, type: "error" });
    }
  };

  const handleEditActivity = (activity: UserActivity) => {
    setActivityFormData({
      id: activity.id,
      title: activity.title,
      startTime: activity.startTime,
      endTime: activity.endTime,
      description: activity.description,
      status: activity.status,
    });
    setEditingActivity(activity.id || null);
  };

  const handleDeleteActivity = async (activityId: number) => {
    if (window.confirm("Are you sure you want to delete this activity?")) {
      try {
        await window.api.deleteUserActivity(activityId);
        setMessage({ text: "Activity deleted successfully", type: "success" });
        if (selectedUser) {
          loadUserActivities(selectedUser.nip);
        }
      } catch (error) {
        setMessage({
          text: `Error deleting activity: ${error}`,
          type: "error",
        });
      }
    }
  };

  return {
    selectedUser,
    setSelectedUser,
    userActivities,
    setUserActivities,
    activityFormData,
    setActivityFormData,
    editingActivity,
    setEditingActivity,
    message,
    setMessage,
    loadUserActivities,
    handleUserSelect,
    resetActivityForm,
    handleActivityInputChange,
    handleActivitySubmit,
    handleEditActivity,
    handleDeleteActivity,
    initialActivityFormData,
  };
};
