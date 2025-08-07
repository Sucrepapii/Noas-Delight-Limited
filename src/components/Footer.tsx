import React, { useState, useRef, useEffect } from 'react';
import { MailIcon, MapPinIcon, InstagramIcon, FacebookIcon, TwitterIcon, XIcon } from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showCookieModal, setShowCookieModal] = useState(false);
  const termsModalRef = useRef(null);
  const cookieModalRef = useRef(null);

  // Close modals when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showTermsModal && termsModalRef.current && !termsModalRef.current.contains(event.target)) {
        setShowTermsModal(false);
      }
      if (showCookieModal && cookieModalRef.current && !cookieModalRef.current.contains(event.target)) {
        setShowCookieModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showTermsModal, showCookieModal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubscribed(true);
    setEmail('');
    setTimeout(() => {
      setIsSubscribed(false);
    }, 3000);
  };

  const toggleTermsModal = () => {
    setShowTermsModal(!showTermsModal);
  };

  const toggleCookieModal = () => {
    setShowCookieModal(!showCookieModal);
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold text-orange-400 mb-4">
              Noa's Delights Ltd
            </h3>
            <p className="text-gray-300">
              Delivering delicious, nutritious meals across the UK. From
              individual bowls to full event catering.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="https://www.facebook.com/share/1HqTWs7ABg/?mibextid=wwXIfr" className="text-gray-400 hover:text-orange-400">
                <FacebookIcon size={20} />
              </a>
              <a href="https://www.instagram.com/noasdelights?igsh=enJ1OHJqYTQ5b2hp" className="text-gray-400 hover:text-orange-400">
                <InstagramIcon size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400">
                <TwitterIcon size={20} />
              </a>
            </div>
          </div>
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-orange-400">
                  Home
                </a>
              </li>
              <li>
                <a href="#food-bowls" className="text-gray-300 hover:text-orange-400">
                  Food Bowls
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-300 hover:text-orange-400">
                  Catering
                </a>
              </li>
              <li>
                <a href="#delivery" className="text-gray-300 hover:text-orange-400">
                  Delivery
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-orange-400">
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
                <MailIcon size={18} className="text-orange-400 mt-1 mr-2" />
                <span className="text-gray-300">noadelights@yahoo.com</span>
              </li>
              <li className="flex items-start">
                <MapPinIcon size={18} className="text-orange-400 mt-1 mr-2" />
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
            <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="px-4 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button
                type="submit"
                className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors"
              >
                Subscribe
              </button>
              {isSubscribed && (
                <p className="text-green-500 text-sm mt-2">
                  Newsletter subscribed!
                </p>
              )}
            </form>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Noa's Delights Ltd. All rights reserved.
          </p>

          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-orange-400 text-sm">
              Privacy Policy
            </a>
            <button
              onClick={toggleTermsModal}
              className="text-gray-400 hover:text-orange-400 text-sm"
            >
              Terms of Service
            </button>
            <button
              onClick={toggleCookieModal}
              className="text-gray-400 hover:text-orange-400 text-sm"
            >
              Cookie Policy
            </button>
          </div>
        </div>
      </div>

      {/* Terms of Service Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div
            ref={termsModalRef}
            className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-orange-400">Terms of Service</h2>
                <button
                  onClick={toggleTermsModal}
                  className="text-gray-400 hover:text-white"
                >
                  <XIcon size={24} />
                </button>
              </div>
              <div className="text-gray-300 text-sm space-y-4">
                <p>Last Updated: {new Date().toLocaleDateString()}</p>

                <h3 className="font-semibold text-white">1. Use of This Website</h3>
                <p>1.1 The content on this website is for general information only and is subject to change without notice.</p>
                <p>1.2 Noa's Delight Ltd does not guarantee the accuracy, completeness, or suitability of the information provided.</p>

                <h3 className="font-semibold text-white">2. Orders & Services</h3>
                <p>2.1 Food orders are subject to availability and delivery restrictions.</p>
                <p>2.2 We reserve the right to refuse service, cancel orders, or limit quantities at our discretion.</p>

                <h3 className="font-semibold text-white">3. Contact Us</h3>
                <p>For any questions regarding these Terms, please contact us at:</p>
                <p className="mt-2">
                  📧 Email: noadelights@yahoo.com<br />
                  📍 Address: Manchester, United Kingdom
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cookie Policy Modal */}
      {showCookieModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div
            ref={cookieModalRef}
            className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-orange-400">Cookie Policy</h2>
                <button
                  onClick={toggleCookieModal}
                  className="text-gray-400 hover:text-white"
                >
                  <XIcon size={24} />
                </button>
              </div>
              <div className="text-gray-300 text-sm space-y-4">
                <p>Last Updated: {new Date().toLocaleDateString()}</p>

                <h3 className="font-semibold text-white">1. What Are Cookies</h3>
                <p>
                  Cookies are small text files stored on your device when you visit websites.
                  They help websites remember information about your visit.
                </p>

                <h3 className="font-semibold text-white">2. How We Use Cookies</h3>
                <p>Noa's Delight Ltd uses cookies for several purposes:</p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li><strong>Essential Cookies:</strong> Necessary for the website to function</li>
                  <li><strong>Performance Cookies:</strong> Help us understand how visitors use our site</li>
                </ul>

                <h3 className="font-semibold text-white">3. Contact Us</h3>
                <p>
                  If you have questions about our Cookie Policy, please contact us at:
                </p>
                <p className="mt-2">
                  📧 Email: noadelights@yahoo.com<br />
                  📍 Address: Manchester, United Kingdom<br />
                  🏢 Company Number: 15679817
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}