import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../../lib/types";
import {
  FaSpinner,
  FaIdCard,
  FaUser,
  FaLock,
  FaShieldAlt,
  FaUsers,
  FaInfoCircle,
  FaCheck,
  FaChevronDown,
} from "react-icons/fa";

const AddUserPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nip: "",
    fullName: "",
    userType: "PENGAMANAN",
    password: "",
  });

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    [],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      setError(null);

      try {
        await window.api.createUser(formData as User);
        navigate("/users");
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        setError("Gagal membuat user: " + errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [formData, navigate],
  );

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full">
        <div className="flex items-center justify-center mb-4">
          <FaUsers className="w-6 h-6 text-indigo-600 mr-2" />
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent flex items-center gap-3">
            Tambah User
          </h1>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded flex items-center gap-2">
            <FaInfoCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Field NIP */}
          <div>
            <label
              htmlFor="nip"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              NIP <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center border border-gray-300 rounded overflow-hidden">
              <span className="px-2 text-gray-400">
                <FaIdCard className="w-4 h-4" />
              </span>
              <input
                type="text"
                id="nip"
                name="nip"
                required
                value={formData.nip}
                onChange={handleChange}
                placeholder="Masukkan NIP"
                className="w-full py-1 px-2 focus:outline-none"
              />
            </div>
          </div>

          {/* Field Nama Lengkap */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nama Lengkap <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center border border-gray-300 rounded overflow-hidden">
              <span className="px-2 text-gray-400">
                <FaUser className="w-4 h-4" />
              </span>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Masukkan nama lengkap"
                className="w-full py-1 px-2 focus:outline-none"
              />
            </div>
          </div>

          {/* Field Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center border border-gray-300 rounded overflow-hidden">
              <span className="px-2 text-gray-400">
                <FaLock className="w-4 h-4" />
              </span>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Masukkan password"
                className="w-full py-1 px-2 focus:outline-none"
              />
            </div>
          </div>

          {/* Field Tipe User */}
          <div>
            <label
              htmlFor="userType"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Tipe User <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center border border-gray-300 rounded overflow-hidden">
              <span className="px-2 text-gray-400">
                <FaShieldAlt className="w-4 h-4" />
              </span>
              <select
                id="userType"
                name="userType"
                required
                value={formData.userType}
                onChange={handleChange}
                className="w-full py-1 px-2 focus:outline-none bg-white"
              >
                <option value="PENGAMANAN">Pengamanan</option>
                <option value="STAFF ADMINISTRASI">Staff Administrasi</option>
              </select>
              <span className="px-2 text-gray-400">
                <FaChevronDown className="w-4 h-4" />
              </span>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded shadow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <FaSpinner className="w-4 h-4 animate-spin" />
                  <span>Menyimpan...</span>
                </>
              ) : (
                <>
                  <FaCheck className="w-4 h-4" />
                  <span>Simpan</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserPage;
