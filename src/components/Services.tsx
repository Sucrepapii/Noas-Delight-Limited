import React, { useState } from 'react';
import { Users2Icon, CalendarIcon, ChefHatIcon, X } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

// Type definitions
type SoupOrProteinOrRice = {
  name: string;
  sizes: { [size: string]: number };
};

type Side = {
  name: string;
  price: number;
};

type MenuData = {
  [key: string]: SoupOrProteinOrRice[] | Side[];
  soups: SoupOrProteinOrRice[];
  proteins: SoupOrProteinOrRice[];
  rice: SoupOrProteinOrRice[];
  sides: Side[];
};

type OrderItem = {
  description: string;
  quantity: number;
  price: number;
};

type FormState = {
  name: string;
  phone: string;
  email: string;
  order: string;
  address: string;
  to_email: string;
  items: OrderItem[];
};

type StatusState = {
  message: string;
  isError: boolean;
  whatsappUrl: string;
};

// Menu data
const menuData: MenuData = {
  soups: [
    { name: "Egusi Soup", sizes: { "2L": 50, "4L": 65, "6L": 80 } },
    { name: "Ogbono Soup", sizes: { "2L": 58, "4L": 70, "6L": 85 } },
    { name: "Peppersoup", sizes: { "2L": 50, "4L": 65, "6L": 80 } },
    { name: "Afang/Edikaikong", sizes: { "2L": 60, "4L": 70, "6L": 80 } },
    { name: "Efo Riro", sizes: { "2L": 50, "4L": 70, "6L": 85 } },
    { name: "Seafood Okra", sizes: { "2L": 45, "4L": 55, "6L": 70 } },
    { name: "Turkey Stew", sizes: { "2L": 55, "4L": 70, "6L": 85 } },
    { name: "Chicken Stew", sizes: { "2L": 50, "4L": 60, "6L": 75 } },
    { name: "Beef Stew", sizes: { "2L": 60, "4L": 80, "6L": 90 } },
    { name: "Goat Meat Stew", sizes: { "2L": 50, "4L": 50, "6L": 80 } },
    {
      name: "Assorted/Buka Meat Stew",
      sizes: { "2L": 65, "4L": 85, "6L": 100 },
    },
    { name: "Ayamase Sauce", sizes: { "2L": 60, "4L": 80, "6L": 100 } },
    { name: "Hake Fish Stew", sizes: { "2L": 60, "4L": 80, "6L": 100 } },
    { name: "Mackerel Fish Stew", sizes: { "2L": 45, "4L": 55, "6L": 70 } },
  ],
  proteins: [
    { name: "Peppered Beef", sizes: { "2L": 55, "4L": 70, "6L": 90 } },
    { name: "Peppered Turkey", sizes: { "2L": 45, "4L": 60, "6L": 80 } },
    { name: "Peppered Goat Meat", sizes: { "2L": 50, "4L": 60, "6L": 80 } },
    { name: "Peppered Chicken", sizes: { "2L": 45, "4L": 55, "6L": 70 } },
    { name: "Peppered Assorted Meat", sizes: { "2L": 60, "4L": 75, "6L": 90 } },
  ],
  rice: [
    { name: "Smokey Jollof Rice", sizes: { "2L": 40, "4L": 55, "6L": 70 } },
    { name: "Fried Rice", sizes: { "2L": 50, "4L": 60, "6L": 80 } },
    { name: "Native Rice", sizes: { "2L": 45, "4L": 60, "6L": 75 } },
    { name: "Ofada Rice", sizes: { "2L": 40, "4L": 50, "6L": 60 } },
    { name: "Stirfry Pasta", sizes: { "2L": 35, "4L": 45, "6L": 50 } },
  ],
  sides: [
    { name: "Meatpie (dozen)", price: 50 },
    { name: "Puff Puff (dozen)", price: 25 },
    { name: "Moi-Moi", price: 3 },
    { name: "Peppered Gizzard Salad", price: 30 },
    { name: "Sharwama(dozen)", price: 40 },
  ],
};

