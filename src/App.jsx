import React, { useState, useEffect, useMemo } from 'react';
import { Aperture, ShoppingBag, X, Camera, Sliders, ArrowRight, Instagram, Twitter, Mail, CheckCircle, Upload, Trash2, Lock, LogOut } from 'lucide-react';

// --- FIREBASE CONFIGURATION ---
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Your Actual Keys
const firebaseConfig = {
  apiKey: "AIzaSyCNVB4E50jcIR-5IbAwF1f3W4hzRzQQ14Y",
  authDomain: "photography-portfolio-0.firebaseapp.com",
  projectId: "photography-portfolio-0",
  storageBucket: "photography-portfolio-0.firebasestorage.app",
  messagingSenderId: "532895898046",
  appId: "1:532895898046:web:38501401d42f84f39f01ef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// --- Components ---

const AdminLogin = ({ onLogin }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "admin123") {
      onLogin(true);
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
    <form onSubmit={handleLogin} className="bg-zinc-900 p-8 rounded-lg border border-zinc-800 w-full max-w-sm">
    <div className="flex justify-center mb-6">
    <Lock className="text-white w-8 h-8" />
    </div>
    <h2 className="text-white text-center text-xl font-serif mb-6">Admin Access</h2>
    <input
    type="password"
    placeholder="Enter Password"
    className="w-full bg-black text-white p-3 mb-4 border border-zinc-700 focus:outline-none focus:border-white"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    />
    {error && <p className="text-red-500 text-xs mb-4 text-center">Incorrect password</p>}
    <button className="w-full bg-white text-black py-3 font-bold uppercase tracking-widest hover:bg-zinc-200">
    Enter Dashboard
    </button>
    <button type="button" onClick={() => window.location.reload()} className="w-full mt-4 text-zinc-500 text-xs uppercase hover:text-white">
    Back to Website
    </button>
    </form>
    </div>
  );
};

const AdminDashboard = ({ photos, onUploadSuccess, onDeletePhoto, onLogout }) => {
  const [uploading, setUploading] = useState(false);
  const [newPhoto, setNewPhoto] = useState({
    title: "",
    category: "Urban",
    price: "",
    specs: "",
    desc: "",
    file: null
  });

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setNewPhoto({ ...newPhoto, file: e.target.files[0] });
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!newPhoto.file) return alert("Please select a photo");

    setUploading(true);
    try {
      const storageRef = ref(storage, `photos/${Date.now()}_${newPhoto.file.name}`);
      const snapshot = await uploadBytes(storageRef, newPhoto.file);
      const downloadURL = await getDownloadURL(snapshot.ref);

      await addDoc(collection(db, "photos"), {
        title: newPhoto.title,
        category: newPhoto.category,
        price: Number(newPhoto.price),
                   specs: newPhoto.specs,
                   desc: newPhoto.desc,
                   src: downloadURL,
                   createdAt: new Date()
      });

      alert("Photo uploaded successfully!");
      setNewPhoto({ title: "", category: "Urban", price: "", specs: "", desc: "", file: null });
      onUploadSuccess();
    } catch (error) {
      console.error("Error uploading: ", error);
      alert("Upload failed. Check console.");
    }
    setUploading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
    <div className="max-w-4xl mx-auto">
    <div className="flex justify-between items-center mb-12">
    <h1 className="text-3xl font-serif">Admin Dashboard</h1>
    <button onClick={onLogout} className="flex items-center gap-2 text-zinc-400 hover:text-white">
    <LogOut size={20} /> Logout
    </button>
    </div>

    <div className="bg-zinc-900 p-8 rounded-lg border border-zinc-800 mb-12">
    <h2 className="text-xl mb-6 flex items-center gap-2"><Upload size={20}/> Upload New Photo</h2>
    <form onSubmit={handleUpload} className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <input type="text" placeholder="Title" className="bg-black p-3 border border-zinc-700 text-white" required
    value={newPhoto.title} onChange={e => setNewPhoto({...newPhoto, title: e.target.value})} />

    <select className="bg-black p-3 border border-zinc-700 text-white"
    value={newPhoto.category} onChange={e => setNewPhoto({...newPhoto, category: e.target.value})}>
    <option>Urban</option>
    <option>Nature</option>
    <option>Portrait</option>
    <option>Abstract</option>
    </select>

    <input type="number" placeholder="Price (₹)" className="bg-black p-3 border border-zinc-700 text-white" required
    value={newPhoto.price} onChange={e => setNewPhoto({...newPhoto, price: e.target.value})} />

    <input type="text" placeholder="Specs (e.g. Sony A7 • 35mm)" className="bg-black p-3 border border-zinc-700 text-white" required
    value={newPhoto.specs} onChange={e => setNewPhoto({...newPhoto, specs: e.target.value})} />

    <textarea placeholder="Description" className="bg-black p-3 border border-zinc-700 text-white md:col-span-2" rows="3" required
    value={newPhoto.desc} onChange={e => setNewPhoto({...newPhoto, desc: e.target.value})}></textarea>

    <div className="md:col-span-2">
    <label className="block mb-2 text-zinc-400 text-sm">Select Photo</label>
    <input type="file" onChange={handleFileChange} className="text-white" accept="image/*" required />
    </div>

    <button disabled={uploading} className="md:col-span-2 bg-white text-black py-3 font-bold uppercase tracking-widest hover:bg-zinc-200 disabled:opacity-50">
    {uploading ? "Uploading..." : "Publish Photo"}
    </button>
    </form>
    </div>

    <h2 className="text-xl mb-6">Manage Gallery ({photos.length})</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {photos.map(photo => (
      <div key={photo.id} className="bg-zinc-900 p-4 border border-zinc-800 flex flex-col justify-between">
      <div>
      <img src={photo.src} className="w-full h-40 object-cover mb-4 rounded" />
      <h3 className="font-serif text-lg">{photo.title}</h3>
      <p className="text-zinc-500 text-xs uppercase mb-2">{photo.category}</p>
      </div>
      <button
      onClick={() => onDeletePhoto(photo.id)}
      className="mt-4 flex items-center justify-center gap-2 text-red-400 hover:text-red-300 border border-red-900/30 p-2 w-full"
      >
      <Trash2 size={16} /> Delete
      </button>
      </div>
    ))}
    </div>
    </div>
    </div>
  );
};

