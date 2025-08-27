import React, { useState } from "react";
import { FaLock } from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL;

const Settings = () => {
  const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "" });
  const [msg, setMsg] = useState("");
  const token = localStorage.getItem("adminToken");

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const res = await fetch(`${API_URL}/api/admin/password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(passwordForm),
      });
      const data = await res.json();
      setMsg(data.message);
      if (res.ok) setPasswordForm({ currentPassword: "", newPassword: "" });
    } catch {
      setMsg("Network error. Please try again.");
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-6">Settings</h2>
      <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl shadow-2xl max-w-2xl">
        <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-blue-200">
          <FaLock /> Change Password
        </h3>
        {msg && (
          <div
            className={`p-3 rounded-lg mb-6 text-center text-sm ${
              msg.includes("successfully")
                ? "bg-green-500/30 text-green-100"
                : "bg-red-500/30 text-red-100"
            }`}
          >
            {msg}
          </div>
        )}
        <form onSubmit={handleChangePassword} className="space-y-5">
          <input
            type="password"
            placeholder="Current Password"
            value={passwordForm.currentPassword}
            onChange={(e) =>
              setPasswordForm({ ...passwordForm, currentPassword: e.target.value })
            }
            className="w-full px-4 py-3 border border-white/20 rounded-lg bg-white/20 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="password"
            placeholder="New Password"
            value={passwordForm.newPassword}
            onChange={(e) =>
              setPasswordForm({ ...passwordForm, newPassword: e.target.value })
            }
            className="w-full px-4 py-3 border border-white/20 rounded-lg bg-white/20 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-black hover:from-black hover:to-blue-600 text-white py-3 rounded-lg font-medium shadow-lg transition"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
