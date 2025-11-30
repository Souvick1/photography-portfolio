import React, { useState, useEffect, useMemo } from 'react';
import { Aperture, ShoppingBag, X, Camera, Sliders, ArrowRight, Instagram, Twitter, Mail, CheckCircle } from 'lucide-react';

// --- Mock Data ---
const PHOTOS = [
  {
    id: 1,
    title: "Midnight in Tokyo",
    category: "Urban",
    price: 4500,
    src: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1000&auto=format&fit=crop",
    specs: "Sony A7III • 35mm • f/1.4 • ISO 800",
    desc: "A cyber-noir perspective of Tokyo streets during a light rain."
  },
{
  id: 2,
  title: "Himalayan Solitude",
  category: "Nature",
  price: 6000,
  src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1000&auto=format&fit=crop",
  specs: "Canon R5 • 85mm • f/2.8 • ISO 100",
  desc: "The untouched peaks of the Himalayas at golden hour."
},
{
  id: 3,
  title: "The Glassmaker",
  category: "Portrait",
  price: 3500,
  src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
  specs: "Fujifilm XT-4 • 50mm • f/1.2 • ISO 400",
  desc: "An intimate portrait of a master craftsman at work."
},
{
  id: 4,
  title: "Geometric Shadows",
  category: "Abstract",
  price: 2500,
  src: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=1000&auto=format&fit=crop",
  specs: "Leica Q2 • 28mm • f/8 • ISO 200",
  desc: "Architecture meets harsh sunlight creating perfect geometry."
},
{
  id: 5,
  title: "Monsoon Chaos",
  category: "Urban",
  price: 4200,
  src: "https://images.unsplash.com/photo-1515165592879-1849288ca9bf?q=80&w=1000&auto=format&fit=crop",
  specs: "Nikon Z6 • 24mm • f/2.8 • ISO 1600",
  desc: "Capturing the movement of people escaping the sudden downpour."
},
{
  id: 6,
  title: "Silent Lake",
  category: "Nature",
  price: 5500,
  src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=1000&auto=format&fit=crop",
  specs: "Sony A7RIV • 16mm • f/11 • ISO 50",
  desc: "Long exposure shot of a glacial lake at dawn."
},
{
  id: 7,
  title: "Neon Dreams",
  category: "Abstract",
  price: 3000,
  src: "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=1000&auto=format&fit=crop",
  specs: "Canon R6 • 50mm • f/1.8 • ISO 3200",
  desc: "Abstract light trails and bokeh in the city center."
},
{
  id: 8,
  title: "Elder's Wisdom",
  category: "Portrait",
  price: 4000,
  src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop",
  specs: "Sony A7III • 85mm • f/1.4 • ISO 200",
  desc: "A high-contrast black and white portrait emphasizing texture."
}
];

const CATEGORIES = ["All", "Urban", "Nature", "Portrait", "Abstract"];

// --- Components ---

const Navbar = ({ cartCount, onOpenCart }) => (
  <nav className="fixed top-0 w-full z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <div className="flex justify-between items-center h-20">
  <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
  <Aperture className="w-8 h-8 text-white" />
  <span className="font-serif text-xl font-bold tracking-wider text-white">SOUVICK<span className="text-zinc-500">.PHOTO</span></span>
  </div>
  <div className="hidden md:flex space-x-8 text-sm uppercase tracking-widest text-zinc-400">
  <a href="#" className="hover:text-white transition-colors">Portfolio</a>
  <a href="#about" className="hover:text-white transition-colors">About</a>
  <a href="#contact" className="hover:text-white transition-colors">Contact</a>
  </div>
  <div className="flex items-center">
  <button
  onClick={onOpenCart}
  className="relative p-2 text-zinc-400 hover:text-white transition-colors group"
  >
  <ShoppingBag className="w-6 h-6 group-hover:scale-110 transition-transform" />
  {cartCount > 0 && (
    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-black transform translate-x-1/4 -translate-y-1/4 bg-white rounded-full">
    {cartCount}
    </span>
  )}
  </button>
  </div>
  </div>
  </div>
  </nav>
);

const Hero = () => (
  <div className="relative h-[80vh] flex items-center justify-center overflow-hidden">
  {/* Background Parallax Simulation */}
  <div
  className="absolute inset-0 bg-cover bg-center z-0 opacity-50 scale-105"
  style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2000&auto=format&fit=crop")' }}
  ></div>
  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent z-10"></div>

  <div className="relative z-20 text-center px-4 max-w-4xl">
  <p className="text-zinc-400 uppercase tracking-[0.3em] mb-4 text-sm animate-pulse">Fine Art Photography</p>
  <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
  Capturing the <span className="italic text-zinc-400">Silence</span><br/> Between Moments
  </h1>
  <p className="text-zinc-300 text-lg md:text-xl font-light mb-10 max-w-2xl mx-auto">
  Limited edition prints and digital licenses for the discerning collector.
  </p>
  <a href="#gallery" className="inline-block px-8 py-3 border border-white text-white hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-widest text-sm">
  View Collection
  </a>
  </div>
  </div>
);

