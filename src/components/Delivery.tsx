import React from 'react';
import { TruckIcon, ClockIcon, PackageIcon, MapPinIcon } from 'lucide-react';

export function Delivery() {
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
              
              <a 
                href="https://wa.me/447405336637" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block"
              >
                <button className="bg-white text-orange-600 border border-orange-600 px-6 py-3 rounded-md font-medium hover:bg-orange-50 transition-colors flex items-center">
                  Delivery Inquiry
                  <TruckIcon size={18} className="ml-2" />
                </button>
              </a>
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