// src/components/Contact.jsx
import CustomerAIChat from "@/components/CustomerAIChat";
import React, { useState, useEffect, useRef } from "react";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMobileAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [showPage, setShowPage] = useState(false); // Controls full page access
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [turnstileError, setTurnstileError] = useState(false);

  const containerRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Load Turnstile script
  useEffect(() => {
    if (window.turnstile) {
      setScriptLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    script.async = true;
    script.defer = true;

    script.onload = () => {
      console.log("Turnstile script loaded");
      setScriptLoaded(true);
    };

    script.onerror = () => {
      console.error("Failed to load Turnstile script");
      setTurnstileError(true);
    };

    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // Render Turnstile in gate mode
  useEffect(() => {
    if (!scriptLoaded || showPage || turnstileError) return;

    if (containerRef.current) {
      containerRef.current.innerHTML = ""; // Clear any previous widget

      window.turnstile.render(containerRef.current, {
        sitekey: import.meta.env.VITE_TURNSTILE_SITE_KEY,
        callback: (token) => {
          console.log("✅ Turnstile verified:", token);
          setIsVerified(true);
          setShowPage(true); // Unlock full contact page
          setTurnstileError(false);
        },
        "expired-callback": () => {
          console.log("Turnstile expired");
          setIsVerified(false);
        },
        "error-callback": (err) => {
          console.error("Turnstile error:", err);
          setTurnstileError(true);
          setIsVerified(false);
        },
        theme: "light",
        size: "normal",
      });
    }
  }, [scriptLoaded, showPage, turnstileError]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isVerified) {
      alert("❌ Please complete the 'I'm not a robot' verification.");
      return;
    }

    if (loading) return;

    setLoading(true);
    setSuccess(false);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        const error = await res.json();
        alert(error.message || "❌ Failed to send message.");
      }
    } catch (err) {
      alert("❌ Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative py-20 bg-gray-50">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed opacity-80"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/1024248/pexels-photo-1024248.jpeg')",
        }}
      ></div>
      <div className="absolute inset-0 bg-blue-800/10"></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {!showPage ? (
          // 🔐 Gate: Only Turnstile is shown
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center bg-white/60 backdrop-blur-md rounded-2xl p-10 shadow-xl">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Verify You're Not a Robot
            </h2>
            <p className="text-gray-600 mb-8 max-w-md">
              Please complete the security check to access the contact form.
            </p>
            <div
              ref={containerRef}
              style={{
                transform: "scale(1)",
                transformOrigin: "0 0",
              }}
            ></div>
            {turnstileError && (
              <p className="text-red-500 mt-4">
                ❌ Failed to load verification widget. Please refresh.
              </p>
            )}
          </div>
        ) : (
          // 📣 Full Contact Page (after verification)
          <>
            {/* Title Section */}
            <div className="text-center mb-16 bg-white/60 rounded-xl p-8 shadow-lg backdrop-blur-md">
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
                Get In <span className="text-blue-600">Touch</span>
              </h2>
              <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
                Have questions or need assistance? Our team is here to help you anytime.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Office Info */}
              <div className="space-y-8">
                <div className="bg-white/50 backdrop-blur-md p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">
                    Our Office
                  </h3>

                  {/* Head Office */}
                  <div className="flex items-start gap-4 mb-6">
                    <FaMapMarkerAlt className="text-blue-600 text-2xl mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-800 text-lg">
                        Office - Kurunegala
                      </h4>
                      <p className="text-gray-600">
                        No:64, 1st Floor, Kandy Road, Kurunegala, Sri Lanka.
                        <br />
                        (Opposite to Imperial Cenima)
                      </p>
                    </div>
                  </div>

                  {/* Contact Details */}
                  <div className="space-y-4 text-base">
                    <div className="flex items-center gap-3">
                      <FaEnvelope className="text-blue-600 text-lg" />
                      <a
                        href="mailto:diamondstar966@gmail.com"
                        className="text-gray-700 hover:text-blue-600"
                      >
                        diamondstar966@gmail.com
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaPhoneAlt className="text-blue-600 text-lg" />
                      <a href="tel:+94779000203" className="text-gray-700 hover:text-blue-600">
                        077 900 0203
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaMobileAlt className="text-blue-600 text-lg" />
                      <a href="tel:+94727000203" className="text-gray-700 hover:text-blue-600">
                        072 700 0203
                      </a>
                    </div>
                  </div>
                </div>

                {/* Google Map */}
                <div className="overflow-hidden rounded-2xl shadow-lg border border-gray-200">
                  <iframe
                    title="Google Map - Kurunegala Office"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.8108724323693!2d80.36410457407021!3d7.486124611230916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae33a1dfd7d49c9%3A0xc6ea7fe299fc9389!2sDiamond%20Star%20Manpower%20Service!5e0!3m2!1sen!2slk!4v1756196553128!5m2!1sen!2slk"
                    width="100%"
                    height="250"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                  ></iframe>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white/60 backdrop-blur-md p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  Send Us a Message
                </h3>

                {success ? (
                  <div className="bg-blue-100 text-blue-800 p-4 rounded-lg mb-6 text-center">
                    ✅ Thank you! Your message has been sent.
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Subject
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select a subject</option>
                        <option>Visa Inquiry</option>
                        <option>Job Placement</option>
                        <option>Training Program</option>
                        <option>Complaint/Suggestion</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="5"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 rounded-lg shadow-md transition transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {loading ? "Sending..." : "Send Message"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {/* AI Chat Widget */}
      <CustomerAIChat />
    </section>
  );
};

export default Contact;