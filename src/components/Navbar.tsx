import React, { useState, useEffect } from 'react';
import { ShoppingCartIcon, MenuIcon, XIcon } from 'lucide-react';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled
        ? 'bg-white/95 backdrop-blur-md shadow-sm py-2'
        : 'bg-transparent py-4'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <h1 className={`text-2xl font-extrabold tracking-tight transition-colors duration-300 ${scrolled ? 'text-orange-600' : 'text-orange-600'
              }`}>
              Noa's Delights<span className={scrolled ? 'text-gray-900' : 'text-gray-900'}>.</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {['Home', 'Food Bowls', 'Services', 'Delivery', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="text-gray-700 hover:text-orange-600 font-medium text-sm tracking-wide transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 transition-all group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Cart and Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <a href="#services" className="relative group">
              <button className="bg-orange-50 p-2.5 rounded-full text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300 shadow-sm border border-orange-100">
                <ShoppingCartIcon size={20} />
              </button>
            </a>

            <button
              className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`md:hidden absolute w-full bg-white shadow-lg transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}>
        <div className="px-4 pt-2 pb-6 space-y-2">
          {['Home', 'Food Bowls', 'Services', 'Delivery', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              className="block px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}