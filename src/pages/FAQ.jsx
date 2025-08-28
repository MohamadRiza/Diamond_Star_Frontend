// src/components/FAQ.jsx
import CustomerAIChat from "@/components/CustomerAIChat";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is Diamond Star Manpower Service?",
      answer:
        "Diamond Star Manpower Service (DSMS) is a government-licensed foreign employment agency (SLBFE License No: 1437) established in 1996. We specialize in recruiting, processing, and deploying qualified Sri Lankan workers to countries like Saudi Arabia, UAE, Qatar, Oman, Kuwait, Bahrain, Malaysia, and Lebanon. With over 30+ years of experience, we offer reliable and ethical manpower solutions for individuals and companies worldwide.",
    },
    {
      question: "Is your agency legally registered and licensed?",
      answer:
        "Yes, we are fully licensed by the Sri Lanka Bureau of Foreign Employment (SLBFE) under License No. 1437, and our business is officially registered with the government under Registration No. 01/5093. We operate in full compliance with Sri Lankan labor laws and international employment standards.",
    },
    {
      question: "What types of jobs do you provide?",
      answer:
        "We supply manpower across a wide range of sectors, including: Skilled Workers, Technical Staff, Administrative & Sales, Hospitality & Kitchen Staff, Medical Staff, Drivers & Equipment Operators, Beauty & Dressmaking, Unskilled Laborers, and We can customize recruitment based on your specific job requirements.",
    },
    {
      question: "How long does it take to deploy a worker?",
      answer:
        "We typically deploy workers within 30 to 45 days, depending on the job category and visa processing time in the destination country. The timeline may vary slightly based on embassy procedures and document availability.",
    },
    {
      question: "Do you provide pre-departure training for workers?",
      answer:
        "Yes, we conduct mandatory pre-departure orientation for all candidates. This includes training on: Cultural and social norms of the host country, Workplace behavior and safety, Basic rights and responsibilities of overseas workers, Legal regulations and employer expectations. This ensures smooth adaptation and reduces the risk of workplace issues.",
    },
    {
      question: "Can employers select candidates directly?",
      answer:
        "Absolutely. If you wish to conduct final interviews, we will pre-screen and shortlist at least three (3) qualified candidates per vacancy for your selection. We support both online interviews and in-person selection at our office in Kurunegala.",
    },
    {
      question: "Do you assist with documentation and visa processing?",
      answer:
        "Yes, we provide end-to-end support for all documentation",
    },
    {
      question: "How can I contact Diamond Star Manpower Service?",
      answer:
        "You can reach us through our website's contact form, email us at diamondstar966@gmail.com, or call our hotline at +94 77 900 0203 || +94 72 7000 203",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="overflow-hidden">
      {/* Hero Section with Background */}
      <div
        className="relative bg-cover bg-center bg-fixed text-white py-32 px-6"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
          backgroundPosition: "center 30%",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-transparent"></div>

        {/* Content */}
        <div className="relative max-w-5xl mx-auto text-center z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            Frequently Asked{" "}
            <span className="text-blue-400 drop-shadow-lg">Questions</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Get clear, trusted answers about overseas employment, visa processing, training, and how we support your journey every step of the way.
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white relative z-10 -mt-16 rounded-t-3xl shadow-xl pt-12 pb-20 px-6 lg:px-12 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
          Everything You Need to Know
        </h2>

        <div className="space-y-5 max-w-4xl mx-auto">
          {faqs.map((item, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 bg-gray-50/50"
            >
              {/* Question Button */}
              <button
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
              >
                <span className="text-lg font-semibold text-gray-800 leading-tight">
                  {item.question}
                </span>
                <span
                  className={`flex-shrink-0 ml-4 transform transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </button>

              {/* Answer */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index
                    ? "max-h-96 opacity-100 px-6 pb-6 pt-2"
                    : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Need Help Section */}
      <div className="text-center py-16 bg-gray-50">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Still Have Questions?
        </h3>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Our support team is ready to assist you with personalized guidance.
        </p>
        {/* <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 ease-in-out text-lg cursor-pointer"
          onClick={() => (window.location.href = "/contact")}
        >
          Contact Us Now
        </button> */}

        <Link to="/contact" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 ease-in-out text-lg cursor-pointer">
          Contact Us Now
        </Link>

      </div>

      {/* AI Chat Widget */}
      <CustomerAIChat />
    </section>
  );
};

export default FAQ;