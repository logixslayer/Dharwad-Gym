import { motion } from 'motion/react';
import { Flame, ArrowRight, Trophy, Zap, Users } from 'lucide-react';

interface HeroProps {
  onJoinClick: () => void;
  isRegistered: boolean;
  onOpenPass: () => void;
}

export default function Hero({ onJoinClick, isRegistered, onOpenPass }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center bg-neutral-950 overflow-hidden pt-20"
    >
      {/* Background Moody Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1600&auto=format&fit=crop"
          alt="Premium Moody Gym"
          className="w-full h-full object-cover object-center scale-[1.02]"
          referrerPolicy="no-referrer"
        />
        {/* Dark High-Contrast Multi-layered Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-neutral-950/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/50 to-transparent" />
        {/* Abstract Red/Orange Glow effects */}
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-orange-600/10 blur-[150px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[60%] h-[60%] rounded-full bg-red-600/10 blur-[180px]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 flex flex-col items-center text-center">
        {/* Dynamic Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#FF4D00]/30 bg-[#FF4D00]/5 text-[#FF4D00] text-[10px] font-bold uppercase tracking-[0.2em] mb-8 font-mono"
          id="hero-badge"
        >
          <span className="w-2 h-2 rounded-full bg-[#FF4D00] animate-pulse" />
          THE ULTIMATE TRAINING SANCTUARY
        </motion.div>

        {/* Hero Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-6 text-center flex flex-col items-center select-none"
          id="hero-heading"
        >
          <h1 className="text-5xl sm:text-7xl md:text-[90px] xl:text-[140px] font-black leading-[0.8] tracking-tighter uppercase mb-0 text-white">
            IGNITE THE
          </h1>
          <h1 className="text-5xl sm:text-7xl md:text-[90px] xl:text-[140px] font-black leading-[0.8] tracking-tighter uppercase outline-text-orange italic -mt-2 sm:-mt-4">
            FIRE WITHIN
          </h1>
        </motion.div>

        {/* Hero Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-2xl text-neutral-400 text-base sm:text-xl font-normal tracking-wide leading-relaxed mb-12"
          id="hero-subheading"
        >
          No fluff. No shortcuts. Just premium high-contrast architecture, advanced performance equipment, and world-class protocols designed for those who refuse to settle.
        </motion.p>

        {/* CTA Button Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-4 justify-center w-full max-w-md"
          id="hero-cta-group"
        >
          {isRegistered ? (
            <button
              onClick={onOpenPass}
              id="hero-btn-registered"
              className="w-full sm:w-auto px-10 py-5 rounded-none border border-[#FF4D00]/50 bg-[#FF4D00]/10 text-[#FF4D00] font-black uppercase tracking-tighter text-sm hover:bg-[#FF4D00] hover:text-black transition-all duration-350 cursor-pointer skew-x-[-10deg] flex items-center justify-center gap-2"
            >
              <span className="inline-block skew-x-[10deg] flex items-center gap-2">
                Access Member Dashboard
                <ArrowRight className="w-5 h-5" />
              </span>
            </button>
          ) : (
            <button
              onClick={onJoinClick}
              id="hero-btn-join"
              className="w-full sm:w-auto px-10 py-5 rounded-none bg-[#FF4D00] text-black font-black uppercase tracking-tighter text-sm hover:scale-105 transition-all duration-300 cursor-pointer skew-x-[-10deg] flex items-center justify-center gap-3 hover:shadow-[0_0_35px_rgba(255,77,0,0.4)]"
            >
              <span className="inline-block skew-x-[10deg] flex items-center gap-3">
                Begin Your Onboarding
                <ArrowRight className="w-5 h-5" />
              </span>
            </button>
          )}

          <a
            href="#programs"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' });
            }}
            id="hero-btn-explore"
            className="w-full sm:w-auto px-10 py-5 rounded-none border border-white/20 bg-transparent text-white font-black uppercase tracking-tighter text-sm hover:bg-white hover:text-black transition-all duration-300 cursor-pointer skew-x-[-10deg] flex items-center justify-center"
          >
            <span className="inline-block skew-x-[10deg]">Explore Programs</span>
          </a>
        </motion.div>

        {/* Dynamic Trust Badges / Stats (Motivate Vibes) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-20 grid grid-cols-3 gap-6 sm:gap-12 py-6 border-t border-b border-neutral-900/60 max-w-3xl w-full"
          id="hero-stats"
        >
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1.5 text-white font-black text-xl sm:text-3xl font-sans tracking-tight">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
              1,800+
            </div>
            <div className="text-neutral-500 text-[10px] sm:text-xs uppercase tracking-widest mt-1 font-medium">Active Members</div>
          </div>
          <div className="flex flex-col items-center border-l border-r border-neutral-900/60">
            <div className="flex items-center gap-1.5 text-white font-black text-xl sm:text-3xl font-sans tracking-tight">
              <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
              12+
            </div>
            <div className="text-neutral-500 text-[10px] sm:text-xs uppercase tracking-widest mt-1 font-medium">Elite Coaches</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1.5 text-white font-black text-xl sm:text-3xl font-sans tracking-tight">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
              24/7
            </div>
            <div className="text-neutral-500 text-[10px] sm:text-xs uppercase tracking-widest mt-1 font-medium">Access Facility</div>
          </div>
        </motion.div>
      </div>

      {/* Floating Animated Mouse Wheel Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden sm:block">
        <a
          href="#programs"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex flex-col items-center gap-2 cursor-pointer group"
          id="hero-scroll-indicator"
        >
          <span className="text-[9px] uppercase tracking-[0.25em] text-neutral-500 group-hover:text-white transition-colors duration-300">SCROLL</span>
          <div className="w-[18px] h-[30px] rounded-full border border-neutral-700 p-1 flex justify-center">
            <motion.div
              animate={{
                y: [0, 8, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="w-1 h-2 rounded-full bg-orange-500"
            />
          </div>
        </a>
      </div>
    </section>
  );
}
