import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { Autoplay, FreeMode } from "swiper/modules";

const WhereWeSendEmployees = () => {
  const countries = [
    { name: "Bahrain", flag: "🇧🇭", capital: "Manama" },
    { name: "Cyprus", flag: "🇨🇾", capital: "Nicosia" },
    { name: "Jordan", flag: "🇯🇴", capital: "Amman" },
    { name: "Kuwait", flag: "🇰🇼", capital: "Kuwait City" },
    { name: "Malaysia", flag: "🇲🇾", capital: "Kuala Lumpur" },
    { name: "Maldives", flag: "🇲🇻", capital: "Malé" },
    { name: "Oman", flag: "🇴🇲", capital: "Muscat" },
    { name: "Singapore", flag: "🇸🇬", capital: "Singapore" },
    { name: "UAE", flag: "🇦🇪", capital: "Abu Dhabi" },
    { name: "Saudi Arabia", flag: "🇸🇦", capital: "Riyadh" },
    { name: "Qatar", flag: "🇶🇦", capital: "Doha" },
    { name: "Lebanon", flag: "🇱🇧", capital: "Beirut" },
  ];

  return (
    <section
      className="relative py-16 md:py-24 bg-fixed bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/163792/model-planes-airplanes-miniatur-wunderland-hamburg-163792.jpeg')",
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/80"></div>

      {/* Heading */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center mb-12 md:mb-20">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight bg-black/20 rounded-full inline-block px-6 py-3">
          Where We Send{" "}
          <span className="bg-gradient-to-t from-blue-500 to-red-300 bg-clip-text text-transparent">
            Employees
          </span>{" "}
          Worldwide
        </h2>
        <p className="mt-5 text-base sm:text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
          Diamond Star Manpower Service connects skilled professionals with opportunities 
          across trusted international destinations.
        </p>
      </div>

      {/* Continuous Scrolling Slider */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <Swiper
          modules={[Autoplay, FreeMode]}
          freeMode={true}
          loop={true}
          speed={6000} // controls smooth scroll speed (higher = slower)
          autoplay={{
            delay: 0, // no pause between slides
            disableOnInteraction: false,
          }}
          slidesPerView={1.5}
          spaceBetween={16}
          breakpoints={{
            640: { slidesPerView: 3, spaceBetween: 20 },
            1024: { slidesPerView: 4, spaceBetween: 24 },
          }}
        >
          {countries.map((country, index) => (
            <SwiperSlide key={index}>
              <div className="p-6 sm:p-8 bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 text-center transition-transform hover:scale-105 hover:bg-white/20 hover:shadow-xl">
                <div className="text-5xl sm:text-6xl">{country.flag}</div>
                <h3 className="mt-4 text-xl sm:text-2xl font-bold text-white transition-colors hover:text-blue-400">
                  {country.name}
                </h3>
                <p className="text-sm sm:text-base text-gray-300">
                  Capital: {country.capital}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default WhereWeSendEmployees;
