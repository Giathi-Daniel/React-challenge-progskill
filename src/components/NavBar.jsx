import { useState } from "react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "../context/ThemeProvider";
import gradientBg from "../assets/gradient-1.jpg"; // Import the background image

const menuItems = [
  { name: "Home", to: "/" },
  { name: "To Do List", to: "/todo-list" },
  { name: "Timer", to: "/timer" },
  { name: "Weather", to: "/weather" },
];

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full fixed top-0 z-50 shadow-md">
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

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-white">
              My App
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex space-x-8">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.to}
                    className="text-white hover:text-blue-400 text-sm font-bold transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* "Get Started" Button */}
            <div className="ml-8">
              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity duration-200 shadow-lg">
                Get Started
              </button>
            </div>

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-blue-400 focus:outline-none"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <svg
                className="h-6 w-6"
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
            className="md:hidden py-4 space-y-4 bg-gray-800/95 backdrop-blur-lg"
          >
            <ul className="space-y-4">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.to}
                    className="block px-4 py-2 text-white hover:text-blue-400 text-sm font-bold transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <button className="w-full mx-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg text-base font-medium hover:opacity-90 transition-opacity duration-200 shadow-lg">
              Get Started
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default NavBar;
