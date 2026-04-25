import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#020403] pt-20 pb-10 border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-neon/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Info */}
          <div className="flex flex-col gap-6 lg:col-span-1">
            <a href="#home" className="flex items-center gap-3 text-2xl font-heading font-bold text-white">
              <img src="/logo%20p.png" alt="AbuSad Multimedia Logo" className="h-12 w-auto object-contain" />
              <span><span className="text-brand-neon">AbuSad</span> Multimedia</span>
            </a>
            <p className="text-gray-400 text-sm leading-relaxed">
              A luxury, modern, high-performance creative agency providing multimedia solutions for brand growth.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <a href="https://www.instagram.com/abusadmultimediaagency" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-brand-neon hover:text-brand-dark transition-all duration-300">
                <Instagram size={18} />
              </a>
              <a href="https://www.facebook.com/2225422734435926" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-brand-neon hover:text-brand-dark transition-all duration-300">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-brand-neon hover:text-brand-dark transition-all duration-300">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-brand-neon hover:text-brand-dark transition-all duration-300">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-6">
            <h4 className="text-lg font-bold text-white font-heading">Quick Links</h4>
            <ul className="flex flex-col gap-3">
              <li><a href="#home" className="text-gray-400 hover:text-brand-neon text-sm transition-colors">Home</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-brand-neon text-sm transition-colors">About Me</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-brand-neon text-sm transition-colors">Services</a></li>
              <li><a href="#portfolio" className="text-gray-400 hover:text-brand-neon text-sm transition-colors">Portfolio</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-brand-neon text-sm transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className="flex flex-col gap-6">
            <h4 className="text-lg font-bold text-white font-heading">Our Services</h4>
            <ul className="flex flex-col gap-3">
              <li className="text-gray-400 text-sm">Logo & Brand Identity</li>
              <li className="text-gray-400 text-sm">Graphic Design</li>
              <li className="text-gray-400 text-sm">Motion Graphics</li>
              <li className="text-gray-400 text-sm">Video Ads Marketing</li>
              <li className="text-gray-400 text-sm">Google Business Profile</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-6">
            <h4 className="text-lg font-bold text-white font-heading">Contact Info</h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <MapPin size={18} className="text-brand-neon shrink-0 mt-0.5" />
                <span>Bole, Ghana 00233</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Phone size={18} className="text-brand-neon shrink-0" />
                <div className="flex flex-col">
                  <a href="tel:+233551939735" className="hover:text-brand-neon transition-colors">+233 55 193 9735</a>
                  <a href="tel:+233504410413" className="hover:text-brand-neon transition-colors">+233 50 441 0413</a>
                </div>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail size={18} className="text-brand-neon shrink-0" />
                <a href="mailto:hello@abusadmultimedia.com" className="hover:text-brand-neon transition-colors">hello@abusadmultimedia.com</a>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm text-center md:text-left">
            &copy; {currentYear} AbuSad Multimedia Agency. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Terms of Service</a>
            <a href="/admin/login" className="text-gray-500 hover:text-brand-neon text-sm transition-colors">Admin Login</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
