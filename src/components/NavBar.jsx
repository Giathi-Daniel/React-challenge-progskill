import { useState } from "react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "../context/ThemeToggle";
import gradientBg from "../assets/gradient-1.jpg"; 
import GoogleAuthButton from "./GoogleButton";
import SessionManagementModal from "./SessionManagementModal.jsx"; 

const menuItems = [
  { name: "Home", to: "/" },
  { name: "To Do List", to: "/todo-list" },
  { name: "Timer", to: "/timer" },
  { name: "Weather", to: "/weather" },
];

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full shadow-md">
      {/* Background with Blur */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `url(${gradientBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(1px)",
        }}
      ></div>

      <nav className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-white">
              My App
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="items-center hidden gap-8 md:flex">
            <ul className="flex space-x-8">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.to}
                    className="text-sm font-bold text-white transition-colors duration-200 hover:text-blue-400"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* "Get Started" Button */}
            <div className="ml-8">
              <button className="px-6 py-2 text-sm font-medium text-white transition-opacity duration-200 rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90">
                Get Started
              </button>
            </div>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Session Management Modal Button */}
            <div className="ml-8">
              <SessionManagementModal />
            </div>
          </div>

          {/* GoogleAuthButton */}
          <div className="hidden md:block">
            <GoogleAuthButton />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-blue-400 focus:outline-none"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            id="mobile-menu"
            className="py-4 space-y-4 md:hidden bg-gray-800/95 backdrop-blur-lg"
          >
            <ul className="space-y-4">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.to}
                    className="block px-4 py-2 text-sm font-bold text-white transition-colors duration-200 hover:text-blue-400"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <button className="w-full px-6 py-3 mx-4 text-base font-medium text-white transition-opacity duration-200 rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90">
              Get Started
            </button>
            <GoogleAuthButton />
            <SessionManagementModal /> 
          </div>
        )}
      </nav>
    </header>
  );
};

export default NavBar;
