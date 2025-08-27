import React from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-white">
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 left-1/2 w-[1200px] h-[1200px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-blue-100 opacity-30 mix-blend-multiply blur-3xl animate-[blob_7s_infinite]"></div>
      <div className="absolute -bottom-32 right-1/3 w-[800px] h-[800px] rounded-full bg-blue-200 opacity-20 mix-blend-multiply blur-2xl animate-[blob_7s_infinite_2s]"></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Image Section */}
        <div className="order-2 lg:order-1">
          <div className="relative">
            <img
              src="https://z-p3-scontent.fcmb9-1.fna.fbcdn.net/v/t1.6435-9/89519288_1356375951228087_8887066421016657920_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_ohc=eNbiMFla0esQ7kNvwF6qmDN&_nc_oc=AdlNNTeSEqYQ_0OygnQUlJ3IHpLuG20YfU2xj435NrRvJ7J_hdI2A4iKwCNP6URE-Mw&_nc_zt=23&_nc_ht=z-p3-scontent.fcmb9-1.fna&_nc_gid=IHRB792m7pQ_BUjZ6XKM6g&oh=00_AfWAkVLG-q8D9viAWcw5OeS4QBxWvEThPBWsueqdVwz7cA&oe=68CA1E8F"
              alt="Diamond Star - Skilled Manpower Recruitment"
              className="w-full h-80 object-cover rounded-2xl shadow-xl border-4 border-white"
            />

            {/* Experience Badge */}
            <div className="absolute -bottom-6 left-6 flex min-w-[9rem] items-center gap-2 rounded-xl border-2 border-blue-200 bg-white px-6 py-3 font-bold text-blue-700 shadow-lg text-center">
              <span className="text-2xl">30+</span>
              <span className="text-sm leading-tight">Years of Excellence</span>
            </div>

            {/* Airplane Icon */}
            <div className="absolute -top-4 -right-4 rounded-full bg-blue-600 p-4 shadow-2xl text-white transform rotate-12 hover:rotate-0 transition duration-300">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="order-1 lg:order-2 space-y-6 relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              Diamond Star Manpower Service
            </span>
          </h2>

          <p className="text-lg leading-relaxed text-gray-700">
            With a proven track record{" "}
            <span className="font-bold text-blue-700">since 1996</span> we are a
            government-licensed foreign employment agency (SLBFE License No:
            1437) based in Kurunegala, Sri Lanka. We are dedicated to bridging
            the gap between international employers and qualified Sri Lankan
            manpower — delivering reliable, trained, and culturally aware
            workers on time, every time.
          </p>

          <p className="text-base md:text-lg text-gray-600">
            Our commitment to transparency, professionalism, and ethical
            practices has made us a trusted partner for companies in Saudi
            Arabia, UAE, Qatar, Oman, Kuwait, Bahrain, Malaysia, and Lebanon.
            Whether you're looking for skilled technicians, domestic helpers,
            healthcare staff, or administrative personnel — we provide
            end-to-end manpower solutions with care and precision.
          </p>

          <div className="flex flex-col gap-4 pt-2 sm:flex-row">
            <button
              onClick={() => navigate("/contect")}
              className="rounded-lg bg-blue-600 px-7 py-3 font-semibold text-white shadow-md transition-transform hover:scale-105 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Learn More About Us
            </button>
            <button
              onClick={() => scro("/services")}
              className="rounded-lg border-2 border-blue-600 bg-white px-7 py-3 font-semibold text-blue-700 transition-all duration-200 hover:border-blue-900 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Our Services
            </button>
          </div>
        </div>
      </div>

      {/* Tailwind Custom Animation */}
      <style>
        {`
          @keyframes blob {
            0%, 100% { transform: translate(0,0) scale(1); }
            33% { transform: translate(30px,-50px) scale(1.1); }
            66% { transform: translate(-20px,20px) scale(0.9); }
          }
          .animate-[blob_7s_infinite] {
            animation: blob 7s infinite;
          }
          .animate-[blob_7s_infinite_2s] {
            animation: blob 7s infinite 2s;
          }
        `}
      </style>
    </section>
  );
};

export default Welcome;
