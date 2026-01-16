import React, { useState, useRef, useEffect } from 'react';
import { ArrowRightIcon, ChevronDownIcon, PlayIcon } from 'lucide-react';

export function Hero() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-orange-50/80 to-white pt-20 lg:pt-28 pb-16 lg:pb-32">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-64 h-64 bg-orange-300/20 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100/80 text-orange-700 text-sm font-semibold mb-6 border border-orange-200">
              <span className="flex h-2 w-2 rounded-full bg-orange-600"></span>
              Authentic Nigerian Cuisine
            </div>

            <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 tracking-tight leading-[1.1] mb-6">
              Taste the <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-500">Soul</span> of Nigeria
            </h1>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
              Experience the vibrant flavors of homemade Nigerian dishes. From rich soups to spicy proteins, we bring the authentic taste of home directly to your table.
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="relative inline-block" ref={dropdownRef}>
                <button
                  className="bg-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-700 transition-all shadow-lg hover:shadow-orange-500/25 flex items-center gap-2 group"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  Order Now
                  <ChevronDownIcon size={20} className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute left-0 mt-3 w-64 origin-top-left rounded-2xl bg-white shadow-xl ring-1 ring-black/5 focus:outline-none z-20 overflow-hidden animate-in fade-in slide-in-from-top-2">
                    <div className="p-2 space-y-1">
                      <a
                        href="https://wa.me/447405336637"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-700 rounded-xl transition-colors group"
                      >
                        <div className="bg-green-100 p-2 rounded-full group-hover:bg-green-200 transition-colors">
                          <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-8.683-2.031-.967-.272-.297-.471-.297-.917-.297-.446 0-1.168.173-1.763.842-.595.669-2.279 2.23-2.279 5.437 0 3.208 2.333 6.31 2.659 6.757.327.447 4.594 7.02 11.127 9.846 4.356 1.884 5.244 1.512 7.152 1.413 1.908-.099 3.076-1.264 3.522-2.485.446-1.222.446-2.27.372-2.394z" /></svg>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-sm">WhatsApp</span>
                          <span className="text-xs text-gray-500">Quick & Easy</span>
                        </div>
                      </a>

                      <a
                        href="https://www.instagram.com/noasdelights?igsh=enJ1OHJqYTQ5b2hp"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-700 rounded-xl transition-colors group"
                      >
                        <div className="bg-pink-100 p-2 rounded-full group-hover:bg-pink-200 transition-colors">
                          <svg className="w-5 h-5 text-pink-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-sm">Instagram</span>
                          <span className="text-xs text-gray-500">View Gallery</span>
                        </div>
                      </a>
                    </div>
                  </div>
                )}
              </div>

              <a href="/Noa's Delight Ltd.pdf" target="_blank" rel="noopener noreferrer">
                <button className="bg-white text-gray-900 border-2 border-gray-200 px-8 py-4 rounded-full font-bold text-lg hover:border-orange-600 hover:text-orange-600 transition-all flex items-center gap-2">
                  View Menu
                  <ArrowRightIcon size={20} />
                </button>
              </a>
            </div>
          </div>

          <div className="relative">
            {/* Abstract blob behind image */}
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] text-orange-100 opacity-70 z-0">
              <path fill="currentColor" d="M42.7,-64.3C55.9,-54.8,67.6,-44.6,75.7,-32.4C83.8,-20.1,88.4,-5.8,85.6,7.5C82.8,20.8,72.7,33.1,62.1,43.4C51.5,53.7,40.4,61.9,28.6,67.6C16.8,73.3,4.3,76.5,-7.2,74.9C-18.7,73.3,-29.2,66.9,-38.9,59.3C-48.6,51.7,-57.5,42.9,-65.1,32.4C-72.7,21.9,-79,9.7,-78.3,-2.3C-77.6,-14.3,-69.9,-26.1,-60.7,-35.8C-51.5,-45.5,-40.8,-53.1,-29.6,-63.3C-18.4,-73.5,-6.7,-86.3,2.8,-83C12.3,-79.7,24.6,-60.3,31.5,-59.8L42.7,-64.3Z" transform="translate(100 100)" />
            </svg>

            <div className="relative z-10 rotate-3 hover:rotate-0 transition-transform duration-500 ease-out">
              <img
                src="/images/1.png"
                alt="Colorful Nigerian food bowl"
                className="rounded-3xl shadow-2xl w-full h-auto object-cover border-4 border-white"
              />

              {/* Floating badge */}
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl animate-bounce-slow">
                <div className="flex items-center gap-3">
                  <div className="bg-orange-100 p-2 rounded-full">
                    <PlayIcon size={20} className="text-orange-600 fill-orange-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Watch Video</p>
                    <p className="text-xs text-gray-500">See how it's made</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}