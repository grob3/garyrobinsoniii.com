import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useLocation } from "wouter";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActive = (path: string) => {
    return location === path;
  };

  const navbarClass = isScrolled
    ? "fixed top-0 w-full z-50 transition-all duration-300 bg-black bg-opacity-95"
    : "fixed top-0 w-full z-50 transition-all duration-300 bg-transparent";

  return (
    <nav className={navbarClass}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-white font-display text-2xl font-bold tracking-wider cursor-pointer">
            GR<span className="text-primary">III</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          <a
            href="#about"
            className={`nav-link text-white hover:text-primary transition-colors duration-300 ${
              isActive("#about") ? "active" : ""
            }`}
          >
            About
          </a>
          <a
            href="#resume"
            className={`nav-link text-white hover:text-primary transition-colors duration-300 ${
              isActive("#resume") ? "active" : ""
            }`}
          >
            Resume
          </a>
          <a
            href="#skills"
            className={`nav-link text-white hover:text-primary transition-colors duration-300 ${
              isActive("#skills") ? "active" : ""
            }`}
          >
            Skills
          </a>
          <a
            href="#portfolio"
            className={`nav-link text-white hover:text-primary transition-colors duration-300 ${
              isActive("#portfolio") ? "active" : ""
            }`}
          >
            Portfolio
          </a>
          <a
            href="#contact"
            className={`nav-link text-white hover:text-primary transition-colors duration-300 ${
              isActive("#contact") ? "active" : ""
            }`}
          >
            Contact
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <i className="fas fa-bars text-xl"></i>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-secondary absolute w-full py-4 px-6"
        >
          <div className="flex flex-col space-y-4">
            <a
              href="#about"
              className="text-white hover:text-primary transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </a>
            <a
              href="#resume"
              className="text-white hover:text-primary transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Resume
            </a>
            <a
              href="#skills"
              className="text-white hover:text-primary transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Skills
            </a>
            <a
              href="#portfolio"
              className="text-white hover:text-primary transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Portfolio
            </a>
            <a
              href="#contact"
              className="text-white hover:text-primary transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </a>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
