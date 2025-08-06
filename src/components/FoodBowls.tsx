import React from 'react';
const foodBowls = [{
  id: 1,
  name: 'Pastries',
  description: 'Each bite is a perfect balance of savory and slightly sweet, wrapped in a buttery crust that melts in your mouth.',
  price: '£25 - £40',
  image: 'src/assets/3.png'
}, {
  id: 2,
  name: 'Egusi Soup',
  description: 'A heartwarming blend of tender meat, fresh vegetables, and rich spices with a subtle touch of sweetness—comfort in every spoonful.',
  price: '£50 - £80',
  image: 'src/assets/4.png'
}, {
  id: 3,
  name: 'Small Chops',
  description: 'A delightful assortment of Nigerian snacks, featuring spicy meat pies, crispy spring rolls, and savory puff-puff, perfect for sharing or enjoying solo.',
  price: '£11.99',
  image: 'src/assets/2.png'
}, {
  id: 4,
  name: 'Smokey Jollof Rice',
  description: 'A delicious West African dish of rice cooked in a savory tomato sauce with spices, offering a sweet, vibrant flavor. Perfectly paired with grilled meats or fried plantains.',
  price: '£40 - £70',
  image: 'src/assets/5.png'
}];
export function FoodBowls() {
  return <section id="food-bowls" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Our Signature Dishes
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Nutritious, delicious, and beautifully crafted food bowls made with
            the freshest ingredients
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {foodBowls.map(bowl => <div key={bowl.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="h-48 overflow-hidden">
                <img src={bowl.image} alt={bowl.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-900">
                  {bowl.name}
                </h3>
                <p className="mt-2 text-gray-600 text-sm">{bowl.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-lg font-bold text-emerald-600">
                    {bowl.price}
                  </span>
                  {/* <button className="bg-emerald-600 text-white px-4 py-2 rounded-md text-sm hover:bg-emerald-700 transition-colors">
                    Add to Cart
                  </button> */}
                </div>
              </div>
            </div>)}
        </div>
        <div className="mt-12 text-center">
          <a href="/Noa's Delight Ltd.pdf" target="_blank" rel="noopener noreferrer">       
          <button className="bg-white text-emerald-600 border border-emerald-600 px-6 py-3 rounded-md font-medium hover:bg-emerald-50 transition-colors">
            View All Food Bowls
          </button>
          </a>
        </div>
      </div>
    </section>;
}