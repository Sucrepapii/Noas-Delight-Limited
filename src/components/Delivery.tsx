import React, { useState } from 'react';
import { TruckIcon, ClockIcon, PackageIcon, MapPinIcon } from 'lucide-react';

export function Delivery() {
  const [isLocating, setIsLocating] = useState(false);

  const handleDeliveryInquiry = async () => {
    setIsLocating(true);
    let locationMessage = "Manchester"; // Default location
    
    try {
      // Get user's current position
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: 5000, // 5 second timeout
          maximumAge: 600000, // Accept cached position up to 10 minutes old
          enableHighAccuracy: true // Request best possible accuracy
        });
      });
      
      // Reverse geocode to get city name using Nominatim API
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}&zoom=10&addressdetails=1`
      );
      
      if (!response.ok) throw new Error('Geocoding failed');
      
      const data = await response.json();
      
      // Try to get the most specific location name available
      locationMessage = data.address?.city || 
                       data.address?.town || 
                       data.address?.village || 
                       data.address?.county || 
                       "your location";
      
    } catch (error) {
      console.log("Location detection failed, using default:", error);
    } finally {
      setIsLocating(false);
    }

    // Open WhatsApp with pre-filled message
    const whatsappUrl = `https://wa.me/447405336637?text=${encodeURIComponent(
      `Hi Noa's Delights! I'm interested in Food Delivery services in ${locationMessage}. ` +
      `Please let me know about availability and delivery options.`
    )}`;
    
    window.open(whatsappUrl, '_blank', 'noopener noreferrer');
  };

  return (
    <section id="delivery" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Home Delivery Across the UK
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              We deliver our fresh, ready-to-eat meals nationwide with our
              premium delivery service, ensuring your food arrives in perfect
              condition.
            </p>

            <div className="mt-8 space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <TruckIcon size={24} className="text-orange-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Nationwide Coverage
                  </h3>
                  <p className="mt-1 text-gray-600">
                    We deliver to all major cities and towns across the UK,
                    ensuring everyone can enjoy our delicious food.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <ClockIcon size={24} className="text-orange-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Scheduled Delivery
                  </h3>
                  <p className="mt-1 text-gray-600">
                    Choose your preferred delivery date and time slot for
                    maximum convenience.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <PackageIcon size={24} className="text-orange-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Eco-Friendly Packaging
                  </h3>
                  <p className="mt-1 text-gray-600">
                    All our deliveries use sustainable packaging that keeps your
                    food fresh and reduces environmental impact.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <MapPinIcon size={24} className="text-orange-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Real-Time Tracking
                  </h3>
                  <p className="mt-1 text-gray-600">
                    Track your order in real-time so you always know when to
                    expect your delivery.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="https://www.google.com/maps/@54.702355,-3.276575,6z"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <button className="bg-orange-600 text-white px-6 py-3 rounded-md font-medium hover:bg-orange-700 transition-colors flex items-center">
                  Check Delivery Areas
                  <MapPinIcon size={18} className="ml-2" />
                </button>
              </a>

              <button
                onClick={handleDeliveryInquiry}
                disabled={isLocating}
                className="bg-white text-orange-600 border border-orange-600 px-6 py-3 rounded-md font-medium hover:bg-orange-50 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLocating ? (
                  <>
                    Detecting Your Location
                    <svg 
                      className="animate-spin ml-2 h-5 w-5 text-orange-600" 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24"
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </>
                ) : (
                  <>
                    Delivery Inquiry
                    <TruckIcon size={18} className="ml-2" />
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1521791055366-0d553872125f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
              alt="Food delivery package with fresh meals"
              className="rounded-lg shadow-xl w-full h-auto object-cover"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Fast Delivery</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Most areas within 24-48 hours
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}