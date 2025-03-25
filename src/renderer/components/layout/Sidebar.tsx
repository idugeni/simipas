import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaChartBar,
  FaUsers,
  FaSignOutAlt,
  FaUserPlus,
  FaBars,
  FaChevronLeft,
  FaList,
} from "react-icons/fa";
import logoPath from "../../../../public/logo.png";

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleExit = () => {
    window.api.exit();
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const menuItemClass = (isMenuActive: boolean) =>
    `flex items-center ${isCollapsed ? "justify-center" : "px-4"} py-3 text-sm transition-all duration-300 rounded-md backdrop-blur-sm ${
      isMenuActive
        ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium shadow-lg shadow-blue-500/30"
        : "text-gray-300 hover:bg-gray-700/50 hover:text-white hover:opacity-90"
    }`;

  return (
    <div
      className={`bg-gradient-to-b from-gray-800 to-gray-900 text-white ${
        isCollapsed ? "w-20" : "w-64"
      } flex-shrink-0 min-h-screen flex flex-col shadow-xl transition-all duration-300`}
    >
      <div className="p-4 flex items-center justify-between border-b border-gray-700/50 bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800">
        {!isCollapsed && (
          <div className="text-center flex-1">
            <img
              src={logoPath}
              alt="SIMIPAS Logo"
              className="w-12 h-12 mx-auto mb-2 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]"
            />
            <h1 className="text-xl font-bold tracking-wide bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(59,130,246,0.3)]">
              SIMIPAS
            </h1>
          </div>
        )}
        {isCollapsed && (
          <div className="flex-1 flex justify-center">
            <img
              src={logoPath}
              alt="SIMIPAS Logo"
              className="w-10 h-10 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]"
            />
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className="text-gray-300 hover:text-white p-1 rounded-full hover:bg-gray-700/50 transition-all duration-300"
        >
          {isCollapsed ? <FaBars /> : <FaChevronLeft />}
        </button>
      </div>
      <nav className="flex-1 mt-6 space-y-2 px-3 overflow-y-auto">
        <Link to="/" className={menuItemClass(isActive("/"))}>
          <span
            className={`flex items-center ${isCollapsed ? "justify-center" : ""}`}
          >
            <FaChartBar
              className={isCollapsed ? "" : "mr-3"}
              size={isCollapsed ? 20 : 18}
            />
            {!isCollapsed && "Dashboard"}
          </span>
        </Link>

        <div className="space-y-1">
          <Link
            to="/users"
            className={menuItemClass(
              location.pathname.startsWith("/users") &&
                !location.pathname.includes("/add"),
            )}
          >
            <span
              className={`flex items-center ${isCollapsed ? "justify-center" : ""}`}
            >
              <FaUsers
                className={isCollapsed ? "" : "mr-3"}
                size={isCollapsed ? 20 : 18}
              />
              {!isCollapsed && "Kelola User"}
            </span>
          </Link>
          <Link
            to="/users/add"
            className={menuItemClass(isActive("/users/add"))}
          >
            <span
              className={`flex items-center ${isCollapsed ? "justify-center" : ""}`}
            >
              <FaUserPlus
                className={isCollapsed ? "" : "mr-3"}
                size={isCollapsed ? 20 : 18}
              />
              {!isCollapsed && "Tambah User"}
            </span>
          </Link>
        </div>

        <Link to="/logs" className={menuItemClass(isActive("/logs"))}>
          <span
            className={`flex items-center ${isCollapsed ? "justify-center" : ""}`}
          >
            <FaList
              className={isCollapsed ? "" : "mr-3"}
              size={isCollapsed ? 20 : 18}
            />
            {!isCollapsed && "Log Aplikasi"}
          </span>
        </Link>
      </nav>
      <div
        className={`p-4 border-t border-gray-700/50 bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 ${isCollapsed ? "px-2" : ""}`}
      >
        <button
          onClick={handleExit}
          className={`flex items-center ${isCollapsed ? "justify-center" : "w-full px-4"} py-3 text-sm bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-md transition-all duration-300 shadow-lg shadow-red-500/20 hover:shadow-red-500/30`}
        >
          <FaSignOutAlt
            className={isCollapsed ? "" : "mr-3"}
            size={isCollapsed ? 20 : 18}
          />
          {!isCollapsed && "Keluar"}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
