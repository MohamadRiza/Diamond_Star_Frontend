// src/components/admin/AdminVacancies.jsx
import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  createVacancy,
  fetchVacancies,
  updateVacancy,
  deleteVacancy,
} from "@/pages/adminpages/adminServices/api";
import {
  FaTrash,
  FaEdit,
  FaImage,
  FaCalendarAlt,
  FaSpinner,
  FaSave,
  FaPlus,
  FaSearch,
  FaRobot,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import countryList from "react-select-country-list";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const AdminVacancies = () => {
  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    country: "",
    salary: "",
    description: "",
    image: null,
  });
  const [editingId, setEditingId] = useState(null);
  const [preview, setPreview] = useState("");
  const [msg, setMsg] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const listRef = useRef(null);
  const navigate = useNavigate();

  // Country list
  const options = useMemo(() => countryList().getData(), []);

  // Fetch vacancies
  useEffect(() => {
    const loadVacancies = async () => {
      try {
        const data = await fetchVacancies();
        setVacancies(data.data);
      } catch (err) {
        setMsg(`❌ Failed to load vacancies: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    loadVacancies();
  }, []);

  // Clean up preview URL
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (preview) URL.revokeObjectURL(preview);
      setForm({ ...form, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const resetForm = () => {
    setForm({
      title: "",
      country: "",
      salary: "",
      description: "",
      image: null,
    });
    setPreview("");
    setEditingId(null);
    setMsg("");
  };

  // 🔁 AI Generate Description
  const generateDescriptionWithAI = async () => {
    if (!form.title || !form.country || !form.salary) {
      setMsg("❌ Please fill Job Title, Country, and Salary first.");
      return;
    }

    setFormLoading(true);
    setMsg("🤖 Generating professional description...");

    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`${API_URL}/api/ai/admin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: form.title,
          country: form.country,
          salary: form.salary,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setForm({ ...form, description: data.description });
        setMsg("✅ AI-generated description added!");
      } else {
        setMsg(`❌ AI Error: ${data.description || "Unknown error"}`);
      }
    } catch (err) {
      setMsg("❌ Network error. Failed to connect to AI.");
    } finally {
      setFormLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setMsg("");

    const token = localStorage.getItem("adminToken");
    if (!token) {
      setMsg("❌ Session expired. Please log in again.");
      localStorage.removeItem("adminToken");
      navigate("/admin-login");
      return;
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("country", form.country);
    formData.append("salary", form.salary);
    formData.append("description", form.description);
    if (form.image) formData.append("image", form.image);

    try {
      let res;
      if (editingId) {
        res = await fetch(`${API_URL}/api/vacancies/${editingId}`, {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });
      } else {
        res = await fetch(`${API_URL}/api/vacancies`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });
      }

      if (res.ok) {
        const data = await res.json();
        if (editingId) {
          setVacancies((prev) =>
            prev.map((v) => (v._id === editingId ? data.data : v))
          );
          setMsg("✅ Vacancy updated successfully!");
        } else {
          setVacancies((prev) => [data.data, ...prev]);
          setMsg("✅ Vacancy uploaded successfully!");
        }
        resetForm();
      } else {
        const error = await res.json();
        setMsg(`❌ ${error.message}`);
      }
    } catch (err) {
      setMsg(`❌ Network error: ${err.message}`);
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = (vacancy) => {
    setForm({
      title: vacancy.title,
      country: vacancy.country,
      salary: vacancy.salary,
      description: vacancy.description,
      image: null,
    });
    setPreview(vacancy.imageUrl);
    setEditingId(vacancy._id);
    setMsg("");
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "⚠️ Are you sure you want to delete this vacancy? This cannot be undone."
      )
    )
      return;
    try {
      await deleteVacancy(id);
      setVacancies((prev) => prev.filter((v) => v._id !== id));
      setMsg("🗑️ Vacancy deleted successfully.");
    } catch (err) {
      setMsg(`❌ Delete failed: ${err.message}`);
    }
  };

  // 🔍 Filter vacancies
  const filteredVacancies = vacancies.filter((v) =>
    [v.title, v.country, v.description].some((field) =>
      field.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <h2 className="text-3xl font-bold text-white mb-6">Manage Vacancies</h2>

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

      <div className="flex flex-col md:flex-row gap-8 flex-1 min-h-0">
        {/* Upload/Edit Form */}
        <div className="md:w-1/2 bg-white/10 backdrop-blur-sm p-6 rounded-2xl shadow-2xl flex flex-col">
          <h3 className="text-xl font-semibold mb-5 text-blue-200 flex items-center gap-2">
            {editingId ? <FaEdit /> : <FaPlus />}{" "}
            {editingId ? "Edit Vacancy" : "Upload New Vacancy"}
          </h3>

          <form
            onSubmit={handleSubmit}
            className="space-y-4 flex-1 flex flex-col"
          >
            <input
              type="text"
              placeholder="Job Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="px-4 py-3 bg-white/20 border border-white/30 rounded-lg placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />

            {/* Country Dropdown */}
            <Select
              options={options}
              value={
                form.country ? { value: form.country, label: form.country } : null
              }
              onChange={(val) => setForm({ ...form, country: val.label })}
              placeholder="Search & select a country..."
              isSearchable
              className="text-black"
            />

            <input
              type="text"
              placeholder="Salary"
              value={form.salary}
              onChange={(e) => setForm({ ...form, salary: e.target.value })}
              className="px-4 py-3 bg-white/20 border border-white/30 rounded-lg placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <textarea
              placeholder="Job Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              rows="3"
              className="px-4 py-3 bg-white/20 border border-white/30 rounded-lg placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />

            {/* AI Generate Button */}
            <button
              type="button"
              onClick={generateDescriptionWithAI}
              disabled={
                formLoading || !form.title || !form.country || !form.salary
              }
              className="w-full mt-2 text-sm bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:opacity-70 text-white py-2 rounded-lg transition flex items-center justify-center gap-1"
            >
              <FaRobot size={14} /> Generate with AI
            </button>

            <div>
              <label
                htmlFor="vacancyImage"
                className="block text-sm font-medium mb-1 text-white"
              >
                Image
              </label>
              <input
                id="vacancyImage"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg cursor-pointer"
              />
            </div>
            {preview && (
              <div className="mt-3">
                <img
                  src={preview}
                  alt="Preview"
                  className="h-36 object-cover rounded-lg"
                />
              </div>
            )}

            {/* Submit & Cancel */}
            <div className="flex gap-3 mt-auto">
              <button
                type="submit"
                disabled={formLoading}
                className="flex-1 bg-gradient-to-r from-black to-blue-600 hover:from-blue-600 hover:to-black disabled:opacity-70 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 cursor-pointer"
              >
                {formLoading ? (
                  <>
                    <FaSpinner className="animate-spin" /> Saving...
                  </>
                ) : (
                  <>
                    <FaSave /> {editingId ? "Update" : "Upload"}
                  </>
                )}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-5 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Vacancies List */}
        <div className="md:w-1/2 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-white flex items-center gap-2">
              <FaImage /> Current Vacancies ({filteredVacancies.length})
            </h3>
          </div>

          {/* 🔍 Search Bar */}
          <div className="mb-4 relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title, country, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
            />
          </div>

          <div
            ref={listRef}
            className="flex-1 bg-white/10 backdrop-blur-sm p-4 rounded-2xl shadow-2xl overflow-y-auto space-y-4"
            style={{ maxHeight: "calc(100vh - 200px)" }}
          >
            {loading ? (
              <div className="flex items-center justify-center text-gray-300">
                <FaSpinner className="animate-spin mr-2" /> Loading vacancies...
              </div>
            ) : filteredVacancies.length === 0 ? (
              <p className="text-gray-400 text-center py-6">
                {searchTerm
                  ? "No matching vacancies found."
                  : "No vacancies uploaded yet."}
              </p>
            ) : (
              filteredVacancies.map((v) => (
                <div
                  key={v._id}
                  className="flex gap-4 p-4 bg-white/5 border border-white/20 rounded-lg hover:bg-white/10 transition"
                >
                  <img
                    src={v.imageUrl}
                    alt={v.title}
                    className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-white truncate">
                      {v.title}
                    </h4>
                    <p className="text-green-300">
                      {v.country} • {v.salary}
                    </p>
                    <p className="text-gray-300 text-sm line-clamp-2">
                      {v.description}
                    </p>
                    <p className="text-xs text-white mt-1 flex items-center gap-1">
                      <FaCalendarAlt />
                      {new Date(v.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 ml-2">
                    <button
                      onClick={() => handleEdit(v)}
                      className="text-blue-400 hover:text-blue-300 p-1"
                      aria-label="Edit"
                    >
                      <FaEdit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(v._id)}
                      className="text-red-400 hover:text-red-300 p-1"
                      aria-label="Delete"
                    >
                      <FaTrash size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminVacancies;
