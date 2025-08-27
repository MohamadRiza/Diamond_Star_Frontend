import React from "react";

const WhereWeSendEmployees = () => {
  const countries = [
    {
      name: "Bahrain",
      flag: "🇧🇭",
      capital: "Manama",
      visaType: "Work & Visitor",
      jobs: "Janitors, Beauticians, Mechanics, Assistants",
      info: "High demand for skilled domestic staff and service professionals.",
    },
    {
      name: "Cyprus",
      flag: "🇨🇾",
      capital: "Nicosia",
      visaType: "Work & Visitor",
      jobs: "Domestic Workers, Hospitality, Security",
      info: "High demand for skilled domestic staff and service professionals.",
    },
    {
      name: "Jordan",
      flag: "🇯🇴",
      capital: "Amman",
      visaType: "Work & Visitor",
      jobs: "Domestic Workers, Hospitality, Security",
      info: "High demand for skilled domestic staff and service professionals.",
    },
    {
      name: "Kuwait",
      flag: "🇰🇼",
      capital: "Kuwait City",
      visaType: "Work & Visitor",
      jobs: "Domestic Helpers, Technicians, Nurses",
      info: "Trusted partner for safe and verified domestic worker placements.",
    },
    {
      name: "Malaysia",
      flag: "🇲🇾",
      capital: "Kuala Lumpur",
      visaType: "Work & Visitor",
      jobs: "Factory Workers, Technicians, Hospitality Staff",
      info: "Trusted partner for safe and verified domestic worker placements.",
    },
    {
      name: "Maldives",
      flag: "🇻🇺",
      capital: "Malé",
      visaType: "Work & Visitor",
      jobs: "Domestic Helpers, Caregivers",
      info: "Trusted partner for safe and verified domestic worker placements.",
    },
    {
      name: "Oman",
      flag: "🇴🇲",
      capital: "Muscat",
      visaType: "Work & Visitor",
      jobs: "Gardeners, Cleaners, Electricians, Drivers",
      info: "Ethical recruitment and full visa processing support.",
    },
    {
      name: "Singapore",
      flag: "🇸🇬",
      capital: "Singapore",
      visaType: "Work & Visitor",
      jobs: "Housekeepers, Cooks, Construction Workers",
      info: "Ethical recruitment and full visa processing support.",
    },
    {
      name: "United Arab Emirates",
      flag: "🇦🇪",
      capital: "Abu Dhabi",
      visaType: "Work & Visitor",
      jobs: "Housekeepers, Mechanics, Builders, Admin Staff",
      info: "High demand for skilled domestic staff and service professionals.",
    },
    {
      name: "Saudi Arabia",
      flag: "🇸🇦",
      capital: "Riyadh",
      visaType: "Work & Visitor",
      jobs: "Cooks, Drivers, Electricians, Technicians, Nurses",
      info: "We support legal employment with pre-departure training and documentation.",
    },
    {
      name: "Qatar",
      flag: "🇶🇦",
      capital: "Doha",
      visaType: "Work & Visitor",
      jobs: "Construction Laborers, Hotel Staff, Technicians",
      info: "Compliant placements in private households and corporate sectors.",
    },
    {
      name: "Lebanon",
      flag: "🇱🇧",
      capital: "Beirut",
      visaType: "Work & Visitor",
      jobs: "Domestic Staff, Nurses, Beauticians",
      info: "Ethical recruitment and full visa processing support.",
    },
  ];

  return (
    <section
      className="relative py-20 bg-fixed bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/163792/model-planes-airplanes-miniatur-wunderland-hamburg-163792.jpeg')",
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/70"></div>

      {/* Animated Background Blobs */}
      <div className="absolute top-0 left-1/2 w-[900px] h-[900px] -translate-x-1/2 -translate-y-1/3 bg-purple-500/20 rounded-full filter blur-3xl animate-[blob_12s_infinite]"></div>
      <div className="absolute bottom-0 right-1/4 w-[700px] h-[700px] bg-blue-500/30 rounded-full filter blur-2xl animate-[blob_14s_infinite_3s]"></div>

      {/* Heading */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight bg-black/20 rounded-full inline-block px-6 py-2">
          Where We Send <span className="bg-gradient-to-t from-blue-600 to-red-300 bg-clip-text text-transparent">Employees</span> Worldwide
        </h2>
        <p className="mt-6 text-lg text-gray-200 max-w-3xl mx-auto">
          Diamond Star Manpower Service supports legal employment and deployment across key international markets.
        </p>
      </div>

      {/* Country Cards */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 space-y-10">
        {countries.map((country, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 transition-transform hover:scale-105 hover:bg-white/20 hover:shadow-2xl"
          >
            {/* Left: Flag + Country */}
            <div className="flex items-center space-x-4">
              <div className="text-5xl">{country.flag}</div>
              <div>
                <h3 className="text-2xl font-bold text-white transition-colors hover:text-blue-400">
                  {country.name}
                </h3>
                <p className="text-sm text-gray-300">Capital: {country.capital}</p>
              </div>
            </div>

            {/* Middle: Visa + Jobs */}
            <div className="text-gray-200 space-y-2">
              <p>
                <span className="text-blue-400 font-semibold">Visa Type:</span> {country.visaType}
              </p>
              <p>
                <span className="text-blue-400 font-semibold">Jobs:</span> {country.jobs}
              </p>
            </div>

            {/* Right: Info */}
            <div className="text-gray-300 italic">
              {country.info}
            </div>
          </div>
        ))}
      </div>

      {/* Tailwind animation inline */}
      <style>
        {`
          @keyframes blob {
            0%, 100% { transform: translate(0,0) scale(1); }
            33% { transform: translate(30px,-50px) scale(1.1); }
            66% { transform: translate(-20px,20px) scale(0.9); }
          }
          .animate-[blob_12s_infinite] { animation: blob 12s infinite; }
          .animate-[blob_14s_infinite_3s] { animation: blob 14s infinite 3s; }
        `}
      </style>
    </section>
  );
};

export default WhereWeSendEmployees;
