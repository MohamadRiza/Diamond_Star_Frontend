import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      className="bg-gray-900 text-white pt-20 pb-10 relative overflow-hidden"
      aria-labelledby="footer-heading"
    >
      {/* Beautiful Earth Background (Fixed) */}
      <div
        className="absolute inset-0 bg-fixed bg-center bg-no-repeat bg-cover opacity-10"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/41949/earth-earth-at-night-night-lights-41949.jpeg')",
        }}
        aria-hidden="true"
      ></div>

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-800/20"></div>

      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-14">
          
          {/* About Section */}
          <div className="text-center md:text-left">
            <img
              src="/logo.png"
              alt="Diamond Star Manpower Services Logo"
              className="mx-auto md:mx-0 w-20 h-20 object-contain mb-4"
            />
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-red-600 to-blue-700 inline-block text-transparent bg-clip-text">
              D.S.M.S <span className="text-gray-200 text-sm font-sans underline">Since 1996</span>
            </h3>
            <p className="text-gray-300 leading-relaxed mb-6 max-w-xs mx-auto md:mx-0">
              Sri Lanka’s leading manpower agency with over 30 years of excellence in global recruitment and visa consulting.
            </p>
            <Link
              onClick={() => window.scrollTo({ top: 700, behavior: "smooth" })}
              className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium transition-all duration-200 group"
            >
              Learn More
              <span className="ml-1 transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-5 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "Vacancies", path: "/Jobs" },
                { name: "FAQ", path: "/FAQ" },
                { name: "Contact Us", path: "/contact" },
                { name: "ADMIN", path: "/admin-login" },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-gray-300 hover:text-blue-400 transition-all duration-200 flex justify-center md:justify-start group"
                  >
                    <span className="relative">
                      {item.name}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-200 group-hover:w-full"></span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-right">
            <h3 className="text-lg font-semibold mb-5">Contact Us</h3>
            <div className="text-gray-300 space-y-3 text-sm leading-relaxed">
              <div>
                <p className="font-medium">Head Office</p>
                <p>No:64, 1st floor, Kandy Road,</p>
                <p>Kurunegala, Sri Lanka</p>
              </div>
              <div>
                <p>
                  📞{" "}
                  <a
                    href="tel:0727000203"
                    className="hover:text-blue-400 transition duration-200"
                  >
                    +94 72 700 0203
                  </a>
                </p>
                <p>
                  📧{" "}
                  <a
                    href="mailto:diamondstar966@gmail.com"
                    className="hover:text-blue-400 transition duration-200"
                  >
                    diamondstar966@gmail.com
                  </a>
                </p>
              </div>

              {/* Social Icons */}
              <div className="mt-5 flex justify-center md:justify-end space-x-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-500 transition-transform duration-200 hover:scale-110"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-pink-500 transition-transform duration-200 hover:scale-110"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.858.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.354-.3.883-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.354.137.883.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.354.3-.883.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.354-.137-.883-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 8.467a3.332 3.332 0 100-6.664 3.332 3.332 0 000 6.664zm5.338-9.8a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z" />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com/company"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-600 transition-transform duration-200 hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="relative border-t border-gray-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0 text-sm text-gray-400">
            <p>
              &copy; {new Date().getFullYear()}{" "}
              <span className="text-white font-medium">D.S.M.S</span>. All rights reserved.
            </p>
            <p className="text-blue-400 font-medium">
              Developed by{" "}
              <span className="text-white hover:text-blue-300 transition"><a href="https://www.linkedin.com/in/mohamad-riza-rawufdeen-9a6b76254/">NexaSoft/Riza</a></span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
