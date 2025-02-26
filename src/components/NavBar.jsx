import { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to handle scroll on menu click
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="w-full fixed top-0 z-50 shadow-md">
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: "url('/src/assets/gradient-1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(1px)", 
        }}
      ></div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-white">My App</h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex space-x-8">
              {/* Update the routes based on the App's routes */}
              <li>
                <Link
                  to="/"
                  className="text-white hover:text-blue-600 text-sm font-bold transition-colors duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('todo-list')} // Scroll to the To Do List section
                  className="text-white hover:text-blue-600 text-sm font-bold transition-colors duration-200"
                >
                  To Do List
                </button>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-white hover:text-blue-600 text-sm font-bold transition-colors duration-200"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-white hover:text-blue-600 text-sm font-bold transition-colors duration-200"
                >
                  Contact
                </Link>
              </li>
            </ul>
            <div className="ml-8">
              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity duration-200 shadow-lg">
                Get Started
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-blue-400 focus:outline-none"
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
          <div className="md:hidden py-4 space-y-4 bg-white/10 backdrop-blur-lg">
            <ul className="space-y-4">
              <li>
                <Link
                  to="/"
                  className="text-white hover:text-blue-600 text-sm font-bold transition-colors duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('todo-list')} // Scroll to the To Do List section
                  className="text-white hover:text-blue-600 text-sm font-bold transition-colors duration-200"
                >
                  To Do List
                </button>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-white hover:text-blue-600 text-sm font-bold transition-colors duration-200"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-white hover:text-blue-600 text-sm font-bold transition-colors duration-200"
                >
                  Contact
                </Link>
              </li>
            </ul>
            <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg text-base font-medium hover:opacity-90 transition-opacity duration-200 shadow-lg">
              Get Started
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default NavBar;
