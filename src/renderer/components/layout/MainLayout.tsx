import React from "react";
import Sidebar from "./Sidebar";
import { FaBell, FaUser, FaQuestion, FaCog } from "react-icons/fa";
import { useLocation } from "react-router-dom";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();
  // Using notifications directly as a constant since we're not updating it in this component
  const notifications = 3;

  // Get the current page title based on the route
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === "/") return "Dashboard";
    if (path.startsWith("/users/add")) return "Tambah User";
    if (path.startsWith("/users")) return "Kelola User";
    if (path === "/logs") return "Log Aplikasi";
    return "SIMIPAS";
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 shadow-sm z-10">
          <div className="flex justify-between items-center px-6 py-3">
            <h1 className="text-xl font-semibold text-gray-800">
              {getPageTitle()}
            </h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="text-gray-500 hover:text-gray-700 transition-colors duration-200">
                  <FaBell className="text-xl" />
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {notifications}
                    </span>
                  )}
                </button>
              </div>
              <button className="text-gray-500 hover:text-gray-700 transition-colors duration-200">
                <FaQuestion className="text-xl" />
              </button>
              <button className="text-gray-500 hover:text-gray-700 transition-colors duration-200">
                <FaCog className="text-xl" />
              </button>
              <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-gray-200">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                  <FaUser />
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-700">Admin</p>
                  <p className="text-gray-500 text-xs">Administrator</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-3 px-6 text-center text-sm text-gray-600">
          <div className="flex justify-between items-center">
            <div>
              <p> 2025 SIMIPAS - Sistem Informasi Manajemen Pegawai</p>
            </div>
            <div>
              <p>
                Dibuat oleh <span className="font-medium">Eliyanto Sarage</span>{" "}
                | v1.0.0
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default MainLayout;
