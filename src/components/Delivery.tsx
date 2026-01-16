import React, { useState } from 'react';
import { TruckIcon, ClockIcon, PackageIcon, MapPinIcon } from 'lucide-react';

export function Delivery() {
  const [isLocating, setIsLocating] = useState(false);

  const handleDeliveryInquiry = async () => {
    setIsLocating(true);
    let locationMessage = "Manchester"; // Default location

    try {
      // Get user's current position
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
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
    <section id="delivery" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background blob */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-50 rounded-full blur-3xl -z-10 translate-y-1/2 translate-x-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="absolute -inset-4 bg-orange-100 rounded-2xl rotate-3 -z-10"></div>
            <img
              src="https://images.unsplash.com/photo-1521791055366-0d553872125f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
              alt="Food delivery package with fresh meals"
              className="rounded-2xl shadow-2xl w-full h-auto object-cover transform hover:scale-[1.02] transition-transform duration-500"
            />
            <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 hidden md:block">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/30"></div>
                <span className="text-lg font-bold text-gray-900">Fast Delivery</span>
              </div>
              <p className="text-gray-500 text-sm">
                Most areas within 24-48 hours
              </p>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6 leading-tight">
              Home Delivery <br />
              <span className="text-orange-600">Across the UK</span>
            </h2>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              We deliver our fresh, ready-to-eat meals nationwide with our
              premium delivery service, ensuring your food arrives in perfect
              condition.
            </p>

            <div className="space-y-8">
              {[
                { icon: TruckIcon, title: "Nationwide Coverage", text: "We deliver to all major cities and towns across the UK, ensuring everyone can enjoy our delicious food." },
                { icon: ClockIcon, title: "Scheduled Delivery", text: "Choose your preferred delivery date and time slot for maximum convenience." },
                { icon: PackageIcon, title: "Eco-Friendly Packaging", text: "All our deliveries use sustainable packaging that keeps your food fresh and reduces environmental impact." },
                { icon: MapPinIcon, title: "Real-Time Tracking", text: "Track your order in real-time so you always know when to expect your delivery." }
              ].map((item, index) => (
                <div key={index} className="flex items-start group">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center group-hover:bg-orange-600 transition-colors duration-300">
                      <item.icon size={24} className="text-orange-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                  </div>
                  <div className="ml-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 flex flex-wrap gap-4">
              <a
                href="https://www.google.com/maps/@54.702355,-3.276575,6z"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <button className="bg-gray-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-orange-600 transition-colors flex items-center shadow-lg hover:shadow-orange-600/30">
                  Check Delivery Areas
                  <MapPinIcon size={20} className="ml-2" />
                </button>
              </a>

              <button
                onClick={handleDeliveryInquiry}
                disabled={isLocating}
                className="bg-white text-gray-900 border-2 border-gray-200 px-8 py-4 rounded-xl font-bold hover:border-orange-600 hover:text-orange-600 transition-all flex items-center disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {isLocating ? (
                  <>
                    Detecting...
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
                    <TruckIcon size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}