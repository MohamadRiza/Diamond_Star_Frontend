// src/pages/VacanciesPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaMapMarkerAlt, FaDollarSign, FaCalendarAlt } from "react-icons/fa";
import CustomerAIChat from "@/components/CustomerAIChat";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const VacanciesPage = () => {
  const [vacancies, setVacancies] = useState([]);
  const [filteredVacancies, setFilteredVacancies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  const navigate = useNavigate();

  // Fetch vacancies from backend
  useEffect(() => {
    const loadVacancies = async () => {
      try {
        const res = await fetch(`${API_URL}/api/vacancies`);
        if (res.ok) {
          const data = await res.json();
          setVacancies(data.data);
          setFilteredVacancies(data.data);
        } else {
          console.error("Failed to load vacancies");
        }
      } catch (err) {
        console.error("Network error:", err);
      } finally {
        setLoading(false);
      }
    };
    loadVacancies();
  }, []);

  // Get unique countries for filter dropdown
  const countries = [...new Set(vacancies.map((v) => v.country))].sort();

  // Apply filters and search
  useEffect(() => {
    let result = vacancies;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter((v) =>
        [v.title, v.description, v.country].some((field) =>
          field.toLowerCase().includes(term)
        )
      );
    }

    if (selectedCountry) {
      result = result.filter((v) => v.country === selectedCountry);
    }

    setFilteredVacancies(result);
  }, [searchTerm, selectedCountry, vacancies]);

  return (
    <section className="relative py-20 min-h-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/358220/pexels-photo-358220.jpeg')",
        }}
      ></div>
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/50 backdrop-blur-none"></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Title Section */}
        <div className="text-center mb-16 bg-white/30 rounded-2xl shadow-lg p-10 backdrop-blur-xl">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Available <span className="text-blue-600">Job Vacancies</span>
          </h2>
          <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
            Explore skilled job opportunities abroad. Find the perfect role for your future.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="bg-white/50 backdrop-blur-md p-6 rounded-2xl shadow-xl mb-12 space-y-4 md:flex md:space-y-0 md:space-x-6 hover:bg-gradient-to-b from-white to-gray-300 transition">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by job, country, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Country Filter */}
          <div className="md:w-60">
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Countries</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Vacancies List */}
        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading vacancies...</p>
          </div>
        ) : filteredVacancies.length === 0 ? (
          <div className="text-center py-20 bg-white/80 rounded-2xl shadow-md">
            <p className="text-xl text-gray-500">
              {searchTerm || selectedCountry
                ? "No matching vacancies found."
                : "No vacancies available at the moment."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredVacancies.map((v) => (
              <div
                key={v._id}
                className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2 cursor-pointer"
                onClick={() => navigate(`/vacancy/${v._id}`)}
              >
                {/* Image */}
                <div className="h-52 overflow-hidden">
                  <img
                    src={v.imageUrl}
                    alt={v.title}
                    className="w-full h-full object-cover transform hover:scale-110 transition duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 truncate">{v.title}</h3>

                  <div className="flex items-center gap-2 text-blue-600 mt-3">
                    <FaMapMarkerAlt /> <span className="text-sm">{v.country}</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-600 mt-1">
                    <FaDollarSign /> <span className="text-sm">{v.salary}</span>
                  </div>

                  <p className="text-gray-600 text-sm mt-3 line-clamp-3">{v.description}</p>

                  <div className="mt-4 text-xs text-gray-500 flex items-center gap-1">
                    <FaCalendarAlt />
                    {new Date(v.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Show total count */}
        <div className="text-center mt-12 bg-white/60 rounded-xl py-4 shadow-md">
          <p className="text-gray-600">
            Showing <strong>{filteredVacancies.length}</strong> vacancy
            {filteredVacancies.length !== 1 ? "ies" : "y"}{" "}
            {selectedCountry && `in ${selectedCountry}`}
          </p>
        </div>
      </div>

      {/* AI Chat Widget */}
      <CustomerAIChat />
    </section>
  );
};

export default VacanciesPage;