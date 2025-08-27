// src/pages/VacancyDetailPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaDollarSign,
  FaCalendarAlt,
  FaArrowLeft,
  FaClipboardList,
  FaTimes,
  FaInstagram,
  FaFacebook,
  FaLinkedin,
} from "react-icons/fa";
import CustomerAIChat from "@/components/CustomerAIChat";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const VacancyDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vacancy, setVacancy] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageOpen, setImageOpen] = useState(false); // For modal image preview

  useEffect(() => {
    const fetchVacancy = async () => {
      try {
        const res = await fetch(`${API_URL}/api/vacancies/${id}`);
        if (res.ok) {
          const data = await res.json();
          setVacancy(data.data);

          // Fetch all vacancies for related suggestions
          const allRes = await fetch(`${API_URL}/api/vacancies`);
          if (allRes.ok) {
            const allData = await allRes.json();
            const filtered = allData.data.filter((v) => v._id !== id);
            findRelated(filtered, data.data);
          }
        } else {
          alert("Vacancy not found");
          navigate("/vacancies");
        }
      } catch (err) {
        alert("Network error. Please try again.");
        navigate("/vacancies");
      } finally {
        setLoading(false);
      }
    };
    fetchVacancy();
  }, [id, navigate]);

  // Find related vacancies by country or role
  const findRelated = (allVacancies, current) => {
    const byCountry = allVacancies
      .filter((v) => v.country === current.country)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 3);

    const byRole = allVacancies
      .filter(
        (v) =>
          v.title.toLowerCase().includes(current.title.toLowerCase().split(" ")[0]) &&
          !byCountry.some((r) => r._id === v._id)
      )
      .slice(0, 3 - byCountry.length);

    setRelated([...byCountry, ...byRole]);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  if (!vacancy) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-gray-500">Vacancy not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition font-medium"
          >
            <FaArrowLeft /> Back to Vacancies
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <span>Home</span> / <span>Vacancies</span> / <span className="text-blue-600">{vacancy.title}</span>
        </nav>

        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-10">
          {/* Image */}
          <div
            className="h-64 md:h-80 overflow-hidden bg-gray-100 cursor-pointer"
            onClick={() => setImageOpen(true)}
          >
            <img
              src={vacancy.imageUrl}
              alt={vacancy.title}
              className="w-full h-full object-cover hover:scale-105 transition duration-500"
            />
          </div>

          {/* Image Modal */}
          {imageOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
              <div className="relative w-11/12 md:w-4/5 lg:w-3/5 max-h-[80vh]">
                <button
                  className="absolute top-2 right-2 text-white text-3xl bg-red-600 rounded-lg opacity-60 hover:opacity-100 cursor-pointer"
                  onClick={() => setImageOpen(false)}
                >
                  <FaTimes />
                </button>
                <img
                  src={vacancy.imageUrl}
                  alt={vacancy.title}
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
            </div>
          )}

          {/* Content */}
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{vacancy.title}</h1>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-6 mb-6 text-gray-600 border-b pb-4">
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-blue-500" />
                <span>{vacancy.country}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaDollarSign className="text-blue-500" />
                <span>{vacancy.salary}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-gray-500" />
                <span>
                  Posted on:{" "}
                  {new Date(vacancy.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="prose max-w-none text-gray-700 leading-relaxed">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Job Description</h3>
              <p className="whitespace-pre-line">{vacancy.description}</p>
            </div>

            {/* Social Media & Apply Info */}
            <div className="mt-10 border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Connect With Us</h3>
              <div className="flex gap-4 mb-6">
                <a href="https://instagram.com" target="_blank" rel="noreferrer">
                  <FaInstagram className="text-pink-600 text-3xl hover:scale-110 transition" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer">
                  <FaFacebook className="text-blue-600 text-3xl hover:scale-110 transition" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                  <FaLinkedin className="text-blue-700 text-3xl hover:scale-110 transition" />
                </a>
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mb-3">How to Apply</h3>
              <ul className="text-gray-700 space-y-2">
                <li>Email your updated CV to: <span className="font-medium text-blue-600 hover:text-blue-700"><a href="mailto:diamondstar966@gmail.com">diamondstar966@gmail.com</a></span></li>
                <li>Call us: <span className="font-medium"><a href="tel:0727000203" className="hover:text-blue-600">072 700 0203</a> / <a href="tel:0779000203">077 900 0203</a></span></li>
                <li>Or visit our office directly</li>
              </ul>
            </div>

            {/* Apply Button */}
            <div className="mt-10">
              <button
                onClick={() => navigate("/apply")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium shadow-md transition transform hover:scale-105 cursor-pointer"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>

        {/* Related Vacancies */}
        {related.length > 0 && (
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <FaClipboardList /> Related Opportunities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((v) => (
                <div
                  key={v._id}
                  className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer transform hover:-translate-y-1"
                  onClick={() => navigate(`/vacancy/${v._id}`)}
                >
                  <div className="h-36 bg-gray-100 overflow-hidden">
                    <img
                      src={v.imageUrl}
                      alt={v.title}
                      className="w-full h-full object-cover hover:scale-105 transition duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 truncate">{v.title}</h3>
                    <p className="text-sm text-blue-600 mt-1">{v.country}</p>
                    <p className="text-sm text-gray-600 mt-1">{v.salary}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* AI Chat Widget */}
      <CustomerAIChat />
    </div>
  );
};

export default VacancyDetailPage;
