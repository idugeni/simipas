import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./components/dashboard/Dashboard";
import LogViewer from "./LogViewer";
import "./App.css";
import { API } from "../lib/api";
import UserManagementPage from "./pages/users/UserManagementPage";
import ShiftManagementPage from "./features/activities/pages/ShiftManagementPage";

declare global {
  interface Window {
    api: API;
  }
}

const App: React.FC = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/shifts" element={<ShiftManagementPage />} />
          <Route path="/users/*" element={<UserManagementPage />} />
          <Route path="/logs" element={<LogViewer />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default App;
