import React from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

const WhyChooseUs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const controls = useAnimation();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.6,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const statVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "backOut" },
    },
  };

  const featureVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  return (
    <section
      ref={ref}
      className="py-20 bg-gradient-to-r from-gray-300 to-blue-100"
    >
      {/* Heading */}
      <motion.div
        className="max-w-7xl mx-auto px-6 lg:px-8 text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={controls}
        variants={itemVariants}
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
          Why Choose{" "}
          <span className="text-blue-600">Diamond Star Manpower Service</span>
        </h2>
        <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
          With decades of trusted service, we deliver manpower solutions built
          on integrity, speed, and reliability.
        </p>
      </motion.div>

      {/* Stats Counter */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-4 gap-8 px-6 lg:px-8 mb-20"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {[
          { num: "30+", label: "Years of Experience", desc: "Established in 1996 — one of Sri Lanka’s most experienced manpower agencies." },
          { num: "1000+", label: "Placements", desc: "Proven track record across Gulf, Middle East, and Malaysia." },
          { num: "98%", label: "Client Satisfaction", desc: "Happy families and employers globally" },
          { num: "10+", label: "Countries", desc: "From Asia to Gulf, beyond" },
        ].map((stat, index) => (
          <motion.div
            key={index}
            className="text-center"
            variants={statVariants}
          >
            <div className="text-5xl md:text-6xl font-extrabold text-blue-600 mb-2">
              {stat.num}
            </div>
            <h3 className="text-xl font-semibold text-gray-800">
              {stat.label}
            </h3>
            <p className="text-gray-500 mt-2">{stat.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Features */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 px-6 lg:px-8 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {[
          {
            title: "Well-Trained Employees",
            desc: "Every candidate undergoes rigorous training in job skills, language, cultural awareness, and legal rights to ensure success abroad.",
            icon: (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            ),
          },
          {
            title: "Verified & Trusted Process",
            desc: "We follow full legal compliance and transparent procedures, ensuring safe, secure, and ethical placements.",
            icon: (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.165-2.052-.48-3.006z"
              />
            ),
          },
          {
            title: "Dedicated Support Team",
            desc: "Our experienced consultants guide you from application to departure — and even after placement.",
            icon: (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            ),
          },
          {
            title: "End-to-End Visa Assistance",
            desc: "From documentation to final approval, we handle all visa processes with speed, accuracy, and care.",
            icon: (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            ),
          },
        ].map((feature, index) => (
          <motion.div
            key={index}
            className="flex gap-5 items-start"
            variants={featureVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex-shrink-0 mt-1">
              <motion.div
                className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center"
                whileHover={{ scale: 1.2, backgroundColor: "#1d4ed8" }}
                transition={{ duration: 0.3 }}
              >
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {feature.icon}
                </svg>
              </motion.div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600 mt-2">{feature.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default WhyChooseUs;