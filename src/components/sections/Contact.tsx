import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageCircle, Send } from 'lucide-react';
import { db } from '../../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');
    
    try {
      const dataToSave: any = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        createdAt: serverTimestamp()
      };
      if (formData.phone) {
        dataToSave.phone = formData.phone;
      }
      
      await addDoc(collection(db, 'messages'), dataToSave);
      
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error: any) {
      console.error('Error submitting form:', error);
      setStatus('error');
      setErrorMessage(error.message || error.details || error.hint || JSON.stringify(error));
    }
  };

  return (
    <section id="contact" className="py-24 bg-brand-dark relative">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-8"
          >
            <div>
              <h2 className="text-sm font-bold tracking-widest text-brand-neon uppercase mb-3">Contact Me</h2>
              <h3 className="text-4xl md:text-5xl font-heading font-bold text-white leading-tight mb-4">
                Let's Build Something <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-neon to-emerald-400">
                  Amazing Together
                </span>
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                Ready to elevate your brand? Reach out for a consultation, project inquiry, or just to say hello.
              </p>
            </div>

            <div className="flex flex-col gap-6 mt-4">
              <a href="tel:+233551939735" className="flex items-center gap-4 group p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-brand-deep/30 hover:border-brand-neon/50 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-brand-neon/20 flex items-center justify-center text-brand-neon group-hover:bg-brand-neon group-hover:text-brand-dark transition-colors">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Call Me Directly</p>
                  <p className="text-lg font-bold text-white">+233 55 193 9735</p>
                </div>
              </a>

              <a href="tel:+233504410413" className="flex items-center gap-4 group p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-brand-deep/30 hover:border-brand-neon/50 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-brand-neon/20 flex items-center justify-center text-brand-neon group-hover:bg-brand-neon group-hover:text-brand-dark transition-colors">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Alternative Line</p>
                  <p className="text-lg font-bold text-white">+233 50 441 0413</p>
                </div>
              </a>

              <a href="https://wa.me/233551939735" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group p-4 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/20 hover:bg-[#25D366]/20 hover:border-[#25D366]/50 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <p className="text-sm text-[#25D366]/80">Chat on WhatsApp</p>
                  <p className="text-lg font-bold text-white">Start a Conversation</p>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-[#050806] p-8 md:p-10 rounded-3xl border border-white/10 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-neon/5 rounded-full blur-[100px] pointer-events-none"></div>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-400">Your Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-neon focus:ring-1 focus:ring-brand-neon transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className="text-sm font-medium text-gray-400">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-neon focus:ring-1 focus:ring-brand-neon transition-all"
                    placeholder="+233 55 000 0000"
                  />
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-400">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-neon focus:ring-1 focus:ring-brand-neon transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-medium text-gray-400">Your Message</label>
                <textarea 
                  id="message" 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="bg-brand-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-neon focus:ring-1 focus:ring-brand-neon transition-all resize-none"
                  placeholder="How can I help you?"
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={status === 'submitting'}
                className="group flex items-center justify-center gap-2 bg-brand-neon text-brand-dark px-8 py-4 rounded-xl font-bold hover:bg-white transition-all duration-300 mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? 'Sending...' : 'Send Message'}
                <Send size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>

              {status === 'success' && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-3 rounded-lg text-sm text-center mt-2">
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}
              {status === 'error' && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm text-center mt-2 flex flex-col gap-1">
                  <span className="font-bold">Error sending message!</span>
                  <span className="text-xs opacity-80 font-mono">{errorMessage}</span>
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
