import React from 'react';
import { PhoneIcon, MailIcon, MapPinIcon, InstagramIcon, FacebookIcon, TwitterIcon } from 'lucide-react';
export function Footer() {
  return <footer className="bg-gray-900 text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <h3 className="text-xl font-bold text-emerald-400 mb-4">
            Noa's Delights
          </h3>
          <p className="text-gray-300">
            Delivering delicious, nutritious meals across the UK. From
            individual bowls to full event catering.
          </p>
          <div className="mt-4 flex space-x-4">
            <a href="https://www.facebook.com/share/1HqTWs7ABg/?mibextid=wwXIfr" className="text-gray-400 hover:text-emerald-400">
              <FacebookIcon size={20} />
            </a>
            <a href="https://www.instagram.com/noasdelights?igsh=enJ1OHJqYTQ5b2hp" className="text-gray-400 hover:text-emerald-400">
              <InstagramIcon size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-emerald-400">
              <TwitterIcon size={20} />
            </a>
          </div>
        </div>
        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-gray-300 hover:text-emerald-400">
                Home
              </a>
            </li>
            <li>
              <a href="#food-bowls" className="text-gray-300 hover:text-emerald-400">
                Food Bowls
              </a>
            </li>
            <li>
              <a href="#services" className="text-gray-300 hover:text-emerald-400">
                Catering
              </a>
            </li>
            <li>
              <a href="#delivery" className="text-gray-300 hover:text-emerald-400">
                Delivery
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-300 hover:text-emerald-400">
                About Us
              </a>
            </li>
          </ul>
        </div>
        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <PhoneIcon size={18} className="text-emerald-400 mt-1 mr-2" />
              <span className="text-gray-300">+447405336637</span>
            </li>
            <li className="flex items-start">
              <MailIcon size={18} className="text-emerald-400 mt-1 mr-2" />
              <span className="text-gray-300">noadelights@yahoo.com</span>
            </li>
            <li className="flex items-start">
              <MapPinIcon size={18} className="text-emerald-400 mt-1 mr-2" />
              <span className="text-gray-300">
                Manchester, United Kingdom
              </span>
            </li>
          </ul>
        </div>
        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
          <p className="text-gray-300 mb-4">
            Stay updated with our latest offers and new menu items.
          </p>
          <form className="flex flex-col space-y-2">
            <input type="email" placeholder="Your email address" className="px-4 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500" />
            <button type="submit" className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors">
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} Noa's Delights Ltd. All rights reserved.
        </p>

        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="text-gray-400 hover:text-emerald-400 text-sm">
            Privacy Policy
          </a>
          <a href="#" className="text-gray-400 hover:text-emerald-400 text-sm">
            Terms of Service
          </a>
          <a href="#" className="text-gray-400 hover:text-emerald-400 text-sm">
            Cookie Policy
          </a>
        </div>
      </div>
    </div>
  </footer>;
}