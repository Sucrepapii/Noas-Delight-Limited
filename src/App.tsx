import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FoodBowls } from './components/FoodBowls';
import { Services } from './components/Services';
import { Delivery } from './components/Delivery';
import { Footer } from './components/Footer';
export function App() {
  return <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <FoodBowls />
        <Services />
        <Delivery />
      </main>
      <Footer />
    </div>;
}