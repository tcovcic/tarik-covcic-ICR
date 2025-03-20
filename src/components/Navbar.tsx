
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const location = useLocation();
  const { totalItems } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-8",
        scrolled
          ? "bg-white/95 backdrop-blur-sm shadow-sm py-2"
          : "bg-transparent py-4"
      )}
    >
      <div className="sneaker-container flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center"
        >
          <h1 className="font-serif text-sneaker text-2xl md:text-3xl font-bold">
            Sneaker zone
          </h1>
        </Link>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="sr-only">Menu</span>
          <div className="w-6 flex flex-col gap-1">
            <span className={`block h-0.5 w-6 bg-gray-800 transform transition-all duration-300 ${mobileMenuOpen ? 'translate-y-1.5 rotate-45' : ''}`}></span>
            <span className={`block h-0.5 w-6 bg-gray-800 transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`block h-0.5 w-6 bg-gray-800 transform transition-all duration-300 ${mobileMenuOpen ? '-translate-y-1.5 -rotate-45' : ''}`}></span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            to="/" 
            className={cn("nav-link", isActive("/") && "nav-link-active")}
          >
            Početna
          </Link>
          <Link 
            to="/novosti" 
            className={cn("nav-link", isActive("/novosti") && "nav-link-active")}
          >
            Novosti
          </Link>
          <Link 
            to="/o-nama" 
            className={cn("nav-link", isActive("/o-nama") && "nav-link-active")}
          >
            Ko smo mi
          </Link>
          <Link 
            to="/profil" 
            className={cn("nav-link", isActive("/profil") && "nav-link-active")}
          >
            Moj profil
          </Link>
          <Link 
            to="/korpa" 
            className={cn(
              "flex items-center px-4 py-2 bg-sneaker text-white rounded-md transition-transform duration-300 hover:scale-105",
              isActive("/korpa") && "bg-sneaker-dark"
            )}
          >
            <ShoppingBag className="mr-1" size={16} />
            <span>Korpa {totalItems > 0 && `(${totalItems})`}</span>
          </Link>
        </nav>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg animate-fade-in md:hidden">
            <div className="flex flex-col p-4 space-y-3">
              <Link 
                to="/" 
                className={cn("nav-link py-3 border-b", isActive("/") && "nav-link-active")}
                onClick={() => setMobileMenuOpen(false)}
              >
                Početna
              </Link>
              <Link 
                to="/novosti" 
                className={cn("nav-link py-3 border-b", isActive("/novosti") && "nav-link-active")}
                onClick={() => setMobileMenuOpen(false)}
              >
                Novosti
              </Link>
              <Link 
                to="/o-nama" 
                className={cn("nav-link py-3 border-b", isActive("/o-nama") && "nav-link-active")}
                onClick={() => setMobileMenuOpen(false)}
              >
                Ko smo mi
              </Link>
              <Link 
                to="/profil" 
                className={cn("nav-link py-3 border-b", isActive("/profil") && "nav-link-active")}
                onClick={() => setMobileMenuOpen(false)}
              >
                Moj profil
              </Link>
              <Link 
                to="/korpa" 
                className={cn(
                  "flex items-center justify-center py-3 bg-sneaker text-white rounded-md",
                  isActive("/korpa") && "bg-sneaker-dark"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                <ShoppingBag className="mr-1" size={16} />
                <span>Korpa {totalItems > 0 && `(${totalItems})`}</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
