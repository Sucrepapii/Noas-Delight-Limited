import React, { useState, useRef, useEffect } from 'react';
import { MailIcon, MapPinIcon, InstagramIcon, FacebookIcon, TwitterIcon, XIcon, FileText, Loader2 } from 'lucide-react';
import { sendSubscriptionEmail } from '../services/emailService';

export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showCookieModal, setShowCookieModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const termsModalRef = useRef<HTMLDivElement>(null);
  const cookieModalRef = useRef<HTMLDivElement>(null);
  const privacyModalRef = useRef<HTMLDivElement>(null);

  // Close modals when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showTermsModal && termsModalRef.current && !termsModalRef.current.contains(event.target as Node)) {
        setShowTermsModal(false);
      }
      if (showCookieModal && cookieModalRef.current && !cookieModalRef.current.contains(event.target as Node)) {
        setShowCookieModal(false);
      }
      if (showPrivacyModal && privacyModalRef.current && !privacyModalRef.current.contains(event.target as Node)) {
        setShowPrivacyModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showTermsModal, showCookieModal, showPrivacyModal]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await sendSubscriptionEmail(email);
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => {
        setIsSubscribed(false);
      }, 5000);
    } catch (err) {
      console.error('Subscription error:', err);
      setError('Failed to subscribe. Please try again later.');
      setTimeout(() => setError(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleTermsModal = () => {
    setShowTermsModal(!showTermsModal);
  };

  const toggleCookieModal = () => {
    setShowCookieModal(!showCookieModal);
  };

  const togglePrivacyModal = () => {
    setShowPrivacyModal(!showPrivacyModal);
  };

  return (
    <footer className="bg-secondary-900 text-white relative overflow-hidden">
      {/* Decorative top border */}
      <div className="h-2 w-full bg-gradient-to-r from-orange-400 via-orange-600 to-orange-400"></div>

      {/* Background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/5 rounded-full blur-3xl -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-900/10 rounded-full blur-3xl translate-y-24 -translate-x-24"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-orange-200 inline-block mb-2">
                Noa's Delights Ltd
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Delivering delicious, nutritious meals across the UK. From
                individual bowls to full event catering, we bring the taste of excellence to your table.
              </p>
            </div>

            <div className="flex space-x-4">
              <a href="https://www.facebook.com/share/1HqTWs7ABg/?mibextid=wwXIfr" className="bg-gray-800 p-2 rounded-full text-gray-400 hover:text-white hover:bg-orange-600 transition-all duration-300">
                <FacebookIcon size={20} />
              </a>
              <a href="https://www.instagram.com/noasdelights?igsh=enJ1OHJqYTQ5b2hp" className="bg-gray-800 p-2 rounded-full text-gray-400 hover:text-white hover:bg-orange-600 transition-all duration-300">
                <InstagramIcon size={20} />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-full text-gray-400 hover:text-white hover:bg-orange-600 transition-all duration-300">
                <TwitterIcon size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: 'Home', href: '#' },
                { name: 'Food Bowls', href: '#food-bowls' },
                { name: 'Catering Services', href: '#services' },
                { name: 'Delivery Info', href: '#delivery' },
                { name: 'About Us', href: '#' }
              ].map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-400 hover:text-orange-400 transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-orange-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start group">
                <div className="bg-gray-800 p-2 rounded-lg text-orange-500 mr-3 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                  <MailIcon size={18} />
                </div>
                <span className="text-gray-400 mt-1.5 group-hover:text-gray-300 transition-colors">noadelights@yahoo.com</span>
              </li>
              <li className="flex items-start group">
                <div className="bg-gray-800 p-2 rounded-lg text-orange-500 mr-3 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                  <MapPinIcon size={18} />
                </div>
                <span className="text-gray-400 mt-1.5 group-hover:text-gray-300 transition-colors">
                  Manchester, United Kingdom
                </span>
              </li>
              <li className="flex items-start group">
                <div className="bg-gray-800 p-2 rounded-lg text-orange-500 mr-3 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                  <FileText size={18} />
                </div>
                <span className="text-gray-400 mt-1.5 group-hover:text-gray-300 transition-colors">
                  Company No: 15679817
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Subscribe to Our Newsletter</h3>
            <p className="text-gray-400 mb-4 text-sm">
              Stay updated with our latest offers, new menu items, and exclusive discounts.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 bg-gray-800 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 border border-gray-700 transition-all placeholder-gray-500 disabled:opacity-50"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-orange-600 text-white px-4 py-3 rounded-xl font-bold hover:bg-orange-500 transition-all shadow-lg hover:shadow-orange-600/30 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={20} />
                    Subscribing...
                  </>
                ) : (
                  'Subscribe Now'
                )}
              </button>
              {isSubscribed && (
                <div className="bg-green-500/10 border border-green-500/20 text-green-400 px-3 py-2 rounded-lg text-sm text-center animate-in fade-in slide-in-from-top-2">
                  Successfully subscribed!
                </div>
              )}
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-3 py-2 rounded-lg text-sm text-center animate-in fade-in slide-in-from-top-2">
                  {error}
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="text-gray-500">
            © {new Date().getFullYear()} Noa's Delights Ltd. All rights reserved.
          </p>

          <div className="flex space-x-6 mt-4 md:mt-0">
            <button
              onClick={togglePrivacyModal}
              className="text-gray-500 hover:text-orange-400 transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={toggleTermsModal}
              className="text-gray-500 hover:text-orange-400 transition-colors"
            >
              Terms of Service
            </button>
            <button
              onClick={toggleCookieModal}
              className="text-gray-500 hover:text-orange-400 transition-colors"
            >
              Cookie Policy
            </button>
          </div>
        </div>
      </div>

      {/* Terms of Service Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div
            ref={termsModalRef}
            className="bg-gray-900 border border-gray-800 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl"
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Terms of Service</h2>
                <button
                  onClick={toggleTermsModal}
                  className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full text-gray-400 hover:text-white transition-colors"
                >
                  <XIcon size={20} />
                </button>
              </div>
              <div className="text-gray-300 space-y-6 leading-relaxed">
                <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/50">
                  <p className="text-sm">Last Updated: {new Date().toLocaleDateString()}</p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-bold text-white text-lg">1. Use of This Website</h3>
                  <p>1.1 The content on this website is for general information only and is subject to change without notice.</p>
                  <p>1.2 Noa's Delight Ltd does not guarantee the accuracy, completeness, or suitability of the information provided.</p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-bold text-white text-lg">2. Orders & Services</h3>
                  <p>2.1 Food orders are subject to availability and delivery restrictions.</p>
                  <p>2.2 We reserve the right to refuse service, cancel orders, or limit quantities at our discretion.</p>
                </div>

                <div className="space-y-4 border-t border-gray-700 pt-6">
                  <h3 className="font-bold text-white text-lg">Contact Us</h3>
                  <p>For any questions regarding these Terms, please contact us at:</p>
                  <div className="bg-gray-800 p-4 rounded-xl space-y-2">
                    <p className="flex items-center gap-2"><MailIcon size={16} className="text-orange-500" /> noadelights@yahoo.com</p>
                    <p className="flex items-center gap-2"><MapPinIcon size={16} className="text-orange-500" /> Manchester, United Kingdom</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cookie Policy Modal */}
      {showCookieModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div
            ref={cookieModalRef}
            className="bg-gray-900 border border-gray-800 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl"
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Cookie Policy</h2>
                <button
                  onClick={toggleCookieModal}
                  className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full text-gray-400 hover:text-white transition-colors"
                >
                  <XIcon size={20} />
                </button>
              </div>
              <div className="text-gray-300 space-y-6 leading-relaxed">
                <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/50">
                  <p className="text-sm">Last Updated: {new Date().toLocaleDateString()}</p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-bold text-white text-lg">1. What Are Cookies</h3>
                  <p>
                    Cookies are small text files stored on your device when you visit websites.
                    They help websites remember information about your visit.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-bold text-white text-lg">2. How We Use Cookies</h3>
                  <p>Noa's Delight Ltd uses cookies for several purposes:</p>
                  <ul className="list-disc pl-6 space-y-2 mt-2 marker:text-orange-500">
                    <li><strong>Essential Cookies:</strong> Necessary for the website to function</li>
                    <li><strong>Performance Cookies:</strong> Help us understand how visitors use our site</li>
                  </ul>
                </div>

                <div className="space-y-4 border-t border-gray-700 pt-6">
                  <h3 className="font-bold text-white text-lg">Contact Us</h3>
                  <p>
                    If you have questions about our Cookie Policy, please contact us at:
                  </p>
                  <div className="bg-gray-800 p-4 rounded-xl space-y-2">
                    <p className="flex items-center gap-2"><MailIcon size={16} className="text-orange-500" /> noadelights@yahoo.com</p>
                    <p className="flex items-center gap-2"><MapPinIcon size={16} className="text-orange-500" /> Manchester, United Kingdom</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Policy Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div
            ref={privacyModalRef}
            className="bg-gray-900 border border-gray-800 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl"
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Privacy Policy</h2>
                <button
                  onClick={togglePrivacyModal}
                  className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full text-gray-400 hover:text-white transition-colors"
                >
                  <XIcon size={20} />
                </button>
              </div>
              <div className="text-gray-300 space-y-6 leading-relaxed">
                <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/50">
                  <p className="text-sm">Last Updated: {new Date().toLocaleDateString()}</p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-bold text-white text-lg">1. Information We Collect</h3>
                  <p>We collect information you provide directly to us, including:</p>
                  <ul className="list-disc pl-6 space-y-2 mt-2 marker:text-orange-500">
                    <li>Name and contact information (email, phone number)</li>
                    <li>Delivery address</li>
                    <li>Order details and preferences</li>
                    <li>Payment information (processed securely by our third-party payment providers)</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="font-bold text-white text-lg">2. How We Use Your Information</h3>
                  <p>We use the information we collect to:</p>
                  <ul className="list-disc pl-6 space-y-2 mt-2 marker:text-orange-500">
                    <li>Process and deliver your food orders</li>
                    <li>Send you order confirmations and updates</li>
                    <li>Send you newsletters and marketing communications (if you subscribe)</li>
                    <li>Improve our services and website experience</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="font-bold text-white text-lg">3. Data Security</h3>
                  <p>
                    We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                  </p>
                </div>

                <div className="space-y-4 border-t border-gray-700 pt-6">
                  <h3 className="font-bold text-white text-lg">Contact Us</h3>
                  <p>
                    If you have any questions about this Privacy Policy, please contact us at:
                  </p>
                  <div className="bg-gray-800 p-4 rounded-xl space-y-2">
                    <p className="flex items-center gap-2"><MailIcon size={16} className="text-orange-500" /> noadelights@yahoo.com</p>
                    <p className="flex items-center gap-2"><MapPinIcon size={16} className="text-orange-500" /> Manchester, United Kingdom</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}