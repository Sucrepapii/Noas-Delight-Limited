// import { useState } from "react";
// import { FaWhatsapp } from "react-icons/fa";
// import { useState } from "react";
// import { FaWhatsapp } from "react-icons/fa";
// import { sendOrderEmail } from "../services/emailService";

// type SoupOrProteinOrRice = {
//   name: string;
//   sizes: { [size: string]: number };
// };

// type Side = {
//   name: string;
//   price: number;
// };

// type MenuData = {
//   [key: string]: SoupOrProteinOrRice[] | Side[];
//   soups: SoupOrProteinOrRice[];
//   proteins: SoupOrProteinOrRice[];
//   rice: SoupOrProteinOrRice[];
//   sides: Side[];
// };

// const menuData: MenuData = {
//   soups: [
//    { name: "Egusi Soup", sizes: { "2L": 50, "4L": 65, "6L": 80 } },
//     { name: "Ogbono Soup", sizes: { "2L": 58, "4L": 70, "6L": 85 } },
//     { name: "Peppersoup", sizes: { "2L": 50, "4L": 65, "6L": 80 } },
//     { name: "Afang/Edikaikong", sizes: { "2L": 60, "4L": 70, "6L": 80 } },
//     { name: "Efo Riro", sizes: { "2L": 50, "4L": 70, "6L": 85 } },
//     { name: "Seafood Okra", sizes: { "2L": 45, "4L": 55, "6L": 70 } },
//     { name: "Turkey Stew", sizes: { "2L": 55, "4L": 70, "6L": 85 } },
//     { name: "Chicken Stew", sizes: { "2L": 50, "4L": 60, "6L": 75 } },
//     { name: "Beef Stew", sizes: { "2L": 60, "4L": 80, "6L": 90 } },
//     { name: "Goat Meat Stew", sizes: { "2L": 50, "4L": 50, "6L": 80 } },
//     {
//       name: "Assorted/Buka Meat Stew",
//       sizes: { "2L": 65, "4L": 85, "6L": 100 },
//     },
//     { name: "Ayamase Sauce", sizes: { "2L": 60, "4L": 80, "6L": 100 } },
//     { name: "Hake Fish Stew", sizes: { "2L": 60, "4L": 80, "6L": 100 } },
//     { name: "Mackerel Fish Stew", sizes: { "2L": 45, "4L": 55, "6L": 70 } },
//   ],
//   proteins: [
//     { name: "Peppered Beef", sizes: { "2L": 55, "4L": 70, "6L": 90 } },
//     { name: "Peppered Turkey", sizes: { "2L": 45, "4L": 60, "6L": 80 } },
//     { name: "Peppered Goat Meat", sizes: { "2L": 50, "4L": 60, "6L": 80 } },
//     { name: "Peppered Chicken", sizes: { "2L": 45, "4L": 55, "6L": 70 } },
//     { name: "Peppered Assorted Meat", sizes: { "2L": 60, "4L": 75, "6L": 90 } },
//    ],
//   rice: [
//     { name: "Smokey Jollof Rice", sizes: { "2L": 40, "4L": 55, "6L": 70 } },
//     { name: "Fried Rice", sizes: { "2L": 50, "4L": 60, "6L": 80 } },
//     { name: "Native Rice", sizes: { "2L": 45, "4L": 60, "6L": 75 } },
//     { name: "Ofada Rice", sizes: { "2L": 40, "4L": 50, "6L": 60 } },
//     { name: "Stirfry Pasta", sizes: { "2L": 35, "4L": 45, "6L": 50 } },
//    ],
//   sides: [
//       { name: "Meatpie (dozen)", price: 50 },
//     { name: "Puff Puff (dozen)", price: 25 },
//     { name: "Moi-Moi", price: 3 },
//     { name: "Peppered Gizzard Salad", price: 30 },
//     { name: "Sharwama(dozen)", price: 40 },
//   ],
// };

// type OrderItem = {
//   description: string;
//   quantity: number;
//   price: number;
// };

// type FormState = {
//   name: string;
//   phone: string;
//   email: string;
//   order: string;
//   address: string;
//   to_email: string;
//   items: OrderItem[];
// };

// type StatusState = {
//   message: string;
//   isError: boolean;
//   whatsappUrl: string;
// };

// const OrderFormIndividual = () => {
//   const [form, setForm] = useState<FormState>({
//     name: "",
//     phone: "",
//     email: "",
//     order: "",
//     address: "",
//     to_email: "Noadelights@yahoo.com",
//     items: [],
//   });

//   const [selectedCategory, setSelectedCategory] = useState<keyof MenuData>("soups");
//   const [selectedItem, setSelectedItem] = useState<string>("");
//   const [selectedSize, setSelectedSize] = useState<string>("");
//   const [quantity, setQuantity] = useState<number>(1);
//   const [status, setStatus] = useState<StatusState>({ message: "", isError: false, whatsappUrl: "" });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const addItemToOrder = () => {
//     const categoryItems = menuData[selectedCategory] as (SoupOrProteinOrRice | Side)[];
//     if (!selectedItem || ((categoryItems[0] as SoupOrProteinOrRice).sizes && !selectedSize)) return;

//     const item = categoryItems.find((i) => i.name === selectedItem) as SoupOrProteinOrRice | Side | undefined;
//     if (!item) return;
//     let price = 0;
//     let description = selectedItem;

//     if ("sizes" in item) {
//       price = item.sizes[selectedSize] * quantity;
//       description = `${selectedItem} (${selectedSize})`;
//     } else {
//       price = item.price * quantity;
//     }

//     const newItem: OrderItem = { description, quantity, price };

//     setForm((prev) => ({
//       ...prev,
//       items: [...prev.items, newItem],
//       order: [...prev.items, newItem].map((item) => `${item.description} x${item.quantity} - £${item.price}`).join("\n"),
//     }));

