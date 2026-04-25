import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Megaphone, X } from 'lucide-react';
import { db } from '../../lib/firebase';
import { collection, query, orderBy, onSnapshot, where } from 'firebase/firestore';

export default function Announcements() {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Fetch all announcements ordered by time, then filter client-side 
    // to avoid needing a composite index for preview environment.
    const q = query(
      collection(db, 'announcements'), 
      orderBy('createdAt', 'desc')
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter((doc: any) => doc.isVisible === true);
        
      setAnnouncements(fetched);
    });

    return () => unsubscribe();
  }, []);

  if (announcements.length === 0 || !visible) return null;

  // Let's just show the most recent announcement as a banner
  const latestInfo = announcements[0];

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="fixed bottom-0 left-0 w-full z-50 bg-brand-neon text-brand-dark overflow-hidden shadow-[0_-10px_30px_rgba(34,197,94,0.3)]"
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            <div className="bg-brand-dark/10 p-2 rounded-full hidden sm:block">
              <Megaphone size={20} />
            </div>
            <div>
              <p className="font-bold text-sm tracking-wide">{latestInfo.title}</p>
              <p className="text-sm opacity-80 leading-snug">{latestInfo.content}</p>
            </div>
          </div>
          <button 
            onClick={() => setVisible(false)}
            className="p-2 hover:bg-black/10 rounded-full transition-colors flex-shrink-0"
            aria-label="Close announcement"
          >
            <X size={18} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