// --- Main App Logic ---

export default function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPhotos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "photos"));
      const fetchedPhotos = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPhotos(fetchedPhotos);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching photos:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const deletePhoto = async (id) => {
    if(window.confirm("Are you sure you want to delete this photo?")) {
      await deleteDoc(doc(db, "photos", id));
      fetchPhotos();
    }
  };

  const filteredPhotos = useMemo(() => {
    if (activeCategory === "All") return photos;
    return photos.filter(p => p.category === activeCategory);
  }, [activeCategory, photos]);

  const addToCart = (photo) => {
    setCart([...cart, photo]);
    setToast(`${photo.title} added to cart`);
    setTimeout(() => setToast(null), 3000);
  };

  if (showLogin) return <AdminLogin onLogin={(status) => { setIsAdmin(status); setShowLogin(false); }} />;
  if (isAdmin) return <AdminDashboard photos={photos} onUploadSuccess={fetchPhotos} onDeletePhoto={deletePhoto} onLogout={() => setIsAdmin(false)} />;

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 font-sans antialiased selection:bg-white selection:text-black">
    <style>{`
      ::-webkit-scrollbar { width: 8px; }
      ::-webkit-scrollbar-track { background: #09090b; }
      ::-webkit-scrollbar-thumb { background: #27272a; border-radius: 4px; }
      ::-webkit-scrollbar-thumb:hover { background: #3f3f46; }
      `}</style>

      <nav className="fixed top-0 w-full z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-20">
      <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
      <Aperture className="w-8 h-8 text-white" />
      <span className="font-serif text-xl font-bold tracking-wider text-white">SOUVICK<span className="text-zinc-500">.PHOTO</span></span>
      </div>
      <div className="flex items-center gap-6">

      {/* UPDATED ADMIN BUTTON: Now clearly visible */}
      <button
      onClick={() => setShowLogin(true)}
      className="border border-white/30 px-4 py-2 text-white hover:bg-white hover:text-black transition-all text-xs uppercase tracking-widest font-bold hidden md:block"
      >
      Admin Login
      </button>

      <button onClick={() => setIsCartOpen(true)} className="relative p-2 text-zinc-400 hover:text-white transition-colors group">
      <ShoppingBag className="w-6 h-6 group-hover:scale-110 transition-transform" />
      {cart.length > 0 && (
        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-black transform translate-x-1/4 -translate-y-1/4 bg-white rounded-full">
        {cart.length}
        </span>
      )}
      </button>
      </div>
      </div>
      </div>
      </nav>

      <div className="relative h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center z-0 opacity-40" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2000")' }}></div>
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent z-10"></div>
      <div className="relative z-20 text-center px-4 max-w-4xl pt-20">
      <h1 className="text-4xl md:text-7xl font-serif font-bold text-white mb-6">
      Capturing the <span className="italic text-zinc-400">Silence</span>
      </h1>
      <p className="text-zinc-300 text-lg md:text-xl font-light mb-10 max-w-2xl mx-auto">
      Limited edition prints and digital licenses.
      </p>
      </div>
      </div>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full" id="gallery">
      <div className="flex flex-wrap justify-center gap-6 mb-16">
      {["All", "Urban", "Nature", "Portrait", "Abstract"].map(cat => (
        <button key={cat} onClick={() => setActiveCategory(cat)}
        className={`text-sm uppercase tracking-widest pb-1 border-b-2 transition-all ${activeCategory === cat ? 'text-white border-white' : 'text-zinc-500 border-transparent hover:text-zinc-300'}`}>
        {cat}
        </button>
      ))}
      </div>

      {loading ? (
        <div className="text-center text-zinc-500 py-20">Loading Gallery...</div>
      ) : photos.length === 0 ? (
        <div className="text-center text-zinc-500 py-20">
        <p className="mb-4">No photos found.</p>
        <button onClick={() => setShowLogin(true)} className="text-white underline">Login to upload photos</button>
        </div>
      ) : (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
        {filteredPhotos.map(photo => (
          <div key={photo.id} className="group relative mb-8 break-inside-avoid cursor-pointer overflow-hidden rounded-sm" onClick={() => setSelectedPhoto(photo)}>
          <img src={photo.src} alt={photo.title} loading="lazy" className="w-full h-auto transform transition-transform duration-700 group-hover:scale-105 group-hover:brightness-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
          <p className="text-xs text-zinc-400 uppercase tracking-wider mb-1">{photo.category}</p>
          <h3 className="text-xl text-white font-serif italic mb-2">{photo.title}</h3>
          <p className="text-white font-mono">₹{photo.price}</p>
          </div>
          </div>
        ))}
        </div>
      )}
      </main>

      {selectedPhoto && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setSelectedPhoto(null)}></div>
        <div className="relative bg-zinc-900 w-full max-w-5xl rounded-lg overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
        <div className="w-full md:w-2/3 bg-black flex items-center justify-center p-2 relative">
        <button onClick={() => setSelectedPhoto(null)} className="absolute top-4 left-4 p-2 bg-black/50 text-white rounded-full md:hidden"><X size={20}/></button>
        <img src={selectedPhoto.src} className="max-h-full max-w-full object-contain" />
        </div>
        <div className="w-full md:w-1/3 p-8 flex flex-col overflow-y-auto">
        <div className="flex justify-between mb-6">
        <h2 className="text-3xl font-serif text-white">{selectedPhoto.title}</h2>
        <button onClick={() => setSelectedPhoto(null)} className="hidden md:block text-zinc-500 hover:text-white"><X size={24}/></button>
        </div>
        <p className="text-zinc-300 font-light mb-6">{selectedPhoto.desc}</p>
        <div className="grid grid-cols-2 gap-4 text-sm text-zinc-300 font-mono mb-8 border-t border-zinc-800 pt-6">
        <div className="flex items-center gap-2"><Camera size={16}/> <span>{selectedPhoto.specs}</span></div>
        </div>
        <div className="mt-auto pt-6 border-t border-zinc-800">
        <div className="flex justify-between items-end mb-4">
        <span className="text-zinc-400 text-sm">License</span>
        <span className="text-2xl text-white font-light">₹{selectedPhoto.price}</span>
        </div>
        <button onClick={() => { addToCart(selectedPhoto); setSelectedPhoto(null); }} className="w-full bg-white text-black py-4 font-bold uppercase tracking-widest hover:bg-zinc-200 flex justify-center items-center gap-2">
        Add to Cart <ArrowRight size={18} />
        </button>
        </div>
        </div>
        </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white text-black px-6 py-3 shadow-2xl z-[80] flex items-center gap-3 animate-bounce-in">
        <CheckCircle className="text-green-600 w-5 h-5" />
        <span className="font-medium text-sm tracking-wide">{toast}</span>
        </div>
      )}
      </div>
  );
}
