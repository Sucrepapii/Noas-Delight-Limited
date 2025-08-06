import React, { useState } from 'react';
import { ShoppingCartIcon, MenuIcon, XIcon } from 'lucide-react';
export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return <header className="bg-white shadow-sm sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        {/* Logo */}
        <div className="flex-shrink-0 flex items-center">
          <h1 className="text-2xl font-bold text-emerald-600">
            Noa's Delights
          </h1>
        </div>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <a href="#" className="text-gray-700 hover:text-emerald-600 font-medium">
            Home
          </a>
          <a href="#food-bowls" className="text-gray-700 hover:text-emerald-600 font-medium">
            Food Bowls
          </a>
          <a href="#services" className="text-gray-700 hover:text-emerald-600 font-medium">
            Catering
          </a>
          <a href="#delivery" className="text-gray-700 hover:text-emerald-600 font-medium">
            Delivery
          </a>
          <a href="#" className="text-gray-700 hover:text-emerald-600 font-medium">
            Contact
          </a>
        </nav>
        {/* Cart and Mobile Menu Button */}
        <div className="flex items-center">
          <a href="#services">
            <button className="bg-emerald-100 p-2 rounded-full text-emerald-600 hover:bg-emerald-200 mr-4">
              <ShoppingCartIcon size={20} />
            </button>
          </a>
          <button className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </div>
    </div>
    {/* Mobile Navigation Menu */}
    {isMenuOpen && <div className="md:hidden">
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-md">
        <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">
          Home
        </a>
        <a href="#food-bowls" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">
          Food Bowls
        </a>
        <a href="#services" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">
          Catering
        </a>
        <a href="#delivery" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">
          Delivery
        </a>
        <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">
          Contact
        </a>
      </div>
    </div>}
  </header>;
}