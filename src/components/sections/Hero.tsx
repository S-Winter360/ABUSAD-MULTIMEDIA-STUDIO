import { motion } from 'framer-motion';
import { ArrowRight, PlayCircle } from 'lucide-react';

export default function Hero() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-brand-dark">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 opacity-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('https://i.pinimg.com/1200x/72/5d/08/725d0894c7b1d20fd2182b7b00a39063.jpg')` }}
      ></div>
      
      {/* Background Gradient & Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-neon/10 rounded-full blur-[120px] mix-blend-screen"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brand-deep/30 rounded-full blur-[100px] mix-blend-screen"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 w-fit backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-brand-neon animate-pulse"></span>
            <span className="text-sm font-medium text-gray-300">Available for freelance work</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-heading font-bold leading-tight text-white">
            Creative Solutions <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-neon to-emerald-400">
              for Brand Growth
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-xl font-sans">
            Graphic Design • Animation • Multimedia Production
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-4">
            <button 
              onClick={() => scrollToSection('#portfolio')}
              className="group flex items-center gap-2 bg-brand-neon text-brand-dark px-8 py-4 rounded-full font-semibold hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(0,210,106,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
            >
              View Portfolio
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => scrollToSection('#contact')}
              className="group flex items-center gap-2 bg-transparent text-white border border-white/20 px-8 py-4 rounded-full font-semibold hover:bg-white/5 transition-all duration-300"
            >
              <PlayCircle size={20} className="text-brand-neon group-hover:scale-110 transition-transform" />
              Contact Me
            </button>
          </div>
        </motion.div>

        {/* Image/Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative flex justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 bg-brand-deep/20 backdrop-blur-sm flex items-center justify-center p-8">
            {/* Placeholder for Owner Portrait */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent z-10 pointer-events-none"></div>
            <img 
              src="/logo%20p.png" 
              alt="AbuSad Multimedia Logo" 
              className="w-full h-full object-contain object-center z-0 drop-shadow-2xl"
            />
            
            {/* Floating Elements */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute top-10 -left-6 bg-brand-dark/80 backdrop-blur-md border border-white/10 p-4 rounded-2xl z-20 shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-neon/20 flex items-center justify-center text-brand-neon">
                  ✦
                </div>
                <div>
                  <p className="text-xs text-gray-400">Expertise</p>
                  <p className="text-sm font-bold text-white">Brand Identity</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-20 -right-6 bg-brand-dark/80 backdrop-blur-md border border-white/10 p-4 rounded-2xl z-20 shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                  ▶
                </div>
                <div>
                  <p className="text-xs text-gray-400">Specialty</p>
                  <p className="text-sm font-bold text-white">Motion Graphics</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
