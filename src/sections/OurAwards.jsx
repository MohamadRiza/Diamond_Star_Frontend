import React from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

const OurAwards = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-150px" });
  const controls = useAnimation();

  const awards = [
    {
      title: "SLBFE Licensed Manpower Agency",
      description:
        "Awarded by Sri Lanka HR Excellence Awards for outstanding service in overseas recruitment.",
      image:
        "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    },
    {
      title: "License No: 1437",
      description:
        "Officially licensed by the Sri Lanka Bureau of Foreign Employment (SLBFE) under the Foreign Employment Act No. 21 of 1985. Full legal compliance ensures safe and ethical overseas employment.",
      image:
        "https://cdn-icons-png.flaticon.com/512/1828/1828884.png",
    },
    {
      title: "30+ Years of Industry Leadership",
      description:
        "Established in 1996, Diamond Star Manpower Service has successfully deployed thousands of workers worldwide across GCC and Asia.",
      image:
        "https://cdn-icons-png.flaticon.com/512/190/190411.png",
    },
    {
      title: "Trusted by Employers Across 8+ Countries",
      description:
        "Proven track record supplying qualified manpower to Saudi Arabia, UAE, Qatar, Oman, Kuwait, Bahrain, Lebanon, and Malaysia.",
      image:
        "https://cdn-icons-png.flaticon.com/512/3135/3135789.png",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3, delayChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const medalVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { scale: 1, rotate: 0, transition: { type: "spring", stiffness: 80, damping: 12 } },
  };

  const cardVariants = (isEven) => ({
    hidden: { opacity: 0, x: isEven ? -60 : 60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
  });

  useEffect(() => {
    if (isInView) controls.start("visible");
    else controls.start("hidden");
  }, [isInView, controls]);

  return (
    <section
      ref={ref}
      className="py-24 relative overflow-hidden bg-gradient-to-br from-gray-100 via-white to-blue-300"
    >
      {/* Floating Gradient Blobs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-200/30 rounded-full blur-3xl blob1"></div>
      <div className="absolute bottom-0 right-1/3 w-[500px] h-[500px] bg-purple-200/20 rounded-full blur-2xl blob2"></div>

      {/* Heading */}
      <motion.div
        className="relative max-w-4xl mx-auto text-center mb-20 px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={controls}
        variants={itemVariants}
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
          Our <span className="text-blue-600">Awards & Achievements</span>
        </h2>
        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          Celebrating milestones of excellence, integrity, and leadership in global manpower services.
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative max-w-5xl mx-auto px-6">
        {/* Vertical line */}
        <motion.div
          className="absolute left-8 sm:left-1/2 transform sm:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 via-blue-300 to-transparent rounded"
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
          style={{ transformOrigin: "top" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />

        <motion.div
          className="space-y-20"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {awards.map((award, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={index}
                className={`flex flex-col sm:flex-row items-center gap-8 relative ${
                  isEven ? "sm:flex-row" : "sm:flex-row-reverse"
                }`}
                variants={itemVariants}
              >
                {/* Timeline Dot */}
                <motion.div
                  className="absolute left-8 sm:left-1/2 transform sm:-translate-x-1/2 w-6 h-6 bg-blue-500 rounded-full border-4 border-white shadow-md"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ delay: 0.5 + index * 0.3 }}
                />

                {/* Medal */}
                <motion.div
                  className="w-28 h-28 rounded-full overflow-visible shadow-xl border-4 border-yellow-400 bg-white flex items-center justify-center"
                  variants={medalVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img src={award.image} alt={award.title} className="w-16 h-16 object-contain" loading="lazy" />
                </motion.div>

                {/* Card */}
                <motion.div
                  className="sm:w-1/2 text-center sm:text-left p-6 rounded-2xl bg-white/70 backdrop-blur-lg shadow-md"
                  variants={cardVariants(isEven)}
                  initial="hidden"
                  animate="visible"
                  whileHover={{
                    scale: 1.02,
                    boxShadow:
                      "0 20px 25px -5px rgba(0,0,0,0.1),0 10px 10px -5px rgba(0,0,0,0.04)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl font-bold text-gray-900">{award.title}</h3>
                  <p className="mt-3 text-gray-600 leading-relaxed">{award.description}</p>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* License Badge */}
      <motion.div
        className="text-center mt-24 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <motion.div
          className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-100 to-blue-50 text-blue-900 rounded-full font-medium shadow-md"
          whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0,0,0,0.15)" }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span>
            Officially Licensed by SLBFE | License No: <strong className="text-blue-700">1437</strong>
          </span>
        </motion.div>
      </motion.div>

      {/* Blob Animations */}
      <style>
        {`
          @keyframes blob {
            0%, 100% { transform: translate(0,0) scale(1); }
            33% { transform: translate(30px,-50px) scale(1.1); }
            66% { transform: translate(-20px,20px) scale(0.9); }
          }
          .blob1 { animation: blob 12s infinite; }
          .blob2 { animation: blob 14s infinite 3s; }
        `}
      </style>
    </section>
  );
};

export default OurAwards;
