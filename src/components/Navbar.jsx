import React, { useState } from "react";
import { href, Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const countries = [
    { name: "🇧🇭 Bahrain", path: "/vacancies" },
    { name: "🇨🇾 Cyprus", path: "/vacancies" },
    { name: "🇯🇴 Jordan", path: "/vacancies" },
    { name: "🇰🇼 Kuwait", path: "/vacancies" },
    { name: "🇲🇾 Malaysia", path: "/vacancies" },
    { name: "🇲🇻 Maldives", path: "/vacancies" },
    { name: "🇴🇲 Oman", path: "/vacancies" },
    { name: "🇸🇬 Singapore", path: "/vacancies" },
    { name: "🇦🇪 UAE", path: "/vacancies" },
    { name: "🇸🇦 Saudi Arabia", path: "/vacancies" },
    { name: "🇶🇦 Qatar", path: "/vacancies" },
    { name: "🇱🇧 Lebanon", path: "/vacancies" },
  ];

  // Close all menus when a link is clicked
  const handleLinkClick = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  return (
    <nav
      className="from-white to-blue-100 bg-gradient-to-l shadow-sm sticky top-0 z-50"
      aria-label="Main Navigation"
    >
      <div className="container mx-auto px-6 py-3">
        {/* Top row with logo and hamburger */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            className="flex items-center space-x-3 cursor-default"
            onClick={() => (window.location.href = "/")}
          >
            <img
              src="/logo.png"
              alt="Diamond Star Logo"
              className="h-15 w-15 object-contain"
            />
            <span className="font-bold text-xl bg-gradient-to-r from-red-600 to-blue-700 bg-clip-text text-transparent">
              Diamond Star Manpower Services
            </span>
          </div>

          {/* Hamburger Button (Mobile) */}
          <button
            className="md:hidden text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label="Toggle navigation menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                // Close icon (X)
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                // Menu icon (Bars)
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Desktop Navigation Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200 flex group"
              onClick={handleLinkClick}
            >
              <span className="relative">
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
              </span>
            </Link>

            <Link
              to="/vacancies"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200 flex group"
              onClick={handleLinkClick}
            >
              <span className="relative">
                Vacancies
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
              </span>
            </Link>

            {/* <Link
              to="/about"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200 flex group"
              onClick={handleLinkClick}
            >
              <span className="relative">
                About Us
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
              </span>
            </Link> */}

            {/* Countries Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
              onFocus={() => setDropdownOpen(true)}
              onBlur={() => setDropdownOpen(false)}
            >
              <button
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 flex items-center gap-1 group"
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
              >
                <span className="relative">
                  Countries
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
                </span>
                <svg
                  className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                    dropdownOpen ? "transform rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              <div
                className={`${
                  dropdownOpen ? "opacity-100 visible" : "opacity-0 invisible"
                } absolute left-0 mt-2 w-52 bg-white border border-gray-200 rounded-lg shadow-lg z-50 transition-all duration-200 py-2`}
              >
                {countries.map((country) => (
                  <Link
                    key={country.path}
                    to={`${country.path}`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150"
                    onClick={handleLinkClick}
                  >
                    {country.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              to="/FAQ"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200 flex group"
              onClick={handleLinkClick}
            >
              <span className="relative">
                FAQ
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
              </span>
            </Link>

            <Link
              to="/contact"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200 flex group"
              onClick={handleLinkClick}
            >
              <span className="relative">
                Contact Us
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
              </span>
            </Link>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`${
            menuOpen ? "flex" : "hidden"
          } md:hidden flex-col items-start space-y-4 w-full mt-4 pb-4`}
        >
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600 transition-colors duration-200 flex group w-full"
            onClick={handleLinkClick}
          >
            <span className="relative">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
            </span>
          </Link>

          <Link
            to="/vacancies"
            className="text-gray-700 hover:text-blue-600 transition-colors duration-200 flex group"
            onClick={handleLinkClick}
          >
            <span className="relative">
              Vacancies
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
            </span>
          </Link>

          {/* <Link
            to="/about"
            className="text-gray-700 hover:text-blue-600 transition-colors duration-200 flex group w-full"
            onClick={handleLinkClick}
          >
            <span className="relative">
              About Us
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
            </span>
          </Link> */}

          {/* Mobile Countries Menu */}
          <div className="w-full">
            <button
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200 flex items-center gap-1 group w-full justify-between"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
            >
              <span className="relative">
                Countries
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
              </span>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${
                  dropdownOpen ? "transform rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Mobile Dropdown Menu */}
            {dropdownOpen && (
              <div className="mt-2 pl-4 space-y-2">
                {countries.map((country) => (
                  <Link
                    key={country.path}
                    to={`${country.path}`}
                    className="block py-2 text-sm text-gray-600 hover:text-blue-600 transition-colors duration-150"
                    onClick={handleLinkClick}
                  >
                    {country.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/FAQ"
            className="text-gray-700 hover:text-blue-600 transition-colors duration-200 flex group"
            onClick={handleLinkClick}
          >
            <span className="relative">
              FAQ
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
            </span>
          </Link>

          <Link
            to="/contact"
            className="text-gray-700 hover:text-blue-600 transition-colors duration-200 flex group w-full"
            onClick={handleLinkClick}
          >
            <span className="relative">
              Contact Us
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
