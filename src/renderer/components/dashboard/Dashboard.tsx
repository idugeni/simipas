import React from "react";
import { FaInfoCircle, FaCode } from "react-icons/fa";
import logoPath from "../../../../public/logo.png";

const Dashboard: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto">
      {/* App Info Card */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="p-8 flex flex-col md:flex-row items-center">
          <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-8">
            <img
              src={logoPath}
              alt="SIMIPAS Logo"
              className="w-32 h-32 object-contain drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">SIMIPAS</h1>
            <h2 className="text-xl text-gray-600 mb-4">
              Sistem Informasi Manajemen Pegawai
            </h2>
            <p className="text-gray-600 mb-4">
              Aplikasi manajemen pegawai yang dirancang untuk memudahkan
              pengelolaan data pegawai, aktivitas, dan jadwal kerja secara
              efisien dan terintegrasi.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                Electron
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                React
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                TypeScript
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                TailwindCSS
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Version and Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
              <FaInfoCircle size={20} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              Versi Aplikasi
            </h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Versi</span>
              <span className="font-medium">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tanggal Rilis</span>
              <span className="font-medium">25 Maret 2025</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                Stabil
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
              <FaCode size={20} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Teknologi</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Frontend</span>
              <span className="font-medium">React + TypeScript</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">UI Framework</span>
              <span className="font-medium">TailwindCSS</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Platform</span>
              <span className="font-medium">Electron</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="text-center text-gray-500 text-sm mb-8">
        <p>SIMIPAS 2025 | Dibuat oleh Eliyanto Sarage</p>
      </div>
    </div>
  );
};

export default Dashboard;
