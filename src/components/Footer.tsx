import { useState } from 'react';
import { Flame, Mail, MapPin, Phone, RefreshCw, Send, ArrowUp } from 'lucide-react';

export default function Footer() {
  const quotes = [
    "No citizen has a right to be an amateur in the matter of physical training... what a disgrace it is for a man to grow old without seeing the beauty and strength of which his body is capable. — Socrates",
    "The clock is ticking. Are you becoming the person you want to be? — Greg Plitt",
    "Suffer the pain of discipline or suffer the pain of regret. — Jim Rohn",
    "You have to fight through some bad days to earn the best days of your life.",
    "The dynamic resistance of the barbell is the ultimate anchor of objective truth.",
    "Energy flows where focus goes. Light the fire."
  ];

  const [activeQuoteIdx, setActiveQuoteIdx] = useState(0);

  const rotateQuote = () => {
    setActiveQuoteIdx((prev) => (prev + 1) % quotes.length);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-950 border-t border-neutral-900 pt-20 pb-10 text-neutral-400 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand & Quote Generator (Column Span 5) */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-none bg-[#FF4D00] flex items-center justify-center shadow-lg shadow-orange-950/40">
                <Flame className="w-5 h-5 text-black" />
              </div>
              <span className="text-lg font-black uppercase tracking-widest text-white">
                IGNITE FITNESS<span className="text-[#FF4D00] font-extrabold">.</span>
              </span>
            </div>
            <p className="text-xs text-neutral-500 max-w-sm leading-relaxed">
              We reject mediocrity. Ignite Fitness is a specialized, dark-themed high-contrast facility engineered to optimize athletic capability and nervous system focus.
            </p>

            {/* Interactive Quote Widget */}
            <div className="p-4 bg-neutral-900 border border-neutral-850 rounded-none relative group">
              <span className="text-[8px] uppercase tracking-widest text-[#FF4D00] font-black block mb-1">
                DAILY ANCHOR QUOTE
              </span>
              <p className="text-xs text-neutral-300 italic pr-6 transition-all duration-300">
                "{quotes[activeQuoteIdx]}"
              </p>
              <button
                onClick={rotateQuote}
                className="absolute right-3 bottom-3 p-1 rounded-none bg-neutral-950 border border-neutral-800 text-neutral-500 hover:text-white transition-all cursor-pointer"
                title="Rotate motivation quote"
                id="footer-quote-rotator"
              >
                <RefreshCw className="w-3.5 h-3.5 animate-spin-slow" />
              </button>
            </div>
          </div>

          {/* Contact Details (Column Span 4) */}
          <div className="md:col-span-4 space-y-5">
            <h4 className="text-xs font-black uppercase text-white tracking-widest">
              FACILITY HEADQUARTERS
            </h4>
            <ul className="space-y-4 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#FF4D00] shrink-0 mt-0.5" />
                <span>
                  808 Kinetic Way, Platform 4, <br />
                  <span className="text-neutral-500">Silicon Slopes, UT 84043</span>
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#FF4D00] shrink-0" />
                <span>+1 (800) 555-FIRE (3473)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#FF4D00] shrink-0" />
                <span>hq@ignitefitness.club</span>
              </li>
            </ul>
          </div>

          {/* Operational Hours (Column Span 3) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-black uppercase text-white tracking-widest">
              OPERATIONAL HOURS
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between border-b border-neutral-900 pb-1.5">
                <span className="text-neutral-500 font-medium">Lifting Floors</span>
                <span className="text-white font-bold">24 / 7 Unlimited</span>
              </div>
              <div className="flex justify-between border-b border-neutral-900 pb-1.5">
                <span className="text-neutral-500 font-medium">Coaching Staff</span>
                <span className="text-neutral-300">06:00 AM - 09:00 PM</span>
              </div>
              <div className="flex justify-between pb-1.5">
                <span className="text-neutral-500 font-medium">Recovery Zone</span>
                <span className="text-neutral-300">05:00 AM - Midnight</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Block */}
        <div className="border-t border-neutral-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-[10px] text-neutral-600 uppercase tracking-widest">
            © 2026 IGNITE FITNESS INC. ALL RIGHTS PRESERVED. • DESIGNED IN BLACK CANVAS
          </div>

          <button
            onClick={handleScrollToTop}
            className="flex items-center gap-1 px-4 py-2 rounded-none bg-neutral-900 border border-neutral-850 hover:border-[#FF4D00] hover:text-white transition-all text-xs font-bold uppercase tracking-wider cursor-pointer skew-x-[-10deg]"
            id="footer-scroll-top-btn"
          >
            <span className="inline-block skew-x-[10deg] flex items-center gap-2">
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#FF4D00]" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
