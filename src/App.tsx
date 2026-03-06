import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Settings, 
  Smartphone, 
  Zap, 
  ChevronRight, 
  Menu, 
  X,
  Github,
  Twitter,
  Linkedin
} from 'lucide-react';
import configData from './config.json';

// Dynamic Icon Mapper
const IconMap: Record<string, React.ElementType> = {
  Settings,
  Smartphone,
  Zap
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { themeColor, logoUrl, hero, features, about, footer } = configData;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav 
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img 
              src={logoUrl} 
              alt="Logo" 
              className="h-8 w-8" 
              referrerPolicy="no-referrer"
              style={{ filter: scrolled ? 'none' : 'brightness(0) invert(1)' }}
            />
            <span className={`font-display font-bold text-xl ${scrolled ? 'text-zinc-900' : 'text-white'}`}>
              Brand
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {['Features', 'About', 'Pricing', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className={`text-sm font-medium transition-colors hover:opacity-70 ${
                  scrolled ? 'text-zinc-600' : 'text-white/90'
                }`}
              >
                {item}
              </a>
            ))}
            <button 
              className="px-5 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105 active:scale-95"
              style={{ backgroundColor: themeColor, color: 'white' }}
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className={scrolled ? 'text-zinc-900' : 'text-white'} />
            ) : (
              <Menu className={scrolled ? 'text-zinc-900' : 'text-white'} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 w-full bg-white shadow-xl py-6 px-4 flex flex-col gap-4 md:hidden"
          >
            {['Features', 'About', 'Pricing', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="text-lg font-medium text-zinc-900 border-b border-zinc-100 pb-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <button 
              className="w-full py-3 rounded-xl text-white font-bold mt-2"
              style={{ backgroundColor: themeColor }}
            >
              Get Started
            </button>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={hero.imageUrl} 
            alt="Hero Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-tight mb-6">
              {hero.title}
            </h1>
            <p className="text-xl text-white/80 mb-10 leading-relaxed">
              {hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                className="px-8 py-4 rounded-full text-lg font-bold flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:scale-105 active:scale-95"
                style={{ backgroundColor: themeColor, color: 'white' }}
              >
                {hero.ctaText} <ChevronRight size={20} />
              </button>
              <button className="px-8 py-4 rounded-full text-lg font-bold text-white border border-white/30 backdrop-blur-sm hover:bg-white/10 transition-all">
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-zinc-900 mb-4">
              Why Choose Us?
            </h2>
            <div className="w-20 h-1 mx-auto rounded-full" style={{ backgroundColor: themeColor }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature: any, index: number) => {
              const Icon = IconMap[feature.icon] || Settings;
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-100 hover:shadow-xl transition-all group"
                >
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 group-hover:rotate-3"
                    style={{ backgroundColor: `${themeColor}15`, color: themeColor }}
                  >
                    <Icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 mb-3">{feature.title}</h3>
                  <p className="text-zinc-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1"
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold text-zinc-900 mb-8">
                {about.title}
              </h2>
              <p className="text-lg text-zinc-600 leading-relaxed mb-8">
                {about.text}
              </p>
              <div className="flex items-center gap-6">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map(i => (
                    <img 
                      key={i}
                      src={`https://i.pravatar.cc/100?u=${i}`} 
                      className="w-12 h-12 rounded-full border-4 border-white object-cover"
                      alt="User"
                      referrerPolicy="no-referrer"
                    />
                  ))}
                </div>
                <div className="text-sm">
                  <p className="font-bold text-zinc-900">Joined by 10,000+ users</p>
                  <p className="text-zinc-500">Trust our platform for their business</p>
                </div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex-1 relative"
            >
              <div 
                className="absolute -top-4 -right-4 w-full h-full rounded-3xl z-0"
                style={{ backgroundColor: `${themeColor}10` }}
              />
              <img 
                src={about.imageUrl} 
                alt="About Us" 
                className="relative z-10 w-full h-[400px] object-cover rounded-3xl shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-900 text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <img 
                  src={logoUrl} 
                  alt="Logo" 
                  className="h-8 w-8 brightness-0 invert" 
                  referrerPolicy="no-referrer"
                />
                <span className="font-display font-bold text-2xl">Brand</span>
              </div>
              <p className="text-zinc-400 max-w-sm mb-8">
                Empowering creators and businesses with customizable, high-performance web solutions.
              </p>
              <div className="flex gap-4">
                {[Twitter, Github, Linkedin].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-colors">
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-6">Product</h4>
              <ul className="space-y-4 text-zinc-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Changelog</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6">Company</h4>
              <ul className="space-y-4 text-zinc-400">
                {footer.links.map((link: any, i: number) => (
                  <li key={i}>
                    <a href={link.url} className="hover:text-white transition-colors">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-zinc-800 text-center text-zinc-500 text-sm">
            <p>{footer.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