const PhotoCard = ({ photo, onClick }) => (
  <div
  className="group relative mb-8 break-inside-avoid cursor-pointer overflow-hidden rounded-sm"
  onClick={() => onClick(photo)}
  >
  <img
  src={photo.src}
  alt={photo.title}
  className="w-full h-auto transform transition-transform duration-700 group-hover:scale-105 group-hover:brightness-110"
  loading="lazy"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
  <p className="text-xs text-zinc-400 uppercase tracking-wider mb-1">{photo.category}</p>
  <h3 className="text-xl text-white font-serif italic mb-2">{photo.title}</h3>
  <div className="flex justify-between items-center">
  <span className="text-white font-mono">₹{photo.price}</span>
  <span className="text-xs text-white border border-white/30 px-2 py-1 uppercase tracking-widest hover:bg-white hover:text-black transition-colors">View</span>
  </div>
  </div>
  </div>
);

const Modal = ({ photo, isOpen, onClose, onAddToCart }) => {
  if (!isOpen || !photo) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
    <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose}></div>
    <div className="relative bg-zinc-900 w-full max-w-5xl rounded-lg overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
    {/* Image Section */}
    <div className="w-full md:w-2/3 bg-black flex items-center justify-center p-2 relative">
    <button
    onClick={onClose}
    className="absolute top-4 left-4 p-2 bg-black/50 hover:bg-white hover:text-black text-white rounded-full transition-all md:hidden"
    >
    <X size={20} />
    </button>
    <img
    src={photo.src}
    alt={photo.title}
    className="max-h-full max-w-full object-contain"
    />
    </div>

    {/* Details Section */}
    <div className="w-full md:w-1/3 p-8 md:p-10 flex flex-col overflow-y-auto">
    <div className="flex justify-between items-start mb-6">
    <div>
    <p className="text-zinc-500 text-xs uppercase tracking-[0.2em] mb-2">{photo.category} Collection</p>
    <h2 className="text-3xl font-serif text-white">{photo.title}</h2>
    </div>
    <button onClick={onClose} className="text-zinc-500 hover:text-white hidden md:block">
    <X size={24} />
    </button>
    </div>

    <div className="space-y-6 flex-grow">
    <p className="text-zinc-300 font-light leading-relaxed">
    {photo.desc}
    </p>

    <div className="border-t border-zinc-800 pt-6">
    <h4 className="text-xs text-zinc-500 uppercase tracking-wider mb-3">Technical Specs</h4>
    <div className="grid grid-cols-2 gap-4 text-sm text-zinc-300 font-mono">
    <div className="flex items-center gap-2">
    <Camera size={16} />
    <span>{photo.specs.split('•')[0]}</span>
    </div>
    <div className="flex items-center gap-2">
    <Aperture size={16} />
    <span>{photo.specs.split('•')[2]}</span>
    </div>
    <div className="flex items-center gap-2">
    <Sliders size={16} />
    <span>{photo.specs.split('•')[3]}</span>
    </div>
    </div>
    </div>
    </div>

    <div className="mt-8 pt-6 border-t border-zinc-800">
    <div className="flex justify-between items-end mb-4">
    <span className="text-zinc-400 text-sm">Standard License</span>
    <span className="text-2xl text-white font-light">₹{photo.price}</span>
    </div>
    <button
    onClick={() => {
      onAddToCart(photo);
      onClose();
    }}
    className="w-full bg-white text-black py-4 font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors flex justify-center items-center gap-2"
    >
    Add to Cart <ArrowRight size={18} />
    </button>
    </div>
    </div>
    </div>
    </div>
  );
};

const CartDrawer = ({ isOpen, onClose, cartItems, onRemoveItem }) => {
  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className={`fixed inset-0 z-[70] transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
    <div className={`absolute top-0 right-0 h-full w-full max-w-md bg-zinc-900 shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>

    <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
    <h2 className="text-xl font-serif text-white">Your Selection</h2>
    <button onClick={onClose} className="text-zinc-400 hover:text-white">
    <X size={24} />
    </button>
    </div>

    <div className="flex-1 overflow-y-auto p-6 space-y-6">
    {cartItems.length === 0 ? (
      <div className="h-full flex flex-col items-center justify-center text-zinc-500 space-y-4">
      <ShoppingBag className="w-16 h-16 opacity-20" />
      <p>Your cart is empty.</p>
      <button onClick={onClose} className="text-white underline underline-offset-4">Browse Gallery</button>
      </div>
    ) : (
      cartItems.map((item, index) => (
        <div key={`${item.id}-${index}`} className="flex gap-4">
        <img src={item.src} className="w-20 h-20 object-cover rounded-sm" />
        <div className="flex-1 flex flex-col justify-between">
        <div>
        <h3 className="text-white font-serif">{item.title}</h3>
        <p className="text-zinc-500 text-xs uppercase">{item.category}</p>
        </div>
        <div className="flex justify-between items-center">
        <span className="text-zinc-300">₹{item.price}</span>
        <button onClick={() => onRemoveItem(index)} className="text-zinc-500 hover:text-red-400 text-xs uppercase tracking-wider">Remove</button>
        </div>
        </div>
        </div>
      ))
    )}
    </div>

    {cartItems.length > 0 && (
      <div className="p-6 bg-zinc-950 border-t border-zinc-800">
      <div className="flex justify-between items-center mb-6">
      <span className="text-zinc-400 uppercase tracking-wider text-sm">Total</span>
      <span className="text-2xl text-white font-serif">₹{total}</span>
      </div>
      <button className="w-full bg-white text-black py-4 font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors">
      Proceed to Checkout
      </button>
      <p className="text-center text-zinc-600 text-xs mt-4">Secure payment powered by Stripe (Demo)</p>
      </div>
    )}
    </div>
    </div>
  );
};

