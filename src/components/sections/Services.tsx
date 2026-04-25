import { motion } from 'framer-motion';
import { PenTool, Layout, Video, Search, Play, Image, Share2, Target } from 'lucide-react';

const services = [
  {
    title: 'Logo Designing',
    description: 'Unique and memorable logos that capture your brand essence.',
    icon: <PenTool size={32} />
  },
  {
    title: 'Graphic Designing',
    description: 'Stunning visuals for print and digital media.',
    icon: <Layout size={32} />
  },
  {
    title: 'Video Ads Marketing',
    description: 'Compelling video campaigns that drive conversions.',
    icon: <Video size={32} />
  },
  {
    title: 'Google Business Profile',
    description: 'Optimization to increase local search visibility.',
    icon: <Search size={32} />
  },
  {
    title: 'Motion Graphics',
    description: 'Dynamic animations that bring your ideas to life.',
    icon: <Play size={32} />
  },
  {
    title: 'Animation',
    description: '2D/3D animations for storytelling and marketing.',
    icon: <Image size={32} />
  },
  {
    title: 'Brand Identity Design',
    description: 'Cohesive visual systems for consistent branding.',
    icon: <Target size={32} />
  },
  {
    title: 'Social Media Design',
    description: 'Engaging content tailored for social platforms.',
    icon: <Share2 size={32} />
  }
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-[#050806] relative">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-sm font-bold tracking-widest text-brand-neon uppercase mb-3">Our Services</h2>
          <h3 className="text-4xl md:text-5xl font-heading font-bold text-white leading-tight">
            Creative Solutions <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-neon to-emerald-400">
              Tailored For You
            </span>
          </h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-brand-dark border border-white/5 rounded-2xl p-8 hover:bg-brand-deep/20 hover:border-brand-neon/30 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-neon/5 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-150"></div>
              
              <div className="w-16 h-16 rounded-xl bg-brand-deep/50 flex items-center justify-center text-brand-neon mb-6 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              
              <h4 className="text-xl font-bold text-white mb-3 font-heading group-hover:text-brand-neon transition-colors">
                {service.title}
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
