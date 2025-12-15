import React, { useState, useRef, useEffect } from 'react';
import { Users2Icon, CalendarIcon, ChefHatIcon, X, ImagesIcon, PlayIcon, ChevronLeft, ChevronRight, VolumeX } from 'lucide-react';
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div 
        ref={modalRef}
        className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
      >
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
    <div className="relative w-full">
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        className="w-full h-auto max-h-[500px] object-contain cursor-pointer"
        onClick={togglePlayPause}
      />
      <button
        onClick={togglePlayPause}
        className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-all z-10"
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
        <span className="inline-flex items-center gap-1 bg-gray-900 bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
          <VolumeX size={14} />
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
  const [videoThumbnails, setVideoThumbnails] = useState<{[key: string]: string}>({});
  const [loadingThumbnails, setLoadingThumbnails] = useState<{[key: string]: boolean}>({});

  // Event media
  const eventMedia: MediaItem[] = [
    // Images
    {
      src: "/images/WhatsApp Image 2025-10-16 at 21.57.11.jpeg",
      type: 'image'
    },
    {
      src: "/images/WhatsApp Image 2025-10-16 at 21.57.12 (1).jpeg",
      type: 'image'
    },
    {
      src: "/images/WhatsApp Image 2025-10-16 at 21.57.12 (2).jpeg",
      type: 'image'
    },
    {
      src: "/images/WhatsApp Image 2025-10-16 at 21.57.12 (5).jpeg",
      type: 'image'
    },
    {
      src: "/images/WhatsApp Image 2025-10-16 at 21.57.12 (6).jpeg",
      type: 'image'
    },
    {
      src: "/images/WhatsApp Image 2025-10-16 at 21.57.12.jpeg",
      type: 'image'
    },
    {
      src: "/images/WhatsApp Image 2025-10-16 at 21.57.13 (1).jpeg",
      type: 'image'
    },
    {
      src: "/images/WhatsApp Image 2025-10-16 at 21.57.13.jpeg",
      type: 'image'
    },
    {
      src: "/images/bridal shower (2).jpeg",
      type: 'image'
    },
    {
      src: "/images/bridal shower (3).jpeg",
      type: 'image'
    },
    // Videos
    {
      src: "/videos/video%201%20(1).mp4",
      type: 'video',
    },
    {
      src: "/videos/video%201%20(2).mp4",
      type: 'video',
    },
    {
      src: "/videos/video%201%20(3).mp4",
      type: 'video',
    },
    {
      src: "/videos/video%201%20(4).mp4",
      type: 'video',
    },
    {
      src: "/images/bridal shower (1).mp4",
      type: 'video',
    }
  ];

  // Function to generate video thumbnail from first frame
  const generateVideoThumbnail = (videoSrc: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      // Check if thumbnail already exists
      if (videoThumbnails[videoSrc]) {
        resolve(videoThumbnails[videoSrc]);
        return;
      }

      // Mark as loading
      setLoadingThumbnails(prev => ({ ...prev, [videoSrc]: true }));

      const video = document.createElement('video');
      video.crossOrigin = 'anonymous';
      video.preload = 'metadata';
      video.muted = true;
      video.playsInline = true;
      
      // Set current time to 0.1 seconds to ensure we get a frame
      video.currentTime = 0.1;
      
      video.onloadeddata = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }
        
        // Set canvas dimensions to match video dimensions
        canvas.width = video.videoWidth || 320;
        canvas.height = video.videoHeight || 180;
        
        // Draw the video frame to canvas
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Convert canvas to data URL
        const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
        
        // Update state with new thumbnail
        setVideoThumbnails(prev => ({ ...prev, [videoSrc]: dataUrl }));
        setLoadingThumbnails(prev => ({ ...prev, [videoSrc]: false }));
        
        // Clean up
        video.remove();
        resolve(dataUrl);
      };
      
      video.onerror = () => {
        setLoadingThumbnails(prev => ({ ...prev, [videoSrc]: false }));
        video.remove();
        reject(new Error('Failed to load video for thumbnail'));
      };
      
      // Start loading the video
      video.src = videoSrc;
    });
  };

  // Effect to generate thumbnails for videos on component mount
  useEffect(() => {
    const videoItems = eventMedia.filter(item => item.type === 'video');
    
    videoItems.forEach(item => {
      if (!videoThumbnails[item.src] && !loadingThumbnails[item.src]) {
        generateVideoThumbnail(item.src).catch(error => {
          console.error('Failed to generate thumbnail for:', item.src, error);
        });
      }
    });
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

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, filteredMedia.length]);

  const handleNext = () => {
    if (filteredMedia.length === 0) return;
    setSelectedIndex((prev) => (prev + 1) % filteredMedia.length);
  };

  const handlePrev = () => {
    if (filteredMedia.length === 0) return;
    setSelectedIndex((prev) => (prev - 1 + filteredMedia.length) % filteredMedia.length);
  };

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
      return (
        <img 
          src={thumbnail} 
          alt="Video thumbnail"
          className="w-full h-full object-cover"
        />
      );
    }

    // Fallback while thumbnail is being generated
    return (
      <div className="w-full h-full bg-gray-800 flex items-center justify-center">
        <div className="flex items-center gap-2 text-white">
          <PlayIcon size={16} className="text-orange-400" />
          <span className="text-xs">Loading...</span>
        </div>
      </div>
    );
  };

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Our Past Events Gallery
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Browse through our past catering events and see the quality of our work
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex justify-center mb-8 space-x-4">
          <button 
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-md text-sm transition-colors ${
              activeFilter === 'all' 
                ? 'bg-orange-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All Media
          </button>
          <button 
            onClick={() => setActiveFilter('images')}
            className={`px-4 py-2 rounded-md text-sm transition-colors ${
              activeFilter === 'images' 
                ? 'bg-orange-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Images
          </button>
          <button 
            onClick={() => setActiveFilter('videos')}
            className={`px-4 py-2 rounded-md text-sm transition-colors ${
              activeFilter === 'videos' 
                ? 'bg-orange-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Videos
          </button>
        </div>

        {/* Main carousel area */}
        <div className="mb-12">
          {/* Current item counter */}
          <div className="text-gray-600 text-center mb-4">
            <span className="bg-gray-100 px-3 py-1 rounded-full">
              {selectedIndex + 1} / {filteredMedia.length}
            </span>
          </div>

          {/* Main media display */}
          <div className="relative bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
            {hasMedia ? (
              <>
                {/* Previous button */}
                <button 
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-all z-10"
                  aria-label="Previous"
                >
                  <ChevronLeft size={24} />
                </button>

                {/* Media content */}
                <div className="flex items-center justify-center min-h-[500px]">
                  {currentMedia.type === 'image' ? (
                    <img 
                      src={currentMedia.src} 
                      alt="Event gallery"
                      className="w-full h-auto max-h-[500px] object-contain"
                      onError={(e) => {
                        // Fallback for broken images
                        (e.target as HTMLImageElement).src = "https://via.placeholder.com/800x500?text=Image+Not+Found";
                      }}
                    />
                  ) : (
                    <CustomVideoPlayer src={currentMedia.src} />
                  )}
                </div>

                {/* Next button */}
                <button 
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-all z-10"
                  aria-label="Next"
                >
                  <ChevronRight size={24} />
                </button>

                {/* Media type indicator */}
                <div className="absolute top-4 right-4">
                  <span className="inline-block bg-orange-600 text-white px-3 py-1 rounded-full text-sm">
                    {currentMedia.type === 'image' ? 'IMAGE' : 'VIDEO'}
                  </span>
                </div>
              </>
            ) : (
              <div className="text-white text-center py-24">
                <p className="text-xl">No media found for the selected filter.</p>
              </div>
            )}
          </div>
        </div>

        {/* Thumbnail strip */}
        {hasMedia && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
              Browse All Media
            </h3>
            <div className="flex overflow-x-auto space-x-4 pb-4 px-2">
              {filteredMedia.map((media, index) => (
                <button
                  key={`${media.src}-${index}`}
                  onClick={() => handleThumbnailClick(index)}
                  className={`flex-shrink-0 w-32 h-24 rounded-lg overflow-hidden border-2 transition-all relative ${
                    index === selectedIndex 
                      ? 'border-orange-600 ring-2 ring-orange-400' 
                      : 'border-transparent hover:border-gray-400'
                  }`}
                >
                  {media.type === 'image' ? (
                    <img 
                      src={media.src} 
                      alt={`Event ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback for broken images
                        (e.target as HTMLImageElement).src = "https://via.placeholder.com/128x96?text=Image";
                      }}
                    />
                  ) : (
                    <>
                      <VideoThumbnail src={media.src} />
                      {/* Video play indicator overlay */}
                      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                        <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center">
                          <PlayIcon size={16} className="text-white ml-0.5" />
                        </div>
                      </div>
                      <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1 rounded">
                        VIDEO
                      </div>
                    </>
                  )}
                  {/* Selected indicator */}
                  {index === selectedIndex && (
                    <div className="absolute top-1 left-1">
                      <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Description */}
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Use arrow keys or click thumbnails to navigate through our gallery
          </p>
          <p className="text-gray-500">
            Want to see more or discuss your own event? Contact us today!
          </p>
          <a 
            href="https://wa.me/447405336637" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block mt-6 bg-orange-600 text-white px-6 py-3 rounded-md hover:bg-orange-700 transition-colors"
          >
            Book Your Event
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
      <h2 className="text-xl font-bold text-orange-600 text-center">Place Your Order</h2>

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
        className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition"
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
        className="w-full bg-orange-600 text-white font-bold py-3 rounded hover:bg-orange-700 transition"
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
    <>
      <section id="services" className="py-16 bg-orange-50">
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
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Users2Icon size={24} className="text-orange-600" />
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
                  <span className="w-1.5 h-1.5 bg-orange-600 rounded-full mr-2"></span>
                  <span>Custom menu</span>
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="w-1.5 h-1.5 bg-orange-600 rounded-full mr-2"></span>
                  <span>Dietary accommodations</span>
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="w-1.5 h-1.5 bg-orange-600 rounded-full mr-2"></span>
                  <span>Delivery</span>
                </li>
              </ul>
              
              <button 
                onClick={() => setIsModalOpen(true)}
                className="mt-6 bg-orange-600 text-white px-4 py-2 rounded-md text-sm hover:bg-orange-700 transition-colors"
              >
                Book Now
              </button>
            </div>
            
            {/* Event Catering */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <CalendarIcon size={24} className="text-orange-600" />
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
                  <span className="w-1.5 h-1.5 bg-orange-600 rounded-full mr-2"></span>
                  <span>Professional serving staff</span>
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="w-1.5 h-1.5 bg-orange-600 rounded-full mr-2"></span>
                  <span>Buffet or plated service</span>
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="w-1.5 h-1.5 bg-orange-600 rounded-full mr-2"></span>
                  <span>Event coordination</span>
                </li>
              </ul>
              
              <div className="mt-6 flex flex-col gap-3">
                <a href="https://forms.gle/pThaZWnfJS8G6ZpA8" target="_blank" rel="noopener noreferrer" className="w-full">
                  <button className="w-full bg-orange-600 text-white px-4 py-2 rounded-md text-sm hover:bg-orange-700 transition-colors">
                    Plan Your Event
                  </button>
                </a>
              </div>
            </div>
            
            {/* Online Booking */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <ChefHatIcon size={24} className="text-orange-600" />
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
                  <span className="w-1.5 h-1.5 bg-orange-600 rounded-full mr-2"></span>
                  <span>Simple online form</span>
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="w-1.5 h-1.5 bg-orange-600 rounded-full mr-2"></span>
                  <span>Fast response time</span>
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="w-1.5 h-1.5 bg-orange-600 rounded-full mr-2"></span>
                  <span>Personalized service</span>
                </li>
              </ul>
              <a href="https://wa.me/447405336637" target="_blank" rel="noopener noreferrer">
                <button className="mt-6 bg-orange-600 text-white px-4 py-2 rounded-md text-sm hover:bg-orange-700 transition-colors">
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