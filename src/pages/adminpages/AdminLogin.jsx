import React, { useState } from "react";
import { FaInfoCircle, FaShieldAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const AdminLogin = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("adminToken", data.token);
        navigate("/admin");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Network error");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-fixed px-4"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/912050/pexels-photo-912050.jpeg')",
      }}
    >
      <div className="bg-white/20 backdrop-blur-lg border border-white/30 p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-4xl font-extrabold text-center text-white mb-8 tracking-wide drop-shadow-md">
          Admin Login
        </h2>

        {error && (
          <div className="bg-red-500/80 text-white p-3 rounded-lg text-center mb-4 font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Username
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/70 border border-white/30 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter username"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/70 border border-white/30 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 transition-all text-white py-3 rounded-lg font-semibold shadow-lg cursor-pointer"
          >
            Login
          </button>

          <div className="text-sm text-center text-white/90 mt-6 bg-red-600/70 px-5 py-3 rounded-lg font-bold backdrop-blur-sm border border-white/20">
            <FaShieldAlt className="inline-block mr-2" />
            Do not try to login. This page is dedicated only for admin.
          </div>

          <div className="text-sm text-center text-white/90 mt-6 bg-green-600/70 px-5 py-3 rounded-lg font-bold backdrop-blur-sm border border-white/20">
            <FaInfoCircle className="inline-block mr-2" />
            Do not Login With Mobile Devices <b className="">Use Desktop Instead...</b>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