const Footer = () => (
  <footer className="bg-zinc-950 border-t border-zinc-900 pt-16 pb-8 px-4" id="contact">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
  <div>
  <h3 className="text-white font-serif text-xl mb-6">Souvick Photography</h3>
  <p className="text-zinc-500 leading-relaxed mb-6">
  Professional imagery capturing the subtle drama of the world around us. Based in India, available worldwide.
  </p>
  <div className="flex gap-4 text-zinc-400">
  <a href="#" className="hover:text-white"><Instagram size={24} /></a>
  <a href="#" className="hover:text-white"><Twitter size={24} /></a>
  <a href="#" className="hover:text-white"><Mail size={24} /></a>
  </div>
  </div>
  <div>
  <h4 className="text-white uppercase tracking-widest text-sm mb-6">Services</h4>
  <ul className="space-y-3 text-zinc-500 text-sm">
  <li><a href="#" className="hover:text-white transition-colors">Commercial Licensing</a></li>
  <li><a href="#" className="hover:text-white transition-colors">Fine Art Prints</a></li>
  <li><a href="#" className="hover:text-white transition-colors">Editorial Assignments</a></li>
  <li><a href="#" className="hover:text-white transition-colors">Workshops</a></li>
  </ul>
  </div>
  <div>
  <h4 className="text-white uppercase tracking-widest text-sm mb-6">Newsletter</h4>
  <p className="text-zinc-500 text-sm mb-4">New collections and exclusive print drops.</p>
  <form className="flex border border-zinc-800 p-1" onSubmit={(e) => e.preventDefault()}>
  <input type="email" placeholder="Email Address" className="bg-transparent text-white px-4 py-2 w-full focus:outline-none" />
  <button className="bg-white text-black px-6 uppercase text-xs font-bold hover:bg-zinc-200">Join</button>
  </form>
  </div>
  </div>
  <div className="text-center border-t border-zinc-900 pt-8 text-zinc-600 text-xs">
  &copy; 2025 Souvick Photography. All Rights Reserved.
  </div>
  </footer>
);

// --- Main App ---

export default function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const filteredPhotos = useMemo(() => {
    if (activeCategory === "All") return PHOTOS;
    return PHOTOS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  const addToCart = (photo) => {
    setCart([...cart, photo]);
    setToast(`${photo.title} added to cart`);
    setTimeout(() => setToast(null), 3000);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 font-sans antialiased selection:bg-white selection:text-black">
    <style>{`
      ::-webkit-scrollbar {
        width: 8px;
      }
      ::-webkit-scrollbar-track {
        background: #09090b;
      }
      ::-webkit-scrollbar-thumb {
        background: #27272a;
        border-radius: 4px;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: #3f3f46;
      }
      .no-scrollbar::-webkit-scrollbar {
        display: none;
      }
      .no-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
      `}</style>

      <Navbar cartCount={cart.length} onOpenCart={() => setIsCartOpen(true)} />

      <Hero />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full" id="gallery">
      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-6 mb-16">
      {CATEGORIES.map(cat => (
        <button
        key={cat}
        onClick={() => setActiveCategory(cat)}
        className={`text-sm uppercase tracking-widest transition-all duration-300 pb-1 border-b-2 ${
          activeCategory === cat
          ? 'text-white border-white'
          : 'text-zinc-500 border-transparent hover:text-zinc-300'
        }`}
        >
        {cat}
        </button>
      ))}
      </div>

      {/* Masonry Grid */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
      {filteredPhotos.map(photo => (
        <PhotoCard
        key={photo.id}
        photo={photo}
        onClick={setSelectedPhoto}
        />
      ))}
      </div>
      </main>

      <Footer />

      {/* Modals & Drawers */}
      <Modal
      photo={selectedPhoto}
      isOpen={!!selectedPhoto}
      onClose={() => setSelectedPhoto(null)}
      onAddToCart={addToCart}
      />

      <CartDrawer
      isOpen={isCartOpen}
      onClose={() => setIsCartOpen(false)}
      cartItems={cart}
      onRemoveItem={removeFromCart}
      />

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white text-black px-6 py-3 shadow-2xl z-[80] flex items-center gap-3 animate-bounce-in">
        <CheckCircle className="text-green-600 w-5 h-5" />
        <span className="font-medium text-sm tracking-wide">{toast}</span>
        </div>
      )}
      </div>
  );
}
