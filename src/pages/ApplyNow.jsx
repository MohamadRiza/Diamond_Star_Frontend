// src/components/ApplyNow.jsx
import React, { useState, useEffect } from "react";
import CustomerAIChat from "@/components/CustomerAIChat";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const ApplyNow = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    age: "",
    email: "",
    mobile: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    isSriLankanResident: "",
    workExperience: "",
    gender: "",
    languages: "",
    isSriLankanPassportHolder: "",
    applyingFor: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [vacancyTypes, setVacancyTypes] = useState([]);
  const [isVerified, setIsVerified] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Define Turnstile success callback globally and load script
  useEffect(() => {
    // This function must be globally accessible
    window.onTurnstileSuccess = (token) => {
      console.log("✅ Turnstile verification successful. Token:", token);
      setIsVerified(true);
      setShowForm(true); // Unlock the form
    };

    // Load Turnstile script
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    script.async = true;
    script.defer = true;

    script.onload = () => {
      console.log(".cloudflare turnstile script loaded");
    };

    script.onerror = () => {
      console.error("Failed to load Turnstile script");
    };

    document.body.appendChild(script);

    // Cleanup
    return () => {
      document.body.removeChild(script);
      delete window.onTurnstileSuccess;
    };
  }, []);

  // Fetch job types only after verification
  useEffect(() => {
    if (!showForm) return;

    const loadVacancyTypes = async () => {
      try {
        const res = await fetch(`${API_URL}/api/applications/vacancies`);
        const data = await res.json();
        if (data.success) {
          setVacancyTypes(data.data);
        } else {
          console.error("Failed to load vacancies:", data.message);
        }
      } catch (err) {
        console.error("Network error loading vacancies:", err);
      }
    };

    loadVacancyTypes();
  }, [showForm]);

  // DOB → Age Calculation
  const handleDOBChange = (e) => {
    const dob = e.target.value;
    setFormData((prev) => ({ ...prev, dob }));
    if (dob) {
      const birthDate = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      setFormData((prev) => ({ ...prev, age }));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const required = [
      "fullName",
      "mobile",
      "addressLine1",
      "city",
      "applyingFor",
      "gender",
    ];

    for (let field of required) {
      if (!formData[field]) {
        alert(`Please fill in ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`);
        return;
      }
    }

    setLoading(true);
    setSuccess(false);

    try {
      const res = await fetch(`${API_URL}/api/applications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess(true);
        setFormData({
          fullName: "",
          dob: "",
          age: "",
          email: "",
          mobile: "",
          addressLine1: "",
          addressLine2: "",
          city: "",
          isSriLankanResident: "",
          workExperience: "",
          gender: "",
          languages: "",
          isSriLankanPassportHolder: "",
          applyingFor: "",
        });
      } else {
        const error = await res.json();
        alert(error.message || "Failed to submit application.");
      }
    } catch (err) {
      console.error("Submit error:", err);
      alert("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="relative bg-fixed py-20 bg-gray-50"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/32334135/pexels-photo-32334135.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 to-black/50"></div>

      <div className="relative max-w-4xl mx-auto px-6 lg:px-10">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-8 md:p-12 backdrop-blur-sm">
          {!showForm ? (
            // 🔐 Turnstile Gate: Only shown before verification
            <div className="text-center py-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Verify You're Not a Robot
              </h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Please complete the security check to access the job application form.
              </p>
              <div
                className="cf-turnstile mx-auto"
                data-sitekey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
                data-callback="onTurnstileSuccess"
                data-theme="light"
                data-action="apply_now_verification"
              ></div>
            </div>
          ) : success ? (
            // ✅ Success Message
            <div className="bg-green-100 text-green-800 p-6 rounded-lg text-center text-lg font-medium shadow-sm">
              ✅ Thank you! Your application has been submitted successfully.
            </div>
          ) : (
            // 📝 Application Form
            <>
              <h2 className="text-4xl font-extrabold text-blue-700 mb-3 text-center">
                Apply Now
              </h2>
              <p className="text-gray-600 mb-10 text-center text-lg">
                Join{" "}
                <span className="font-semibold text-gray-800">Diamond Star</span> by
                applying for the position that matches your skills.
              </p>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                    required
                  />
                </div>

                {/* DOB & Age */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleDOBChange}
                      className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Age
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      readOnly
                      className="w-full px-4 py-3 border rounded-lg bg-gray-100 text-gray-600"
                    />
                  </div>
                </div>

                {/* Email & Mobile */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Email (Optional)
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                      required
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Address Line 1 *
                  </label>
                  <input
                    type="text"
                    name="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Address Line 2 (Optional)
                  </label>
                  <input
                    type="text"
                    name="addressLine2"
                    value={formData.addressLine2}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                    required
                  />
                </div>

                {/* Dropdowns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Applying For *
                    </label>
                    <select
                      name="applyingFor"
                      value={formData.applyingFor}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                      required
                    >
                      <option value="">Select a job</option>
                      {vacancyTypes.map((type, i) => (
                        <option key={i} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Work Experience *
                    </label>
                    <select
                      name="workExperience"
                      value={formData.workExperience}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                      required
                    >
                      <option value="">Select</option>
                      <option>No Experience</option>
                      <option>Below 6 months</option>
                      <option>1 Year</option>
                      <option>2+ Years</option>
                    </select>
                  </div>
                </div>

                {/* Radios */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Resident of Sri Lanka? *
                    </label>
                    <div className="flex gap-6">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="isSriLankanResident"
                          value="true"
                          onChange={handleChange}
                        />{" "}
                        Yes
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="isSriLankanResident"
                          value="false"
                          onChange={handleChange}
                        />{" "}
                        No
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Sri Lankan Passport Holder? *
                    </label>
                    <div className="flex gap-6">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="isSriLankanPassportHolder"
                          value="true"
                          onChange={handleChange}
                        />{" "}
                        Yes
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="isSriLankanPassportHolder"
                          value="false"
                          onChange={handleChange}
                        />{" "}
                        No
                      </label>
                    </div>
                  </div>
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Gender *
                  </label>
                  <div className="flex flex-wrap gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        onChange={handleChange}
                      />{" "}
                      Male
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        onChange={handleChange}
                      />{" "}
                      Female
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="gender"
                        value="Prefer not to say"
                        onChange={handleChange}
                      />{" "}
                      Prefer not to say
                    </label>
                  </div>
                </div>

                {/* Languages */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Languages Spoken *
                  </label>
                  <input
                    type="text"
                    name="languages"
                    value={formData.languages}
                    onChange={handleChange}
                    placeholder="e.g., English, Tamil, Sinhala"
                    className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-70 text-white py-3 rounded-lg font-semibold shadow-md transition"
                >
                  {loading ? "Submitting..." : "Submit Application"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      <CustomerAIChat />
    </section>
  );
};

export default ApplyNow;