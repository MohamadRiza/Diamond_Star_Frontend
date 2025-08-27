import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const images = [
    "https://careers.srilankan.com/group/images/cabin-crew.jpg",
    "https://i.ytimg.com/vi/C882r8LaDj8/maxresdefault.jpg",
    "https://i.ytimg.com/vi/qeMbcHDzae0/maxresdefault.jpg",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section
      id="home"
      className="relative h-[60vh] md:h-screen flex items-center justify-center text-white overflow-hidden"
    >
      {/* Background Image Slider */}
      {images.map((img, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
            idx === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl px-4 md:px-6">
        <h2 className="text-xl sm:text-3xl md:text-5xl font-extrabold mb-4 md:mb-6">
          Diamond Star Manpower Service (DSMS) <br />
          <span className="text-blue-600">For 30+ Years</span>
        </h2>
        <p className="text-sm sm:text-base md:text-xl mb-6 md:mb-8 text-gray-100">
          Trusted Manpower Solutions Since 1996 | SLBFE Licensed Agency No. 1437
          Supplying Skilled & Reliable Workers to Malaysia, GCC & Middle East Countries
        </p>
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 md:px-8 md:py-3 rounded-lg font-semibold transition cursor-pointer text-sm md:text-base"
            onClick={() => navigate("/vacancies")}
          >
            Start Your Journey
          </button>
          <button
            className="border border-white text-white hover:bg-white/20 px-6 py-2 md:px-8 md:py-3 rounded-lg font-semibold transition cursor-pointer text-sm md:text-base"
            onClick={() => navigate("/FAQ")}
          >
            Learn More
          </button>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 md:space-x-3">
        {images.map((_, idx) => (
          <button
            key={idx}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${
              idx === currentImageIndex ? "bg-white" : "bg-white/40"
            }`}
            onClick={() => setCurrentImageIndex(idx)}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
