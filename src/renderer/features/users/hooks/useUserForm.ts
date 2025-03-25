import { useState } from "react";
import { User, UserType } from "../../../../lib/types";

interface UserFormData {
  fullName: string;
  nip: string;
  password: string;
  userType: UserType;
}

const initialUserFormData: UserFormData = {
  fullName: "",
  nip: "",
  password: "",
  userType: "PENGAMANAN",
};

export const useUserForm = (onSuccess: () => void) => {
  const [userFormData, setUserFormData] =
    useState<UserFormData>(initialUserFormData);
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  const resetForm = () => {
    setUserFormData(initialUserFormData);
    setEditingUser(null);
  };

  const handleEditUser = (user: User) => {
    setUserFormData({
      fullName: user.fullName,
      nip: user.nip,
      password: user.password,
      userType: user.userType,
    });
    setEditingUser(user.nip);
  };

  const handleUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userData: User = {
        fullName: userFormData.fullName,
        nip: userFormData.nip,
        password: userFormData.password,
        userType: userFormData.userType,
        id: editingUser ? Number(editingUser) : undefined,
      };

      if (editingUser) {
        await window.api.updateUser(userData);
        setMessage({ text: "User updated successfully", type: "success" });
      } else {
        await window.api.addUser(userData);
        setMessage({ text: "User added successfully", type: "success" });
      }
      resetForm();
      onSuccess();
    } catch (error) {
      setMessage({ text: `Error: ${error}`, type: "error" });
    }
  };

  const handleDeleteUser = async (nip: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await window.api.deleteUser(nip);
        setMessage({ text: "User deleted successfully", type: "success" });
        onSuccess();
      } catch (error) {
        setMessage({ text: `Error deleting user: ${error}`, type: "error" });
      }
    }
  };

  return {
    userFormData,
    setUserFormData,
    editingUser,
    setEditingUser,
    message,
    setMessage,
    resetForm,
    handleEditUser,
    handleUserSubmit,
    handleDeleteUser,
    initialUserFormData,
  };
};
