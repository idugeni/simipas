import React, { useState } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./components/dashboard/Dashboard";
import UserListPage from "./components/users/UserListPage";
import AddUserPage from "./components/users/AddUserPage";
import ShiftManagement from "./components/activities/ShiftManagement";
import ActivitySettings from "./components/activities/ActivitySettings";
import LogViewer from "./LogViewer";
import "./App.css";
import { API } from "../lib/api";
import { User } from "../lib/types";
import EditUserPage from "./components/users/EditUserPage";

declare global {
  interface Window {
    api: API;
  }
}

const ActivitySettingsWrapper = () => {
  const navigate = useNavigate();
  const [selectedUser] = useState<User>({
    nip: "123",
    fullName: "Default User",
    password: "",
    userType: "STAFF ADMINISTRASI",
    skpkgOption: 1,
    startTime: "08:00",
    endTime: "16:00",
    description: "",
    quantity: 1,
  });

  return <ActivitySettings user={selectedUser} onBack={() => navigate("/")} />;
};

const App: React.FC = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/activities" element={<ActivitySettingsWrapper />} />
          <Route path="/shifts" element={<ShiftManagement />} />
          <Route path="/users" element={<UserListPage />} />
          <Route path="/users/add" element={<AddUserPage />} />
          <Route path="/users/:nip/edit" element={<EditUserPage />} />
          <Route path="/logs" element={<LogViewer />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default App;
