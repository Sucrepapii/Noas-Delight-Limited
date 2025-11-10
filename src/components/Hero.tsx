import React, { useState, useRef, useEffect } from 'react';
import { ArrowRightIcon, ChevronDownIcon, XIcon } from 'lucide-react';

export function Hero() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dropdownRef = useRef(null);

  // Show modal when component mounts (on every reload)
  useEffect(() => {
    // Small delay to ensure the page loads first
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {/* Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full relative">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute -top-3 -right-3 bg-white rounded-full p-1 shadow-lg hover:bg-gray-100 transition-colors z-10"
            >
              <XIcon size={20} />
            </button>
            
            {/* Modal Content */}
            <div className="p-1">
              <img 
                src="/images/december.jpeg" // Fixed the path - removed "public"
                alt="Special Offer" 
                className="w-xfull h-auto rounded-t-lg"
              />
              <div className="p-4 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Welcome to Noa's Delight!
                </h3>
                <p className="text-gray-600 mb-4">
                  Discover our authentic Nigerian flavors and special offers just for you.
                </p>
                <button
                  onClick={closeModal}
                  className="bg-orange-600 text-white px-6 py-2 rounded-md font-medium hover:bg-orange-700 transition-colors"
                >
                  Explore Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative bg-orange-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-12 md:py-20 lg:py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
                  Bringing the Heart of Nigeria to your Table
                </h1>
                <p className="mt-4 text-lg text-gray-600">
                  At Noa's Delight Ltd, we believe food should be more than just a meal, it should be an experience. Born out of a passion for flavor, culture, and quality, Noa's Delight is a proudly local food brand offering mouthwatering dishes and snacks that celebrate authentic taste and homemade goodness.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <div className="relative inline-block" ref={dropdownRef}>
                    <button 
                      className="bg-orange-600 text-white px-6 py-3 rounded-md font-medium hover:bg-orange-700 transition-colors flex items-center"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                      Order Now <ChevronDownIcon size={16} className="ml-2" />
                    </button>
                    
                    {isDropdownOpen && (
                      <div className="absolute left-0 mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                        <div className="py-1 flex flex-col space-y-2 p-2">
                          <a 
                            href="https://wa.me/447405336637" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="block"
                          >
                            <button className="w-full bg-white text-orange-600 border border-orange-600 px-4 py-2 rounded-md font-medium hover:bg-emerald-50 transition-colors">
                              Book on Whatsapp
                            </button>
                          </a>
                          <a 
                            href="https://www.instagram.com/noasdelights?igsh=enJ1OHJqYTQ5b2hp" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="block"
                          >
                            <button className="w-full bg-white text-orange-600 border border-orange-600 px-4 py-2 rounded-md font-medium hover:bg-emerald-50 transition-colors">
                              Book on Instagram
                            </button>
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <a href="/Noa's Delight Ltd.pdf" target="_blank" rel="noopener noreferrer">
                    <button className="bg-white text-orange-600 border border-orange-600 px-6 py-3 rounded-md font-medium hover:bg-emerald-50 transition-colors">
                      View Menu
                    </button>
                  </a>
                </div>
              </div>
              <div className="relative h-64 md:h-auto">
                <img src="/images/1.png" alt="Colorful food bowl with fresh ingredients" className="rounded-lg shadow-xl w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}