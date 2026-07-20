import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, Menu, X, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onJoinClick: () => void;
  isRegistered: boolean;
  onOpenPass: () => void;
}

export default function Navbar({ onJoinClick, isRegistered, onOpenPass }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        id="navbar"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-neutral-950/85 backdrop-blur-xl border-b border-neutral-850 py-4 shadow-2xl'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 group"
            id="nav-logo"
          >
            <span className="text-2xl font-black font-sans uppercase tracking-tighter text-white">
              IGNITE<span className="text-[#FF4D00] font-black">.</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.2em] font-sans font-bold text-neutral-400">
            {['about', 'programs', 'schedule', 'metrics', 'pricing', 'testimonials'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="hover:text-white transition-colors duration-300 relative py-1 cursor-pointer group"
                id={`nav-link-${section}`}
              >
                {section}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#FF4D00] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* Action Button */}
          <div className="hidden md:block">
            {isRegistered ? (
              <button
                onClick={onOpenPass}
                id="nav-cta-registered"
                className="px-5 py-2.5 bg-[#FF4D00]/10 border border-[#FF4D00]/30 text-[#FF4D00] text-xs font-bold uppercase tracking-widest skew-x-[-10deg] hover:bg-[#FF4D00] hover:text-black hover:border-transparent transition-all duration-300 cursor-pointer rounded-none"
              >
                <span className="inline-block skew-x-[10deg] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  Access Pass
                </span>
              </button>
            ) : (
              <button
                onClick={onJoinClick}
                id="nav-cta-join"
                className="px-6 py-2.5 bg-[#FF4D00] text-black text-xs font-black uppercase tracking-widest skew-x-[-10deg] hover:scale-105 hover:shadow-[0_0_20px_rgba(255,77,0,0.4)] transition-all duration-300 cursor-pointer rounded-none"
              >
                <span className="inline-block skew-x-[10deg]">Join Now</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-neutral-400 hover:text-white p-2 transition-colors focus:outline-none"
            aria-label="Toggle menu"
            id="nav-mobile-toggle"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-[72px] z-40 bg-neutral-950/95 backdrop-blur-2xl border-b border-neutral-900 md:hidden flex flex-col justify-between p-8"
            id="nav-mobile-menu"
          >
            <div className="flex flex-col gap-6 text-lg uppercase tracking-[0.2em] font-sans text-neutral-300">
              {['about', 'programs', 'schedule', 'metrics', 'pricing', 'testimonials'].map((section, idx) => (
                <motion.button
                  key={section}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => scrollToSection(section)}
                  className="text-left py-2 border-b border-neutral-900 hover:text-white transition-colors duration-300"
                  id={`nav-mobile-link-${section}`}
                >
                  {section}
                </motion.button>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-4">
              {isRegistered ? (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenPass();
                  }}
                  id="nav-mobile-cta-registered"
                  className="w-full flex items-center justify-center gap-2 py-4 bg-[#FF4D00]/10 border border-[#FF4D00]/30 text-[#FF4D00] font-bold uppercase tracking-wider hover:bg-[#FF4D00]/20 transition-all duration-300 rounded-none"
                >
                  <ShieldCheck className="w-5 h-5" />
                  View Access Pass
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onJoinClick();
                  }}
                  id="nav-mobile-cta-join"
                  className="w-full py-4 bg-[#FF4D00] text-black font-black uppercase tracking-widest text-center hover:scale-[1.01] transition-all duration-300 rounded-none"
                >
                  Join Ignite Fitness
                </button>
              )}
              <div className="text-center text-[10px] text-neutral-600 tracking-wider uppercase mt-4">
                24/7 Premium Facility • Burn • Conquer • Persist
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
