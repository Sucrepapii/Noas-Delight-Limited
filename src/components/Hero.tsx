import React, { useState } from 'react';
import { ArrowRightIcon, ChevronDownIcon } from 'lucide-react';

export function Hero() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
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
                <div className="relative inline-block">
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
  );
}