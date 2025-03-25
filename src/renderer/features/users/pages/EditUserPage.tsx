import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { User } from "../../../../lib/types";

const EditUserPage: React.FC = () => {
  const navigate = useNavigate();
  const { nip } = useParams<{ nip: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<User>>({
    nip: "",
    fullName: "",
    userType: "PENGAMANAN",
    password: "",
  });

  useEffect(() => {
    loadUser();
  }, [nip]);

  const loadUser = async () => {
    if (!nip) return;
    setIsLoading(true);
    setError(null);

    try {
      const user = await window.api.getUser(nip);
      setFormData({
        ...user,
        password: "", // Reset password field for security
      });
    } catch (error: unknown) {
      setError(
        "Error loading user: " +
          (error instanceof Error ? error.message : String(error)),
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nip) return;

    setIsLoading(true);
    setError(null);

    try {
      await window.api.updateUser({
        ...formData,
        nip: nip, // Ensure we use the original NIP
      } as User);
      navigate("/users");
    } catch (error: unknown) {
      setError(
        "Error updating user: " +
          (error instanceof Error ? error.message : String(error)),
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-blue-600 h-10 w-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <header className="mb-6">
          <h1 className="text-3xl font-semibold text-gray-800 text-center">
            Edit User
          </h1>
        </header>
        <div className="bg-white shadow-lg rounded-lg p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="nip"
                className="block text-sm font-medium text-gray-700"
              >
                NIP
              </label>
              <input
                type="text"
                id="nip"
                name="nip"
                disabled
                value={formData.nip}
                className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm focus:border-blue-500 focus:ring-blue-500 cursor-not-allowed"
              />
            </div>

            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="userType"
                className="block text-sm font-medium text-gray-700"
              >
                User Type
              </label>
              <select
                id="userType"
                name="userType"
                required
                value={formData.userType}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="PENGAMANAN">PENGAMANAN</option>
                <option value="STAFF ADMINISTRASI">STAFF ADMINISTRASI</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password (Leave blank to keep current password)
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {isLoading ? "Updating..." : "Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUserPage;
