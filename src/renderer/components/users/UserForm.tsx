import React from "react";
import { User } from "../../../lib/types";
import BasicUserForm, { BasicUser } from "./BasicUserForm";
import DetailUserForm from "./DetailUserForm";

interface UserFormProps {
  onSubmit: (userData: User) => void;
  initialData?: User;
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit, initialData }) => {
  const handleBasicUserSubmit = (basicUserData: BasicUser) => {
    const fullUserData: User = {
      ...basicUserData,
      id: initialData?.id,
      skpkgOption: initialData?.skpkgOption || 1,
      startTime: initialData?.startTime || "07:30",
      endTime: initialData?.endTime || "14:30",
      description: initialData?.description || "",
      quantity: initialData?.quantity || 1,
    };
    onSubmit(fullUserData);
  };

  if (!initialData || !initialData.id) {
    return (
      <BasicUserForm
        onSubmit={handleBasicUserSubmit}
        initialData={initialData}
      />
    );
  }

  return <DetailUserForm onSubmit={onSubmit} initialData={initialData} />;
};

export default UserForm;
