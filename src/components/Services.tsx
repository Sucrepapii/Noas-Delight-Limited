import React, { useState, useRef, useEffect } from 'react';
import { Users2Icon, CalendarIcon, ChefHatIcon, X, ImagesIcon, PlayIcon, ChevronLeft, ChevronRight, VolumeX } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { sendOrderEmail } from '../services/emailService';

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

type MediaItem = {
  src: string;
  type: 'image' | 'video';
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

// Custom hook for click outside detection
const useClickOutside = (ref: React.RefObject<HTMLElement>, callback: () => void) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
};

// Modal component
const Modal = ({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(modalRef, onClose);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-all duration-300">
      <div
        ref={modalRef}
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl animate-fade-in-up"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors p-2 rounded-full hover:bg-gray-100"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

// Custom Video Player Component (muted only, no volume control)
const CustomVideoPlayer = ({ src }: { src: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      // Ensure video is always muted
      videoRef.current.muted = true;
      videoRef.current.volume = 0;

      // Remove any volume controls from the video element
      const video = videoRef.current;
      video.removeAttribute('controls');
    }
  }, [src]);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-black">
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        className="w-full h-full max-h-[60vh] object-contain cursor-pointer"
        onClick={togglePlayPause}
      />
      <button
        onClick={togglePlayPause}
        className={`absolute bottom-6 left-6 bg-white/20 backdrop-blur-md text-white p-3 rounded-full hover:bg-orange-600 hover:scale-110 transition-all z-10 ${isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`}
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
        )}
      </button>
      <div className="absolute top-4 left-4">
        <span className="inline-flex items-center gap-1 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider border border-white/10">
          <VolumeX size={12} />
          MUTED
        </span>
      </div>
    </div>
  );
};

