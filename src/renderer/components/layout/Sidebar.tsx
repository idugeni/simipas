import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaChartBar,
  FaUsers,
  FaSignOutAlt,
  FaUserPlus,
  FaCalendarPlus,
  FaCalendarCheck,
} from "react-icons/fa";
import logoPath from "../../../../public/logo.png";

const Sidebar: React.FC = () => {
  const location = useLocation();

  const handleExit = () => {
    window.api.exit();
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const menuItemClass = (isMenuActive: boolean) =>
    `flex items-center px-4 py-3 text-sm transition-all duration-300 rounded-md backdrop-blur-sm ${
      isMenuActive
        ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium shadow-lg shadow-blue-500/30"
        : "text-gray-300 hover:bg-gray-700/50 hover:text-white hover:opacity-90"
    }`;

  return (
    <div className="bg-gradient-to-b from-gray-800 to-gray-900 text-white w-64 flex-shrink-0 min-h-screen flex flex-col shadow-xl">
      <div className="p-6 flex items-center justify-center border-b border-gray-700/50 bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800">
        <div className="text-center">
          <img
            src={logoPath}
            alt="SIMIPAS Logo"
            className="w-16 h-16 mx-auto mb-2 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]"
          />
          <h1 className="text-2xl font-bold tracking-wide bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(59,130,246,0.3)]">
            SIMIPAS
          </h1>
        </div>
      </div>
      <nav className="flex-1 mt-6 space-y-2 px-3 overflow-y-auto">
        <Link to="/" className={menuItemClass(isActive("/"))}>
          <span className="flex items-center">
            <FaChartBar className="mr-3 text-xl" />
            Dashboard
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
            <span className="flex items-center">
              <FaUsers className="mr-3 text-xl" />
              Kelola User
            </span>
          </Link>
          <Link
            to="/users/add"
            className={menuItemClass(isActive("/users/add"))}
          >
            <span className="flex items-center">
              <FaUserPlus className="mr-3 text-xl" />
              Tambah User
            </span>
          </Link>
        </div>

        <div className="space-y-1">
          <Link
            to="/shifts/create"
            className={menuItemClass(isActive("/shifts/create"))}
          >
            <span className="flex items-center">
              <FaCalendarPlus className="mr-3 text-xl" />
              Buat Jadwal
            </span>
          </Link>
          <Link
            to="/shifts/monitor"
            className={menuItemClass(isActive("/shifts/monitor"))}
          >
            <span className="flex items-center">
              <FaCalendarCheck className="mr-3 text-xl" />
              Monitor Shift
            </span>
          </Link>
        </div>
      </nav>
      <div className="p-4 border-t border-gray-700/50 bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800">
        <button
          onClick={handleExit}
          className="flex items-center w-full px-4 py-3 text-sm bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-md transition-all duration-300 shadow-lg shadow-red-500/20 hover:shadow-red-500/30"
        >
          <FaSignOutAlt className="mr-3 text-xl" />
          Keluar
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
