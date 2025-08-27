import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules"; // Added Autoplay
import "swiper/css";
import "swiper/css/effect-coverflow";

const Services = () => {
  const serviceCards = [
    {
      title: "Skilled & Semi-Skilled Workers",
      description:
        "We supply trained professionals in construction, automotive, hospitality, and technical fields — including electricians, plumbers, carpenters, masons, welders, mechanics, and more — all pre-screened and job-ready.",
      image: "https://images.pexels.com/photos/19816447/pexels-photo-19816447.jpeg?auto=compress&cs=tinysrgb&w=800",
      delay: "0s",
      icon: "🛠️",
    },
    {
      title: "Professional & Technical Staff",
      description:
        "From engineers and architects to computer programmers and draftsmen, we recruit highly qualified professionals for technical and administrative roles abroad.",
      image: "https://images.pexels.com/photos/7709197/pexels-photo-7709197.jpeg?auto=compress&cs=tinysrgb&w=800",
      delay: "0.2s",
      icon: "👔",
    },
    {
      title: "Domestic & Hospitality Workers",
      description:
        "We provide cooks, bakers, waitresses, housekeepers, cleaners, room boys, and kitchen helpers — all trained and oriented for seamless integration into homes and hotels.",
      image: "https://images.pexels.com/photos/6223025/pexels-photo-6223025.jpeg?auto=compress&cs=tinysrgb&w=800",
      delay: "0.4s",
      icon: "🍽️",
    },
    {
      title: "Medical & Hospital Staff",
      description:
        "Recruit qualified nurses, caregivers, lab technicians, and medical support staff — fully certified and ready for deployment in healthcare institutions worldwide.",
      image: "https://images.pexels.com/photos/3771045/pexels-photo-3771045.jpeg?auto=compress&cs=tinysrgb&w=800",
      delay: "0.6s",
      icon: "🏥",
    },
    {
      title: "Work Visa & Documentation Support",
      description:
        "Full assistance with passport, police clearance, medical exams, SLBFE exit clearance, and visa processing — ensuring fast and legal deployment.",
      image: "https://images.pexels.com/photos/7979447/pexels-photo-7979447.jpeg?auto=compress&cs=tinysrgb&w=800",
      delay: "0.8s",
      icon: "📄",
    },
    {
      title: "Pre-Departure Orientation",
      description:
        "Mandatory orientation covering cultural norms, workplace behavior, legal rights, and safety in destination countries to ensure smooth adaptation.",
      image: "https://images.pexels.com/photos/8828454/pexels-photo-8828454.jpeg?auto=compress&cs=tinysrgb&w=800",
      delay: "1.0s",
      icon: "🌍",
    },
  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-slate-200 via-gray-100 to-blue-50 overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-blue-100 rounded-full opacity-20 blur-3xl animate-[blob_10s_infinite]"></div>
      <div className="absolute -bottom-32 right-1/3 w-[800px] h-[800px] bg-blue-200 rounded-full opacity-15 blur-2xl animate-[blob_12s_infinite_2s]"></div>

      {/* Title */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center mb-16 relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
          Our <span className="text-blue-700">Services</span> at Diamond Star Manpower Service
        </h2>
        <p className="mt-6 text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
          We offer comprehensive recruitment and deployment services tailored to meet the needs of overseas employers and institutions.
        </p>
      </div>

      {/* Desktop Grid */}
      <div className="px-6 lg:px-8 relative z-10">
        <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {serviceCards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-3 transition-transform duration-700 group"
              style={{
                opacity: 0,
                animation: `fadeInUp 0.8s ease forwards`,
                animationDelay: card.delay,
              }}
            >
              <div className="h-52 overflow-hidden relative">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute top-5 left-5 text-white p-2 bg-blue-600/70 rounded-lg shadow-lg transform group-hover:scale-110 transition">
                  {card.icon}
                </div>
              </div>
              <div className="p-7">
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {card.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{card.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Swiper */}
        <div className="sm:hidden">
          <Swiper
            spaceBetween={16}
            slidesPerView={1.05}
            loop
            effect="coverflow"
            autoplay={{ delay: 3000, disableOnInteraction: false }} // Added autoplay
            coverflowEffect={{
              rotate: 5,
              stretch: 0,
              depth: 120,
              modifier: 1,
              slideShadows: false,
            }}
            modules={[EffectCoverflow, Autoplay]} // Added Autoplay
            className="py-8"
          >
            {serviceCards.map((card, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition duration-500 group">
                  <div className="h-56 overflow-hidden relative">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                    <div className="absolute top-4 left-4 text-white p-2 bg-blue-600 rounded-lg shadow-md">
                      {card.icon}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{card.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{card.description}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Tailwind inline animation */}
      <style>
        {`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes blob {
            0%, 100% { transform: translate(0,0) scale(1); }
            33% { transform: translate(30px,-50px) scale(1.1); }
            66% { transform: translate(-20px,20px) scale(0.9); }
          }
          .animate-[blob_10s_infinite] { animation: blob 10s infinite; }
          .animate-[blob_12s_infinite_2s] { animation: blob 12s infinite 2s; }
        `}
      </style>
    </section>
  );
};

export default Services;