//     setSelectedItem("");
//     setSelectedSize("");
//     setQuantity(1);
//   };

//   const removeItem = (index: number) => {
//     const updated = [...form.items];
//     updated.splice(index, 1);
//     setForm((prev) => ({
//       ...prev,
//       items: updated,
//       order: updated.map((item) => `${item.description} x${item.quantity} - £${item.price}`).join("\n"),
//     }));
//   };

//   const calculateTotal = () => form.items.reduce((sum, i) => sum + i.price, 0);

//   const generateWhatsAppMessage = () => {
//     const items = form.items.map((i) => `➡ ${i.description} x${i.quantity} - £${i.price}`).join("\n");
//     return `*NEW ORDER NOTIFICATION*\n\n*Customer:* ${form.name}\n📞 ${form.phone}\n📧 ${form.email}\n\n*Order:*\n${items}\n\n*Total:* £${calculateTotal()}\n🏠 ${form.address}\n🕒 ${new Date().toLocaleString()}`;
//   };

//   const openWhatsApp = (message: string) => {
//     const url = `https://wa.me/447405336637?text=${encodeURIComponent(message)}`;
//     setStatus((s) => ({ ...s, whatsappUrl: url }));
//     const newWindow = window.open(url, "_blank", "noopener,noreferrer");
//     if (!newWindow || newWindow.closed) throw new Error("Popup blocked.");
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (form.items.length === 0) {
//       setStatus({ message: "Add at least one item.", isError: true, whatsappUrl: "" });
//       return;
//     }

//     setStatus({ message: "Processing...", isError: false, whatsappUrl: "" });

//     const message = generateWhatsAppMessage();

//     try {
//       await sendOrderEmail({ ...form, total: calculateTotal() });

//       try {
//         openWhatsApp(message);
//         setStatus({ message: "Order sent. WhatsApp opened.", isError: false, whatsappUrl: "" });
//       } catch {
//         setStatus({ message: "Email sent! Click below to open WhatsApp.", isError: false, whatsappUrl: `https://wa.me/447405336637?text=${encodeURIComponent(message)}` });
//       }

//       setForm({ name: "", phone: "", email: "", order: "", address: "", to_email: "Noadelights@yahoo.com", items: [] });
//     } catch (error) {
//       setStatus({ message: "Error submitting. Try WhatsApp below.", isError: true, whatsappUrl: `https://wa.me/447405336637?text=${encodeURIComponent(message)}` });
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <h2 className="text-xl font-bold text-primary text-center">Place Your Order</h2>

//       <input name="name" placeholder="Full Name" required onChange={handleChange} value={form.name} className="w-full border px-4 py-2 rounded-md" />
//       <input name="phone" placeholder="Phone Number" required onChange={handleChange} value={form.phone} className="w-full border px-4 py-2 rounded-md" />
//       <input name="email" placeholder="Email" required type="email" onChange={handleChange} value={form.email} className="w-full border px-4 py-2 rounded-md" />

//       <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//         <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value as keyof MenuData)} className="border p-2 rounded">
//           {Object.keys(menuData).map((cat) => (
//             <option key={cat} value={cat}>{cat}</option>
//           ))}
//         </select>

//         <select value={selectedItem} onChange={(e) => setSelectedItem(e.target.value)} className="border p-2 rounded">
//           <option value="">Select item</option>
//           {(menuData[selectedCategory] as (SoupOrProteinOrRice | Side)[]).map((item) => (
//             <option key={item.name} value={item.name}>{item.name}</option>
//           ))}
//         </select>

//         {selectedItem && ((menuData[selectedCategory] as SoupOrProteinOrRice[]).find((i) => i.name === selectedItem)?.sizes) && (
//           <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)} className="border p-2 rounded">
//             <option value="">Select size</option>
//             {Object.keys(((menuData[selectedCategory] as SoupOrProteinOrRice[]).find((i) => i.name === selectedItem) as SoupOrProteinOrRice).sizes).map((size) => (
//               <option key={size} value={size}>{size}</option>
//             ))}
//           </select>
//         )}

//         <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(Number(e.target.value) || 1)} className="border p-2 rounded" />
//       </div>

//       <button type="button" onClick={addItemToOrder} className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition">
//         Add to Order
//       </button>

//       {form.items.length > 0 && (
//         <div className="border p-4 rounded">
//           <h3 className="font-semibold mb-2">Order Summary</h3>
//           {form.items.map((item, i) => (
//             <div key={i} className="flex justify-between mb-1">
//               <span>{item.description} × {item.quantity}</span>
//               <span>£{item.price}</span>
//               <button type="button" className="text-red-500" onClick={() => removeItem(i)}>×</button>
//             </div>
//           ))}
//           <div className="font-bold text-right mt-2">Total: £{calculateTotal()}</div>
//         </div>
//       )}

//       <textarea name="address" placeholder="Delivery Address" required rows={3} value={form.address} onChange={handleChange} className="w-full border p-3 rounded" />

//       <button type="submit" className="w-full bg-primary text-white font-bold py-3 rounded hover:bg-primary-dark">
//         Submit Order
//       </button>

//       {status.message && (
//         <p className={`mt-4 text-center ${status.isError ? "text-red-500" : "text-green-600"}`}>
//           {status.message}
//           {status.whatsappUrl && (
//             <a href={status.whatsappUrl} target="_blank" rel="noopener noreferrer" className="ml-2 inline-flex items-center text-blue-600 hover:underline">
//               <FaWhatsapp className="mr-1" /> Open WhatsApp
//             </a>
//           )}
//         </p>
//       )}
//     </form>
//   );
// };

// export default OrderFormIndividual;