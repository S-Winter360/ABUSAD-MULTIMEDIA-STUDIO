import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, ExternalLink } from 'lucide-react';
import { db } from '../../lib/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

const defaultCategories = ['All', 'Branding', 'Posters', 'Social Media Designs', 'Animation', 'Marketing Designs'];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [projects, setProjects] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>(defaultCategories);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'portfolio'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedProjects = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProjects(fetchedProjects);
      
      // Update categories dynamically based on fetched data
      const dynamicCategories = Array.from(new Set(fetchedProjects.map(p => p.category))).filter(Boolean);
      setCategories(['All', ...dynamicCategories]);
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Use fallback if no projects are fetched
  const displayProjects = projects.length > 0 ? projects : [
    { id: 'mock1', title: 'Brand Identity Redesign', category: 'Branding', mediaUrl: 'https://i.pinimg.com/1200x/bd/dd/2a/bddd2a086b0f4fedaf5fb5353aa70dd8.jpg', mediaType: 'image', client: 'TechCorp' },
    { id: 'mock2', title: 'Summer Festival Poster', category: 'Posters', mediaUrl: 'https://i.pinimg.com/1200x/72/5d/08/725d0894c7b1d20fd2182b7b00a39063.jpg', mediaType: 'image', client: 'City Events' },
    { id: 'mock3', title: 'Product Launch Campaign', category: 'Social Media Designs', mediaUrl: 'https://picsum.photos/seed/social1/800/600', mediaType: 'image', client: 'Glow Cosmetics' },
    { id: 'mock4', title: 'Explainer Video', category: 'Animation', mediaUrl: 'https://picsum.photos/seed/anim1/800/600', mediaType: 'image', client: 'FinTech Startup' },
    { id: 'mock5', title: 'Corporate Brochure', category: 'Marketing Designs', mediaUrl: 'https://picsum.photos/seed/marketing1/800/600', mediaType: 'image', client: 'Global Logistics' },
    { id: 'mock6', title: 'Minimalist Logo Design', category: 'Branding', mediaUrl: 'https://picsum.photos/seed/branding2/800/600', mediaType: 'image', client: 'EcoLife' },
  ];

  const displayCategories = projects.length > 0 ? categories : defaultCategories;

  const filteredProjects = activeCategory === 'All' 
    ? displayProjects 
    : displayProjects.filter(p => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-24 bg-brand-dark relative">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold tracking-widest text-brand-neon uppercase mb-3">Portfolio</h2>
            <h3 className="text-4xl md:text-5xl font-heading font-bold text-white leading-tight">
              Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-neon to-emerald-400">Works</span>
            </h3>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {displayCategories.map((cat: string) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat 
                    ? 'bg-brand-neon text-brand-dark' 
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project: any) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-brand-deep/20 border border-white/5"
              >
                {project.mediaType === 'video' ? (
                  <video 
                    src={project.mediaUrl}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                ) : (
                  <img 
                    src={project.mediaUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                )}
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex gap-2 mb-2 flex-wrap">
                      <p className="bg-white/10 px-2 py-0.5 rounded text-brand-neon text-xs font-bold uppercase tracking-wider backdrop-blur-sm w-fit">{project.category}</p>
                      {project.isFavorite && <p className="bg-brand-neon/20 px-2 py-0.5 rounded text-brand-neon text-xs font-bold uppercase tracking-wider backdrop-blur-sm w-fit">Favorite</p>}
                      {project.isBestMedia && <p className="bg-purple-500/20 px-2 py-0.5 rounded text-purple-400 text-xs font-bold uppercase tracking-wider backdrop-blur-sm w-fit">Best</p>}
                    </div>
                    <h4 className="text-2xl font-heading font-bold text-white mb-1">{project.title}</h4>
                    {project.client && <p className="text-gray-400 text-sm mb-4">Client: {project.client}</p>}
                    
                    <div className="flex gap-3">
                      <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-brand-neon hover:text-brand-dark transition-colors backdrop-blur-sm">
                        <Eye size={18} />
                      </button>
                      <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-brand-neon hover:text-brand-dark transition-colors backdrop-blur-sm">
                        <ExternalLink size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        <div className="mt-16 text-center">
          <button className="bg-transparent border border-brand-neon text-brand-neon px-8 py-3 rounded-full font-semibold hover:bg-brand-neon hover:text-brand-dark transition-all duration-300">
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
}