// Gallery Carousel Component
const EventGallery = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState<'all' | 'images' | 'videos'>('all');
  const [videoThumbnails, setVideoThumbnails] = useState<{ [key: string]: string }>({});
  const [loadingThumbnails, setLoadingThumbnails] = useState<{ [key: string]: boolean }>({});

  // Event media
  const eventMedia: MediaItem[] = [
    // Images
    { src: "/images/WhatsApp Image 2025-10-16 at 21.57.11.jpeg", type: 'image' },
    { src: "/images/WhatsApp Image 2025-10-16 at 21.57.12 (1).jpeg", type: 'image' },
    { src: "/images/WhatsApp Image 2025-10-16 at 21.57.12 (2).jpeg", type: 'image' },
    { src: "/images/WhatsApp Image 2025-10-16 at 21.57.12 (5).jpeg", type: 'image' },
    { src: "/images/WhatsApp Image 2025-10-16 at 21.57.12 (6).jpeg", type: 'image' },
    { src: "/images/WhatsApp Image 2025-10-16 at 21.57.12.jpeg", type: 'image' },
    { src: "/images/WhatsApp Image 2025-10-16 at 21.57.13 (1).jpeg", type: 'image' },
    { src: "/images/WhatsApp Image 2025-10-16 at 21.57.13.jpeg", type: 'image' },
    { src: "/images/bridal shower (2).jpeg", type: 'image' },
    { src: "/images/bridal shower (3).jpeg", type: 'image' },
    // Videos
    { src: "/videos/video%201%20(1).mp4", type: 'video' },
    { src: "/videos/video%201%20(2).mp4", type: 'video' },
    { src: "/videos/video%201%20(3).mp4", type: 'video' },
    { src: "/videos/video%201%20(4).mp4", type: 'video' },
    { src: "/images/bridal shower (1).mp4", type: 'video' }
  ];

  // Function to generate video thumbnail from first frame
  const generateVideoThumbnail = (videoSrc: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (videoThumbnails[videoSrc]) {
        resolve(videoThumbnails[videoSrc]);
        return;
      }

      setLoadingThumbnails(prev => ({ ...prev, [videoSrc]: true }));

      const video = document.createElement('video');
      video.crossOrigin = 'anonymous';
      video.preload = 'metadata';
      video.muted = true;
      video.playsInline = true;
      video.currentTime = 0.1;

      video.onloadeddata = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }

        canvas.width = video.videoWidth || 320;
        canvas.height = video.videoHeight || 180;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        try {
          const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
          setVideoThumbnails(prev => ({ ...prev, [videoSrc]: dataUrl }));
          setLoadingThumbnails(prev => ({ ...prev, [videoSrc]: false }));
          video.remove();
          resolve(dataUrl);
        } catch (e) {
          setLoadingThumbnails(prev => ({ ...prev, [videoSrc]: false }));
          video.remove();
          reject(e);
        }
      };

      video.onerror = () => {
        setLoadingThumbnails(prev => ({ ...prev, [videoSrc]: false }));
        video.remove();
        reject(new Error('Failed to load video for thumbnail'));
      };

      video.src = videoSrc;
    });
  };

  // Effect to generate thumbnails
  useEffect(() => {
    const videoItems = eventMedia.filter(item => item.type === 'video');
    videoItems.forEach(item => {
      if (!videoThumbnails[item.src] && !loadingThumbnails[item.src]) {
        generateVideoThumbnail(item.src).catch(err => console.debug("Thumbnail gen error", err));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Filter media based on active filter
  const filteredMedia = eventMedia.filter(media => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'images') return media.type === 'image';
    if (activeFilter === 'videos') return media.type === 'video';
    return true;
  });

  // Reset selected index when filter changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [activeFilter]);

  const handleNext = () => {
    if (filteredMedia.length === 0) return;
    setSelectedIndex((prev) => (prev + 1) % filteredMedia.length);
  };

  const handlePrev = () => {
    if (filteredMedia.length === 0) return;
    setSelectedIndex((prev) => (prev - 1 + filteredMedia.length) % filteredMedia.length);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex, filteredMedia.length]);

  const handleThumbnailClick = (index: number) => {
    setSelectedIndex(index);
  };

  const currentMedia = filteredMedia[selectedIndex];
  const hasMedia = filteredMedia.length > 0;

  // Thumbnail component for videos
  const VideoThumbnail = ({ src }: { src: string }) => {
    const thumbnail = videoThumbnails[src];
    const isLoading = loadingThumbnails[src];

    if (isLoading) {
      return (
        <div className="w-full h-full bg-gray-800 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
        </div>
      );
    }

    if (thumbnail) {
      return <img src={thumbnail} alt="Video thumbnail" className="w-full h-full object-cover" />;
    }

    return (
      <div className="w-full h-full bg-gray-800 flex items-center justify-center">
        <div className="flex items-center gap-2 text-white">
          <PlayIcon size={16} className="text-orange-400" />
        </div>
      </div>
    );
  };

  return (
    <div className="py-24 bg-gray-900 text-white relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-600/10 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-orange-200">
            Our Past Events
          </h2>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Browse through our gallery of exquisite catering moments.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex justify-center mb-10 space-x-1 bg-gray-800/50 p-1 rounded-xl inline-flex mx-auto backdrop-blur-sm border border-gray-700">
          {['all', 'images', 'videos'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter as any)}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${activeFilter === filter
                ? 'bg-orange-600 text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>

        {/* Main carousel area */}
        <div className="mb-12">
          <div className="relative bg-black rounded-3xl overflow-hidden shadow-2xl border border-gray-800 aspect-video max-h-[70vh]">
            {hasMedia ? (
              <>
                {/* Previous button */}
                <button
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-4 rounded-full hover:bg-orange-600 transition-all z-20 backdrop-blur-sm group"
                  aria-label="Previous"
                >
                  <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                </button>

                {/* Media content */}
                <div className="w-full h-full flex items-center justify-center bg-gray-900">
                  {currentMedia.type === 'image' ? (
                    <img
                      src={currentMedia.src}
                      alt="Event gallery"
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://via.placeholder.com/800x500?text=Image+Not+Found";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <CustomVideoPlayer src={currentMedia.src} />
                    </div>
                  )}
                </div>

                {/* Next button */}
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-4 rounded-full hover:bg-orange-600 transition-all z-20 backdrop-blur-sm group"
                  aria-label="Next"
                >
                  <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Counter & Type Badge */}
                <div className="absolute top-6 right-6 flex items-center gap-3">
                  <span className="bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider border border-white/10">
                    {selectedIndex + 1} / {filteredMedia.length}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider border border-white/10 ${currentMedia.type === 'image' ? 'bg-blue-500/80' : 'bg-red-500/80'}`}>
                    {currentMedia.type === 'image' ? 'IMAGE' : 'VIDEO'}
                  </span>
                </div>
              </>
            ) : (
              <div className="text-gray-400 text-center py-24 flex flex-col items-center justify-center h-full">
                <ImagesIcon size={48} className="mb-4 opacity-50" />
                <p className="text-xl">No media found for the selected filter.</p>
              </div>
            )}
          </div>
        </div>

        {/* Thumbnail strip */}
        {hasMedia && (
          <div className="mb-12">
            <div className="flex overflow-x-auto gap-4 pb-4 px-2 scrollbar-hide">
              {filteredMedia.map((media, index) => (
                <button
                  key={`${media.src}-${index}`}
                  onClick={() => handleThumbnailClick(index)}
                  className={`flex-shrink-0 w-32 h-24 rounded-xl overflow-hidden border-2 transition-all duration-300 relative group ${index === selectedIndex
                    ? 'border-orange-500 ring-2 ring-orange-500/30 scale-105'
                    : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                >
                  {media.type === 'image' ? (
                    <img
                      src={media.src}
                      alt={`Event ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://via.placeholder.com/128x96?text=Image";
                      }}
                    />
                  ) : (
                    <>
                      <VideoThumbnail src={media.src} />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-orange-600 transition-colors">
                          <PlayIcon size={14} className="text-white ml-0.5" />
                        </div>
                      </div>
                    </>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="text-center">
          <a
            href="https://wa.me/447405336637"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-orange-600 text-white px-8 py-4 rounded-full font-bold hover:bg-orange-500 transition-all shadow-lg hover:shadow-orange-600/30 transform hover:-translate-y-1"
          >
            <CalendarIcon size={20} />
            Book Your Event Today
          </a>
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
      await sendOrderEmail({ ...form, total: calculateTotal() });

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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Place Your Order</h2>
        <p className="text-gray-500 mt-1">Select your items and we'll handle the rest</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Full Name</label>
          <input
            name="name"
            placeholder="John Doe"
            required
            onChange={handleChange}
            value={form.name}
            className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-gray-50 transition-all outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Phone Number</label>
          <input
            name="phone"
            placeholder="+44 7..."
            required
            onChange={handleChange}
            value={form.phone}
            className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-gray-50 transition-all outline-none"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">Email Address</label>
        <input
          name="email"
          placeholder="john@example.com"
          required
          type="email"
          onChange={handleChange}
          value={form.email}
          className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-gray-50 transition-all outline-none"
        />
      </div>

      <div className="bg-orange-50 p-6 rounded-xl border border-orange-100 space-y-4">
        <h3 className="font-bold text-orange-800 text-lg mb-2">Build Your Menu</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-orange-700 uppercase tracking-wider">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as keyof MenuData)}
              className="w-full border border-orange-200 p-3 rounded-lg bg-white focus:ring-2 focus:ring-orange-500 outline-none"
            >
              {Object.keys(menuData).map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-orange-700 uppercase tracking-wider">Item</label>
            <select
              value={selectedItem}
              onChange={(e) => setSelectedItem(e.target.value)}
              className="w-full border border-orange-200 p-3 rounded-lg bg-white focus:ring-2 focus:ring-orange-500 outline-none"
            >
              <option value="">Select item</option>
              {(menuData[selectedCategory] as (SoupOrProteinOrRice | Side)[]).map((item) => (
                <option key={item.name} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {selectedItem && (menuData[selectedCategory] as SoupOrProteinOrRice[]).find((i) => i.name === selectedItem)?.sizes ? (
            <div className="space-y-1">
              <label className="text-xs font-semibold text-orange-700 uppercase tracking-wider">Size</label>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full border border-orange-200 p-3 rounded-lg bg-white focus:ring-2 focus:ring-orange-500 outline-none"
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
            </div>
          ) : <div className="hidden md:block"></div>}

          <div className="space-y-1">
            <label className="text-xs font-semibold text-orange-700 uppercase tracking-wider">Quantity</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value) || 1)}
              className="w-full border border-orange-200 p-3 rounded-lg bg-white focus:ring-2 focus:ring-orange-500 outline-none"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={addItemToOrder}
          className="w-full bg-orange-600 text-white font-bold py-3 rounded-xl hover:bg-orange-700 transition-all shadow-md hover:shadow-lg active:scale-95"
        >
          Add to Order
        </button>
      </div>

      {form.items.length > 0 && (
        <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="bg-gray-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">£</span>
            Order Summary
          </h3>
          <div className="space-y-3 mb-6">
            {form.items.map((item, i) => (
              <div key={i} className="flex justify-between items-center bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="bg-orange-100 text-orange-800 font-bold px-2 py-1 rounded text-xs">x{item.quantity}</span>
                  <span className="font-medium text-gray-800">{item.description}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-bold text-gray-900">£{item.price}</span>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                    onClick={() => removeItem(i)}
                    aria-label="Remove item"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <span className="text-gray-600 font-medium">Total Amount</span>
            <span className="text-2xl font-extrabold text-orange-600">£{calculateTotal()}</span>
          </div>
        </div>
      )}

      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">Delivery Address</label>
        <textarea
          name="address"
          placeholder="Enter full delivery address..."
          required
          rows={3}
          value={form.address}
          onChange={handleChange}
          className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-gray-50 transition-all outline-none resize-none"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl hover:bg-gray-800 transition-all shadow-xl hover:shadow-2xl active:scale-95 text-lg"
      >
        Submit Order
      </button>

      {status.message && (
        <div className={`mt-4 p-4 rounded-xl text-center font-medium ${status.isError ? "bg-red-50 text-red-600 border border-red-100" : "bg-green-50 text-green-700 border border-green-100"}`}>
          <p>
            {status.message}
            {status.whatsappUrl && (
              <a
                href={status.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors shadow-sm text-sm font-bold ml-2"
              >
                <FaWhatsapp className="text-lg" /> Open in WhatsApp
              </a>
            )}
          </p>
        </div>
      )}
    </form>
  );
};

// Main Services Component
export function Services() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section id="services" className="py-24 bg-orange-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
              Catering Services
            </h2>
            <div className="w-24 h-1.5 bg-orange-600 mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              From intimate gatherings to large corporate events, we provide
              exceptional catering services tailored to your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Individual Catering */}
            <div className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-full -mr-16 -mt-16 group-hover:bg-orange-100 transition-colors"></div>

              <div className="relative w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-8 rotate-3 group-hover:rotate-6 transition-transform">
                <Users2Icon size={32} className="text-orange-600" />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors">
                Individual Catering
              </h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Perfect for small gatherings, dinner parties, or intimate
                celebrations. We create personalized menus tailored to your
                preferences.
              </p>

              <ul className="mb-8 space-y-4">
                {['Custom menu', 'Dietary accommodations', 'Delivery'].map((item) => (
                  <li key={item} className="flex items-center text-gray-700 font-medium">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs mr-3">✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-gray-900 text-white px-6 py-4 rounded-xl font-bold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 group-hover:shadow-lg"
              >
                Book Now
              </button>
            </div>

            {/* Event Catering */}
            <div className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-full -mr-16 -mt-16 group-hover:bg-orange-100 transition-colors"></div>

              <div className="relative w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-8 rotate-3 group-hover:rotate-6 transition-transform">
                <CalendarIcon size={32} className="text-orange-600" />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors">
                Event Catering
              </h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Full-service catering for corporate events, weddings, and large
                gatherings with professional staff and exceptional service.
              </p>

              <ul className="mb-8 space-y-4">
                {['Professional serving staff', 'Buffet or plated service', 'Event coordination'].map((item) => (
                  <li key={item} className="flex items-center text-gray-700 font-medium">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs mr-3">✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              <a href="https://forms.gle/pThaZWnfJS8G6ZpA8" target="_blank" rel="noopener noreferrer" className="block w-full">
                <button className="w-full bg-gray-900 text-white px-6 py-4 rounded-xl font-bold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 group-hover:shadow-lg">
                  Plan Your Event
                </button>
              </a>
            </div>

            {/* Online Booking */}
            <div className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-full -mr-16 -mt-16 group-hover:bg-orange-100 transition-colors"></div>

              <div className="relative w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-8 rotate-3 group-hover:rotate-6 transition-transform">
                <ChefHatIcon size={32} className="text-orange-600" />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors">
                Online Booking
              </h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Easily book our catering services online. Tell us about your event
                and we'll create a custom proposal for you.
              </p>

              <ul className="mb-8 space-y-4">
                {['Simple online form', 'Fast response time', 'Personalized service'].map((item) => (
                  <li key={item} className="flex items-center text-gray-700 font-medium">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs mr-3">✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              <a href="https://wa.me/447405336637" target="_blank" rel="noopener noreferrer" className="block w-full">
                <button className="w-full bg-gray-900 text-white px-6 py-4 rounded-xl font-bold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 group-hover:shadow-lg">
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

      {/* Event Gallery Component */}
      <EventGallery />
    </>
  );
}