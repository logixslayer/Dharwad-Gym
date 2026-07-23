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
          className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#FF4D00]/30 bg-[#FF4D00]/10 text-[#FF4D00] text-xs font-bold uppercase tracking-widest mb-6 rounded-full font-sans"
          id="hero-badge"
        >
          <span className="w-2 h-2 rounded-full bg-[#FF4D00] animate-pulse" />
          PREMIER FITNESS CENTER IN DHARWAD
        </motion.div>

        {/* Hero Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-6 text-center flex flex-col items-center select-none"
          id="hero-heading"
        >
          <h1 className="text-4xl sm:text-6xl md:text-8xl xl:text-9xl font-black leading-[0.9] tracking-tight uppercase text-white">
            IGNITE <span className="text-[#FF4D00]">FITNESS</span>
          </h1>
        </motion.div>

        {/* Hero Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-xl text-neutral-300 text-sm sm:text-base font-normal leading-relaxed mb-10"
          id="hero-subheading"
        >
          State-of-the-art cardio and strength training equipment, expert personal trainers, and flexible plans designed to achieve your health goals.
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
              className="w-full sm:w-auto px-8 py-4 rounded-xl border border-[#FF4D00] bg-[#FF4D00] text-black font-extrabold uppercase tracking-wider text-xs hover:bg-[#FF4D00]/90 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>View Access Pass</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onJoinClick}
              id="hero-btn-join"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#FF4D00] text-black font-extrabold uppercase tracking-wider text-xs hover:scale-105 transition-all cursor-pointer flex items-center justify-center gap-2 hover:shadow-[0_0_25px_rgba(255,77,0,0.4)]"
            >
              <span>Get Gym Pass</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          <a
            href="#programs"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' });
            }}
            id="hero-btn-explore"
            className="w-full sm:w-auto px-8 py-4 rounded-xl border border-neutral-700 bg-neutral-900/80 text-white font-extrabold uppercase tracking-wider text-xs hover:bg-neutral-800 transition-all cursor-pointer flex items-center justify-center"
          >
            <span>Explore Services</span>
          </a>
        </motion.div>

        {/* Dynamic Trust Badges / Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-12 sm:mt-16 grid grid-cols-3 gap-1 sm:gap-8 py-3.5 sm:py-5 px-2 sm:px-6 bg-neutral-900/80 backdrop-blur-md border border-neutral-800 rounded-xl sm:rounded-2xl max-w-2xl w-full"
          id="hero-stats"
        >
          <div className="flex flex-col items-center justify-center px-1">
            <div className="flex items-center gap-1 text-white font-bold text-xs sm:text-xl whitespace-nowrap">
              <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF4D00] shrink-0" />
              4.9 / 5
            </div>
            <div className="text-neutral-400 text-[9px] sm:text-xs uppercase tracking-wider mt-0.5 whitespace-nowrap">180+ Reviews</div>
          </div>
          <div className="flex flex-col items-center justify-center px-1 border-l border-r border-neutral-800">
            <div className="flex items-center gap-1 text-white font-bold text-xs sm:text-xl whitespace-nowrap">
              <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF4D00] shrink-0" />
              Dharwad
            </div>
            <div className="text-neutral-400 text-[9px] sm:text-xs uppercase tracking-wider mt-0.5 whitespace-nowrap">PB Road</div>
          </div>
          <div className="flex flex-col items-center justify-center px-1">
            <div className="flex items-center gap-1 text-white font-bold text-xs sm:text-xl whitespace-nowrap">
              <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF4D00] shrink-0" />
              Till 11 PM
            </div>
            <div className="text-neutral-400 text-[9px] sm:text-xs uppercase tracking-wider mt-0.5 whitespace-nowrap">Open Daily</div>
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