// Modal component
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

// Order Form Component
const OrderFormIndividual = () => {
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    email: "",
    order: "",
    address: "",
    to_email: "Noadelights@yahoo.com",
    items: [],
  });

  const [selectedCategory, setSelectedCategory] = useState<keyof MenuData>("soups");
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [status, setStatus] = useState<StatusState>({ 
    message: "", 
    isError: false, 
    whatsappUrl: "" 
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addItemToOrder = () => {
    const categoryItems = menuData[selectedCategory] as (SoupOrProteinOrRice | Side)[];
    if (!selectedItem || ((categoryItems[0] as SoupOrProteinOrRice).sizes && !selectedSize)) return;

    const item = categoryItems.find((i) => i.name === selectedItem) as SoupOrProteinOrRice | Side | undefined;
    if (!item) return;
    let price = 0;
    let description = selectedItem;

    if ("sizes" in item) {
      price = item.sizes[selectedSize] * quantity;
      description = `${selectedItem} (${selectedSize})`;
    } else {
      price = item.price * quantity;
    }

    const newItem: OrderItem = { description, quantity, price };

    setForm((prev) => ({
      ...prev,
      items: [...prev.items, newItem],
      order: [...prev.items, newItem].map((item) => `${item.description} x${item.quantity} - £${item.price}`).join("\n"),
    }));

    setSelectedItem("");
    setSelectedSize("");
    setQuantity(1);
  };

  const removeItem = (index: number) => {
    const updated = [...form.items];
    updated.splice(index, 1);
    setForm((prev) => ({
      ...prev,
      items: updated,
      order: updated.map((item) => `${item.description} x${item.quantity} - £${item.price}`).join("\n"),
    }));
  };

  const calculateTotal = () => form.items.reduce((sum, i) => sum + i.price, 0);

  const generateWhatsAppMessage = () => {
    const items = form.items.map((i) => `➡ ${i.description} x${i.quantity} - £${i.price}`).join("\n");
    return `*NEW ORDER NOTIFICATION*\n\n*Customer:* ${form.name}\n📞 ${form.phone}\n📧 ${form.email}\n\n*Order:*\n${items}\n\n*Total:* £${calculateTotal()}\n🏠 ${form.address}\n🕒 ${new Date().toLocaleString()}`;
  };

  const openWhatsApp = (message: string) => {
    const url = `https://wa.me/447405336637?text=${encodeURIComponent(message)}`;
    setStatus((s) => ({ ...s, whatsappUrl: url }));
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (!newWindow || newWindow.closed) throw new Error("Popup blocked.");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.items.length === 0) {
      setStatus({ message: "Add at least one item.", isError: true, whatsappUrl: "" });
      return;
    }

    setStatus({ message: "Processing...", isError: false, whatsappUrl: "" });

    const message = generateWhatsAppMessage();

    try {
      await emailjs.send(
        "service_r34v7ej", 
        "template_35bo6df", 
        { ...form, total: calculateTotal() }, 
        "onJvAPlkarQjORVmb"
      );

      try {
        openWhatsApp(message);
        setStatus({ message: "Order sent. WhatsApp opened.", isError: false, whatsappUrl: "" });
      } catch {
        setStatus({ 
          message: "Email sent! Click below to open WhatsApp.", 
          isError: false, 
          whatsappUrl: `https://wa.me/447405336637?text=${encodeURIComponent(message)}` 
        });
      }

      setForm({ 
        name: "", 
        phone: "", 
        email: "", 
        order: "", 
        address: "", 
        to_email: "Noadelights@yahoo.com", 
        items: [] 
      });
    } catch (error) {
      setStatus({ 
        message: "Error submitting. Try WhatsApp below.", 
        isError: true, 
        whatsappUrl: `https://wa.me/447405336637?text=${encodeURIComponent(message)}` 
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold text-emerald-600 text-center">Place Your Order</h2>

      <input 
        name="name" 
        placeholder="Full Name" 
        required 
        onChange={handleChange} 
        value={form.name} 
        className="w-full border px-4 py-2 rounded-md" 
      />
      <input 
        name="phone" 
        placeholder="Phone Number" 
        required 
        onChange={handleChange} 
        value={form.phone} 
        className="w-full border px-4 py-2 rounded-md" 
      />
      <input 
        name="email" 
        placeholder="Email" 
        required 
        type="email" 
        onChange={handleChange} 
        value={form.email} 
        className="w-full border px-4 py-2 rounded-md" 
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <select 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value as keyof MenuData)} 
          className="border p-2 rounded"
        >
          {Object.keys(menuData).map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>

        <select 
          value={selectedItem} 
          onChange={(e) => setSelectedItem(e.target.value)} 
          className="border p-2 rounded"
        >
          <option value="">Select item</option>
          {(menuData[selectedCategory] as (SoupOrProteinOrRice | Side)[]).map((item) => (
            <option key={item.name} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>

        {selectedItem && (menuData[selectedCategory] as SoupOrProteinOrRice[]).find((i) => i.name === selectedItem)?.sizes ? (
          <select 
            value={selectedSize} 
            onChange={(e) => setSelectedSize(e.target.value)} 
            className="border p-2 rounded"
          >
            <option value="">Select size</option>
            {Object.keys(
              ((menuData[selectedCategory] as SoupOrProteinOrRice[])
                .find((i) => i.name === selectedItem) as SoupOrProteinOrRice).sizes
            ).map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        ) : null}

        <input 
          type="number" 
          min="1" 
          value={quantity} 
          onChange={(e) => setQuantity(Number(e.target.value) || 1)} 
          className="border p-2 rounded" 
        />
      </div>

      <button 
        type="button" 
        onClick={addItemToOrder} 
        className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 transition"
      >
        Add to Order
      </button>

      {form.items.length > 0 && (
        <div className="border p-4 rounded">
          <h3 className="font-semibold mb-2">Order Summary</h3>
          {form.items.map((item, i) => (
            <div key={i} className="flex justify-between mb-1">
              <span>{item.description} × {item.quantity}</span>
              <span>£{item.price}</span>
              <button 
                type="button" 
                className="text-red-500" 
                onClick={() => removeItem(i)}
                aria-label="Remove item"
              >
                ×
              </button>
            </div>
          ))}
          <div className="font-bold text-right mt-2">Total: £{calculateTotal()}</div>
        </div>
      )}

      <textarea 
        name="address" 
        placeholder="Delivery Address" 
        required 
        rows={3} 
        value={form.address} 
        onChange={handleChange} 
        className="w-full border p-3 rounded" 
      />

      <button 
        type="submit" 
        className="w-full bg-emerald-600 text-white font-bold py-3 rounded hover:bg-emerald-700 transition"
      >
        Submit Order
      </button>

      {status.message && (
        <p className={`mt-4 text-center ${status.isError ? "text-red-500" : "text-green-600"}`}>
          {status.message}
          {status.whatsappUrl && (
            <a 
              href={status.whatsappUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="ml-2 inline-flex items-center text-blue-600 hover:underline"
            >
              <FaWhatsapp className="mr-1" /> Open WhatsApp
            </a>
          )}
        </p>
      )}
    </form>
  );
};

// Main Services Component
export function Services() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="services" className="py-16 bg-emerald-50">
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
                <span>Custom menu</span>
              </li>
              <li className="flex items-center text-gray-600">
                <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mr-2"></span>
                <span>Dietary accommodations</span>
              </li>
              <li className="flex items-center text-gray-600">
                <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mr-2"></span>
                <span>Delivery</span>
              </li>
            </ul>
            
            <button 
              onClick={() => setIsModalOpen(true)}
              className="mt-6 bg-emerald-600 text-white px-4 py-2 rounded-md text-sm hover:bg-emerald-700 transition-colors"
            >
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

      {/* Modal for Order Form */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <OrderFormIndividual />
      </Modal>
    </section>
  );
}