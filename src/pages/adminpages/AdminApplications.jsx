// src/components/admin/AdminApplications.jsx
import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaBriefcase,
  FaCalendarAlt,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaIdCard,
  FaVenusMars,
  FaLanguage,
  FaClock,
  FaSearch,
  FaSpinner,
  FaTrash,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const AdminApplications = () => {
  const [applications, setApplications] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("adminToken");
  if (!token) {
    navigate("/admin-login");
    return null;
  }

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await fetch(`${API_URL}/api/applications`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          const data = await res.json();
          let appList = [];

          if (data.data && Array.isArray(data.data)) {
            appList = data.data;
          } else if (Array.isArray(data)) {
            appList = data;
          } else if (data.applications && Array.isArray(data.applications)) {
            appList = data.applications;
          } else {
            throw new Error("Invalid data format received");
          }

          setApplications(appList);
          setFiltered(appList);
        } else if (res.status === 401) {
          setMsg("❌ Session expired. Please log in again.");
          localStorage.removeItem("adminToken");
          navigate("/admin-login");
        } else {
          const error = await res.json().catch(() => ({}));
          setMsg(`❌ ${error.message || "Failed to load applications."}`);
        }
      } catch (err) {
        setMsg(`❌ Network error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [token, navigate]);

  // Search filter
  useEffect(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) {
      setFiltered(applications);
    } else {
      setFiltered(
        applications.filter((app) =>
          [app.fullName, app.email, app.mobile, app.applyingFor, app.city]
            .filter(Boolean)
            .some((field) => field.toLowerCase().includes(term))
        )
      );
    }
  }, [searchTerm, applications]);

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "Invalid Date";
    }
  };

  const formatDateTime = (dateString) => {
    try {
      return new Date(dateString).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "Invalid Date";
    }
  };

  // ✅ Delete Application
  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "⚠️ Are you sure you want to delete this application? This cannot be undone."
      )
    )
      return;

    try {
      const res = await fetch(`${API_URL}/api/applications/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setApplications((prev) => prev.filter((app) => app._id !== id));
        setFiltered((prev) => prev.filter((app) => app._id !== id));
        setMsg("🗑️ Application deleted successfully.");
      } else {
        const error = await res.json();
        setMsg(`❌ Delete failed: ${error.message || "Unknown error"}`);
      }
    } catch (err) {
      setMsg(`❌ Network error: ${err.message}`);
    }
  };

  return (
    <div className="flex flex-col h-screen p-4">
      {/* Header */}
      <h2 className="text-3xl font-bold text-white mb-6">Job Applications</h2>

      {/* Status Message */}
      {msg && (
        <div
          className={`p-3 mb-6 text-sm rounded-lg border-l-4 ${
            msg.includes("❌")
              ? "bg-red-500/20 text-red-100 border-red-500"
              : "bg-green-500/20 text-green-100 border-green-500"
          }`}
        >
          {msg}
        </div>
      )}

      {/* Search Bar */}
      <div className="relative mb-6">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name, email, phone, job, or city..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Scrollable Applications Area */}
      <div
        className="flex-1 overflow-y-auto 
                      scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-900/20 
                      rounded-lg bg-white/5 p-2"
      >
        {loading ? (
          <div className="flex items-center justify-center text-gray-300 py-10">
            <FaSpinner className="animate-spin mr-3" /> Loading applications...
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-gray-400 text-center py-10">
            {searchTerm
              ? "No matching applications found."
              : "No applications received yet."}
          </p>
        ) : (
          <div className="space-y-4 pr-2">
            {filtered.map((app) => (
              <div
                key={app._id}
                className="group bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 hover:bg-white/15 transition duration-300 shadow-sm"
              >
                {/* Header: Name & Job */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-5 border-b border-white/10 pb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <FaUser /> {app.fullName}
                    </h3>
                    {app.email && (
                      <p className="text-gray-300 text-sm mt-1 flex items-center gap-1">
                        <FaEnvelope /> {app.email}
                      </p>
                    )}
                  </div>
                  <span className="inline-flex items-center gap-2 text-sm text-blue-300 bg-blue-500/20 px-3 py-1 rounded-full font-medium">
                    <FaBriefcase /> {app.applyingFor}
                  </span>
                </div>

                {/* Personal Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                  <div className="flex items-center gap-2 text-gray-300">
                    <FaCalendarAlt /> <strong>DOB:</strong> {formatDate(app.dob)} •{" "}
                    <strong>Age:</strong> {app.age}
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <FaPhone /> <strong>Mobile:</strong> {app.mobile}
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <FaMapMarkerAlt /> <strong>Address:</strong> {app.addressLine1},{" "}
                    {app.city}
                    {app.addressLine2 && ` (${app.addressLine2})`}
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <FaVenusMars /> <strong>Gender:</strong> {app.gender}
                  </div>
                </div>

                {/* Additional Info */}
                <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-gray-200">
                  <div className="flex items-center gap-1">
                    <FaIdCard /> <strong>Resident of Sri Lanka?</strong>{" "}
                    {app.isSriLankanResident === true ||
                    app.isSriLankanResident === "true"
                      ? "Yes"
                      : "No"}
                  </div>
                  <div className="flex items-center gap-1">
                    <FaIdCard /> <strong>Sri Lankan Passport Holder:</strong>{" "}
                    {app.isSriLankanPassportHolder === true ||
                    app.isSriLankanPassportHolder === "true"
                      ? "Yes"
                      : "No"}
                  </div>
                  <div className="flex items-center gap-1">
                    <FaBriefcase /> <strong>Experience:</strong> {app.workExperience}
                  </div>
                  <div className="md:col-span-3 flex items-center gap-1">
                    <FaLanguage /> <strong>Languages:</strong> {app.languages}
                  </div>
                </div>

                {/* Footer: Timestamp + Delete */}
                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                  <p className="text-xs text-gray-100 flex items-center gap-1">
                    <FaClock /> Applied on: {formatDateTime(app.createdAt)}
                  </p>

                  {/* ✅ Trash Button at bottom */}
                  <button
                    onClick={() => handleDelete(app._id)}
                    className="text-red-400 hover:text-red-300 bg-white/10 hover:bg-white/20 rounded-full p-2 transition"
                    aria-label="Delete application"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminApplications;
