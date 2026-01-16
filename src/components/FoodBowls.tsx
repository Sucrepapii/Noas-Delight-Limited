import React from 'react';
import { ArrowRight } from 'lucide-react';

const foodBowls = [
  {
    id: 1,
    name: 'Pastries',
    description: 'Each bite is a perfect balance of savory and slightly sweet, wrapped in a buttery crust that melts in your mouth.',
    price: '£25 - £40',
    image: '/images/3.png'
  },
  {
    id: 2,
    name: 'Egusi Soup',
    description: 'A heartwarming blend of tender meat, fresh vegetables, and rich spices with a subtle touch of sweetness—comfort in every spoonful.',
    price: '£50 - £80',
    image: '/images/4.png'
  },
  {
    id: 3,
    name: 'Small Chops',
    description: 'A delightful assortment of Nigerian snacks, featuring spicy meat pies, crispy spring rolls, and savory puff-puff.',
    price: '£11.99',
    image: '/images/2.png'
  },
  {
    id: 4,
    name: 'Smokey Jollof Rice',
    description: 'A delicious West African dish of rice cooked in a savory tomato sauce with spices, offering a sweet, vibrant flavor.',
    price: '£40 - £70',
    image: '/images/5.png'
  }
];

export function FoodBowls() {
  return (
    <section id="food-bowls" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background blob */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-12 w-64 h-64 bg-orange-50 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            Our Signature Dishes
          </h2>
          <div className="w-24 h-1.5 bg-orange-600 mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Nutritious, delicious, and beautifully crafted food bowls made with
            the freshest ingredients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {foodBowls.map((bowl) => (
            <div key={bowl.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 flex flex-col">
              <div className="h-56 overflow-hidden relative">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10"></div>
                <img
                  src={bowl.image}
                  alt={bowl.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                    {bowl.name}
                  </h3>
                  <span className="text-lg font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-lg">
                    {bowl.price}
                  </span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">
                  {bowl.description}
                </p>
                <div className="mt-auto pt-4 border-t border-gray-100">
                  <span className="text-sm font-semibold text-gray-900 group-hover:text-orange-600 flex items-center gap-1 transition-colors">
                    View Details <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href="/Noa's Delight Ltd.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <button className="bg-white text-gray-900 border-2 border-gray-900 px-8 py-4 rounded-full font-bold hover:bg-gray-900 hover:text-white transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-xl">
              Download Full Menu
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}