import { motion } from 'framer-motion';
import { User, Award, Briefcase, Zap } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-24 bg-brand-dark relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex justify-center"
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              {/* Green glow effect behind */}
              <div className="absolute inset-0 bg-brand-neon rounded-full blur-2xl opacity-20 transform scale-110"></div>
              
              {/* Profile Image Container */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-brand-neon shadow-[0_8px_30px_rgba(34,197,94,0.3)] z-10 bg-brand-dark">
                <img 
                  src="/profile-enhanced.jpg" 
                  alt="Creative Director" 
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
            
            {/* Decorative circles */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-white/5 rounded-full z-0 animate-[spin_20s_linear_infinite]"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-brand-neon/10 rounded-full z-0 animate-[spin_30s_linear_infinite_reverse]"></div>
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-8"
          >
            <div>
              <h2 className="text-sm font-bold tracking-widest text-brand-neon uppercase mb-3">About Me</h2>
              <h3 className="text-4xl md:text-5xl font-heading font-bold text-white leading-tight">
                Crafting Visual Stories That <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-neon to-emerald-400">Elevate Brands</span>
              </h3>
            </div>

            <p className="text-lg text-gray-400 leading-relaxed">
              I am <strong className="text-white">Adams Abubakari Sadique</strong>, a Ghana-based Graphic Designer, Animator, and Multimedia Specialist. I help brands grow through compelling visuals, storytelling, and modern digital design solutions.
            </p>

            <div className="grid grid-cols-2 gap-6 mt-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-deep/30 flex items-center justify-center text-brand-neon shrink-0">
                  <Briefcase size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white">5+ Years</h4>
                  <p className="text-sm text-gray-400">Experience</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-deep/30 flex items-center justify-center text-brand-neon shrink-0">
                  <Award size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white">100+</h4>
                  <p className="text-sm text-gray-400">Projects Completed</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10">
              <p className="text-sm text-gray-500 italic">
                "Design is not just what it looks like and feels like. Design is how it works."
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
