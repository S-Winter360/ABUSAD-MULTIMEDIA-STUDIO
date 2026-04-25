import { motion } from 'framer-motion';
import { QrCode, ArrowRight } from 'lucide-react';

export default function QRCodeSection() {
  return (
    <section className="py-24 bg-[#050806] relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="bg-gradient-to-br from-brand-deep/40 to-brand-dark border border-white/10 rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden">
          
          {/* Decorative background */}
          <div className="absolute top-0 right-0 w-full h-full bg-[url('https://i.pinimg.com/1200x/72/5d/08/725d0894c7b1d20fd2182b7b00a39063.jpg')] bg-cover bg-center opacity-10 mix-blend-overlay pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-brand-neon/20 rounded-full blur-[80px]"></div>

          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-xl relative z-10"
          >
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight">
              Connect With Us <br/>
              <span className="text-brand-neon">Instantly</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Scan the QR code to quickly save our contact details, view our latest portfolio, or start a conversation on WhatsApp.
            </p>
            <button className="flex items-center gap-2 text-white font-semibold hover:text-brand-neon transition-colors group">
              Open Contact Page
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative z-10 shrink-0"
          >
            <div className="bg-white p-4 rounded-2xl shadow-[0_0_40px_rgba(0,210,106,0.2)] relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-neon to-emerald-400 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
              <div className="relative bg-white rounded-xl p-2 flex items-center justify-center w-48 h-48">
                {/* Placeholder for actual QR code */}
                <QrCode size={160} className="text-brand-dark" />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
