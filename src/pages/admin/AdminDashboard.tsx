import { useState, useEffect } from 'react';
import { useNavigate, Routes, Route, Link, useLocation } from 'react-router-dom';
import { auth, db } from '../../lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, query, orderBy, onSnapshot, deleteDoc, doc, addDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { LayoutDashboard, Image as ImageIcon, Briefcase, MessageSquare, Settings, LogOut, Menu, X, Plus, Trash2, Megaphone, Check, Star, Edit2 } from 'lucide-react';

export default function AdminDashboard() {
  const [session, setSession] = useState<any>(null);
  const [loadingSession, setLoadingSession] = useState(true);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setSession(user);
      setLoadingSession(false);
      if (!user) {
        navigate('/admin/login', { state: { message: 'Session expired or blocked. If you are in a preview iframe, please open the app in a new tab.' } });
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/admin/login');
  };

  if (loadingSession) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-brand-neon border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!session) return null;

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Portfolio Catalog', path: '/admin/portfolio', icon: <Briefcase size={20} /> },
    { name: 'Announcements', path: '/admin/announcements', icon: <Megaphone size={20} /> },
    { name: 'Messages', path: '/admin/messages', icon: <MessageSquare size={20} /> },
    { name: 'Settings', path: '/admin/settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-[#050806] text-white flex">
      {/* Sidebar */}
      <aside className={`fixed md:relative z-50 w-64 h-screen bg-brand-dark border-r border-white/5 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-6 flex items-center justify-between">
          <div>
            <span className="text-xl font-heading font-bold text-white"><span className="text-brand-neon">AbuSad</span> Admin</span>
            <div className="text-xs text-gray-500 mt-1">{session.email}</div>
          </div>
          <button className="md:hidden text-gray-400 hover:text-white" onClick={() => setSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${location.pathname === item.path ? 'bg-brand-neon/10 text-brand-neon border border-brand-neon/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 w-full p-4 border-t border-white/5">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-500 hover:bg-red-500/10 transition-colors"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="sticky top-0 z-40 bg-[#050806]/80 backdrop-blur-xl border-b border-white/5 p-4 flex items-center gap-4">
          <button className="md:hidden text-gray-400 hover:text-white" onClick={() => setSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
            {navItems.find(i => i.path === location.pathname)?.name || 'Admin Panel'}
          </h2>
        </header>

        <div className="p-6 md:p-10 max-w-7xl mx-auto">
          <Routes>
            <Route path="dashboard" element={<DashboardOverview />} />
            <Route path="portfolio" element={<PortfolioManager />} />
            <Route path="announcements" element={<AnnouncementsManager />} />
            <Route path="messages" element={<MessagesViewer />} />
            <Route path="settings" element={
              <div className="bg-brand-dark border border-white/5 rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-4">System Settings</h3>
                <p className="text-gray-400">Settings coming soon...</p>
              </div>
            } />
          </Routes>
        </div>
      </main>
    </div>
  );
}

function DashboardOverview() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-brand-dark border border-white/5 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5"><MessageSquare size={64} /></div>
          <p className="text-gray-400 font-medium mb-2">New Messages</p>
          <p className="text-4xl font-light font-heading">Active</p>
        </div>
        <div className="bg-brand-neon/10 border border-brand-neon/20 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 text-brand-neon opacity-10"><Briefcase size={64} /></div>
          <p className="text-brand-neon font-medium mb-2">Portfolio Items</p>
          <p className="text-4xl font-light font-heading text-white">Live</p>
        </div>
        <div className="bg-brand-dark border border-white/5 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5"><Megaphone size={64} /></div>
          <p className="text-gray-400 font-medium mb-2">Announcements</p>
          <p className="text-4xl font-light font-heading">Updates</p>
        </div>
      </div>
    </div>
  );
}

function PortfolioManager() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    category: 'Branding',
    mediaUrl: '',
    mediaType: 'image',
    client: '',
    isFavorite: false,
    isBestMedia: false
  });

  useEffect(() => {
    const q = query(collection(db, 'portfolio'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setItems(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateDoc(doc(db, 'portfolio', editingId), {
          ...formData,
          updatedAt: serverTimestamp()
        });
      } else {
        await addDoc(collection(db, 'portfolio'), {
          ...formData,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }
      setIsAdding(false);
      setEditingId(null);
      resetForm();
    } catch (err) {
      console.error(err);
      alert('Failed to save item');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this portfolio item?')) {
      await deleteDoc(doc(db, 'portfolio', id));
    }
  };

  const resetForm = () => {
    setFormData({ title: '', category: 'Branding', mediaUrl: '', mediaType: 'image', client: '', isFavorite: false, isBestMedia: false });
  };

  const editItem = (item: any) => {
    setFormData({
      title: item.title,
      category: item.category,
      mediaUrl: item.mediaUrl,
      mediaType: item.mediaType || 'image',
      client: item.client || '',
      isFavorite: item.isFavorite || false,
      isBestMedia: item.isBestMedia || false
    });
    setEditingId(item.id);
    setIsAdding(true);
  };

  if (isAdding) {
    return (
      <div className="bg-brand-dark border border-white/5 rounded-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">{editingId ? 'Edit' : 'Add'} Portfolio Item</h3>
          <button onClick={() => { setIsAdding(false); setEditingId(null); resetForm(); }} className="p-2 hover:bg-white/10 rounded-lg">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Title</label>
              <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-[#050806] border border-white/10 rounded-xl p-3 focus:border-brand-neon outline-none" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Category</label>
              <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-[#050806] border border-white/10 rounded-xl p-3 focus:border-brand-neon outline-none appearance-none">
                <option>Branding</option>
                <option>Posters</option>
                <option>Social Media Designs</option>
                <option>Animation</option>
                <option>Marketing Designs</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-400 mb-1">Media URL (Image, GIF, MP4)</label>
              <input required value={formData.mediaUrl} onChange={e => setFormData({...formData, mediaUrl: e.target.value})} className="w-full bg-[#050806] border border-white/10 rounded-xl p-3 focus:border-brand-neon outline-none" placeholder="https://..." />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Media Type</label>
              <select value={formData.mediaType} onChange={e => setFormData({...formData, mediaType: e.target.value})} className="w-full bg-[#050806] border border-white/10 rounded-xl p-3 focus:border-brand-neon outline-none appearance-none">
                <option value="image">Image / Graphic</option>
                <option value="video">Video (Auto-play)</option>
                <option value="animation">Animation (GIF/Lottie)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Client / Project</label>
              <input value={formData.client} onChange={e => setFormData({...formData, client: e.target.value})} className="w-full bg-[#050806] border border-white/10 rounded-xl p-3 focus:border-brand-neon outline-none" />
            </div>
          </div>
          
          <div className="flex gap-6 py-4 border-y border-white/5 my-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={formData.isFavorite} onChange={e => setFormData({...formData, isFavorite: e.target.checked})} className="rounded text-brand-neon focus:ring-brand-neon bg-[#050806] border-white/20 w-5 h-5" />
              <span>Mark as Recent Favorite</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={formData.isBestMedia} onChange={e => setFormData({...formData, isBestMedia: e.target.checked})} className="rounded text-brand-neon focus:ring-brand-neon bg-[#050806] border-white/20 w-5 h-5" />
              <span>Mark as Best Media Showcase</span>
            </label>
          </div>

          <button type="submit" className="bg-brand-neon text-brand-dark px-6 py-3 rounded-xl font-bold hover:bg-brand-neon/90 w-full">
            Save Item
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">Portfolio Catalog</h3>
        <button onClick={() => setIsAdding(true)} className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl transition-colors">
          <Plus size={18} /> Add Item
        </button>
      </div>

      {loading ? (
        <div className="text-center py-10"><div className="w-8 h-8 border-4 border-brand-neon border-t-transparent rounded-full animate-spin mx-auto mr-4"></div> Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(item => (
            <div key={item.id} className="bg-brand-dark border border-white/5 rounded-2xl overflow-hidden group">
              <div className="aspect-video relative overflow-hidden bg-[#050806]">
                {item.mediaType === 'video' ? (
                  <video src={item.mediaUrl} className="w-full h-full object-cover" autoPlay muted loop playsInline />
                ) : (
                  <img src={item.mediaUrl} className="w-full h-full object-cover" alt={item.title} />
                )}
                <div className="absolute top-2 right-2 flex gap-2">
                  {item.isFavorite && <span className="bg-brand-neon/80 text-brand-dark text-xs font-bold px-2 py-1 rounded backdrop-blur">Favorite</span>}
                  {item.isBestMedia && <span className="bg-purple-500/80 text-white text-xs font-bold px-2 py-1 rounded backdrop-blur">Best</span>}
                </div>
              </div>
              <div className="p-4 relative">
                <h4 className="font-bold text-lg">{item.title}</h4>
                <p className="text-sm text-brand-neon">{item.category}</p>
                
                <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => editItem(item)} className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-red-500">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function AnnouncementsManager() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    isVisible: true
  });

  useEffect(() => {
    const q = query(collection(db, 'announcements'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setItems(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateDoc(doc(db, 'announcements', editingId), {
          ...formData,
          updatedAt: serverTimestamp()
        });
      } else {
        await addDoc(collection(db, 'announcements'), {
          ...formData,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }
      setIsAdding(false);
      setEditingId(null);
      setFormData({ title: '', content: '', isVisible: true });
    } catch (err) {
      console.error(err);
      alert('Failed to save announcement');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete this announcement?')) {
      await deleteDoc(doc(db, 'announcements', id));
    }
  };

  if (isAdding) {
    return (
      <div className="bg-brand-dark border border-white/5 rounded-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">{editingId ? 'Edit' : 'Add'} Announcement</h3>
          <button onClick={() => { setIsAdding(false); setEditingId(null); setFormData({ title: '', content: '', isVisible: true }); }} className="p-2 hover:bg-white/10 rounded-lg">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Headline</label>
            <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-[#050806] border border-white/10 rounded-xl p-3 focus:border-brand-neon outline-none" placeholder="e.g. Winner of the Web Excellence Award!" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Content / Message</label>
            <textarea required value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} rows={4} className="w-full bg-[#050806] border border-white/10 rounded-xl p-3 focus:border-brand-neon outline-none"></textarea>
          </div>
          
          <label className="flex items-center gap-2 cursor-pointer pt-2">
            <input type="checkbox" checked={formData.isVisible} onChange={e => setFormData({...formData, isVisible: e.target.checked})} className="rounded text-brand-neon focus:ring-brand-neon bg-[#050806] border-white/20 w-5 h-5" />
            <span>Visible to public</span>
          </label>

          <button type="submit" className="bg-brand-neon text-brand-dark px-6 py-3 rounded-xl font-bold hover:bg-brand-neon/90 w-full">
            Publish Announcement
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">Announcements & News</h3>
        <button onClick={() => setIsAdding(true)} className="flex items-center gap-2 bg-brand-neon text-brand-dark font-bold hover:bg-brand-neon/90 px-4 py-2 rounded-xl transition-colors">
          <Megaphone size={18} /> New Post
        </button>
      </div>

      {loading ? (
        <div className="text-center py-10"><div className="w-8 h-8 border-4 border-brand-neon border-t-transparent rounded-full animate-spin mx-auto"></div></div>
      ) : items.length === 0 ? (
        <div className="bg-brand-dark border border-white/5 rounded-2xl p-10 text-center">
          <p className="text-gray-400">No announcements yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map(item => (
            <div key={item.id} className={`bg-brand-dark border ${item.isVisible ? 'border-white/10' : 'border-white/5 opacity-60'} rounded-2xl p-6 relative group`}>
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-xl flex items-center gap-2">
                  {item.title} 
                  {!item.isVisible && <span className="text-xs font-normal bg-white/10 px-2 py-0.5 rounded text-gray-400">Hidden</span>}
                </h4>
                <div className="flex gap-2">
                  <button onClick={() => { setEditingId(item.id); setFormData({ title: item.title, content: item.content, isVisible: item.isVisible }); setIsAdding(true); }} className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/10">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-white/10">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <p className="text-gray-300">{item.content}</p>
              <div className="text-xs text-brand-neon/60 mt-4 font-mono">
                {item.createdAt?.toDate ? item.createdAt.toDate().toLocaleString() : 'Just now'}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function MessagesViewer() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(msgs);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await deleteDoc(doc(db, 'messages', id));
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold">Inbox</h3>
      {loading ? (
        <div className="text-center"><div className="w-8 h-8 border-4 border-brand-neon border-t-transparent rounded-full animate-spin mx-auto mr-4"></div></div>
      ) : messages.length === 0 ? (
        <div className="bg-brand-dark border border-white/5 rounded-2xl p-6 text-center py-20">
          <MessageSquare size={48} className="mx-auto text-gray-600 mb-4" />
          <p className="text-gray-400">No messages yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className="bg-brand-dark border border-white/5 rounded-2xl p-6 relative group">
              <button 
                onClick={() => handleDelete(msg.id)}
                className="absolute top-4 right-4 text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-white/5 rounded-lg"
              >
                <Trash2 size={16} />
              </button>
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                <div>
                  <h4 className="text-lg font-bold text-white">{msg.name}</h4>
                  <a href={`mailto:${msg.email}`} className="text-brand-neon hover:underline text-sm">{msg.email}</a>
                  {msg.phone && <p className="text-sm text-gray-400 mt-1">📞 {msg.phone}</p>}
                </div>
                <div className="text-xs text-gray-500 font-mono bg-white/5 px-3 py-1 rounded-full w-fit">
                  {msg.createdAt?.toDate ? msg.createdAt.toDate().toLocaleString() : 'Just now'}
                </div>
              </div>
              <div className="bg-[#050806] p-4 rounded-xl text-gray-300 whitespace-pre-wrap border border-white/5 text-sm leading-relaxed">
                {msg.message}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
