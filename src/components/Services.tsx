import React from 'react';
import { Users2Icon, CalendarIcon, ChefHatIcon } from 'lucide-react';
export function Services() {
  return <section id="services" className="py-16 bg-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Catering Services
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            From intimate gatherings to large corporate events, we provide
            exceptional catering services tailored to your needs
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Individual Catering */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
              <Users2Icon size={24} className="text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">
              Individual Catering
            </h3>
            <p className="mt-2 text-gray-600">
              Perfect for small gatherings, dinner parties, or intimate
              celebrations. We create personalized menus tailored to your
              preferences.
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center text-gray-600">
                <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mr-2"></span>
                <span>Custom menu planning</span>
              </li>
              <li className="flex items-center text-gray-600">
                <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mr-2"></span>
                <span>Dietary accommodations</span>
              </li>
              <li className="flex items-center text-gray-600">
                <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mr-2"></span>
                <span>Delivery and setup</span>
              </li>
            </ul>
            
            <button className="mt-6 bg-emerald-600 text-white px-4 py-2 rounded-md text-sm hover:bg-emerald-700 transition-colors">
              Book Now
            </button>
          </div>
          {/* Event Catering */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
              <CalendarIcon size={24} className="text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">
              Event Catering
            </h3>
            <p className="mt-2 text-gray-600">
              Full-service catering for corporate events, weddings, and large
              gatherings with professional staff and exceptional service.
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center text-gray-600">
                <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mr-2"></span>
                <span>Professional serving staff</span>
              </li>
              <li className="flex items-center text-gray-600">
                <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mr-2"></span>
                <span>Buffet or plated service</span>
              </li>
              <li className="flex items-center text-gray-600">
                <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mr-2"></span>
                <span>Event coordination</span>
              </li>
            </ul>
            <a href="https://forms.gle/pThaZWnfJS8G6ZpA8" target="_blank" rel="noopener noreferrer">
            <button className="mt-6 bg-emerald-600 text-white px-4 py-2 rounded-md text-sm hover:bg-emerald-700 transition-colors">
              Plan Your Event
            </button>
            </a>
          </div>
          {/* Online Booking */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
              <ChefHatIcon size={24} className="text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">
              Online Booking
            </h3>
            <p className="mt-2 text-gray-600">
              Easily book our catering services online. Tell us about your event
              and we'll create a custom proposal for you.
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center text-gray-600">
                <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mr-2"></span>
                <span>Simple online form</span>
              </li>
              <li className="flex items-center text-gray-600">
                <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mr-2"></span>
                <span>Fast response time</span>
              </li>
              <li className="flex items-center text-gray-600">
                <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mr-2"></span>
                <span>Personalized service</span>
              </li>
            </ul>
            <a href="https://wa.me/447405336637" target="_blank" rel="noopener noreferrer">
              
            <button className="mt-6 bg-emerald-600 text-white px-4 py-2 rounded-md text-sm hover:bg-emerald-700 transition-colors">
              Get a Quote
            </button>
            </a>
          </div>
        </div>
      </div>
    </section>;
}