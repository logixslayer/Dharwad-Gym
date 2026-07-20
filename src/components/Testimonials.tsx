import { motion } from 'motion/react';
import { Star, Quote, Sparkles } from 'lucide-react';
import { TESTIMONIALS } from '../data';

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-neutral-950 border-t border-neutral-900/60 relative">
      <div className="absolute top-[20%] left-[5%] w-[350px] h-[350px] bg-red-650/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[5%] w-[350px] h-[350px] bg-orange-650/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D00]" />
              <span className="text-xs uppercase tracking-[0.3em] font-extrabold text-[#FF4D00]">Transformed Lives</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-sans uppercase tracking-tight text-white">
              The Path Of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D00] to-red-650">Iron Discipline</span>
            </h2>
          </div>
          <p className="max-w-md text-neutral-400 text-sm sm:text-base tracking-wide leading-relaxed">
            Real feedback from members who stepped into our dark-mode facility and chose to redefine their limitations.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="testimonials-grid">
          {TESTIMONIALS.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: parseInt(t.id) * 0.1 }}
              className="rounded-none p-6 md:p-8 border border-neutral-850 bg-neutral-900/40 hover:border-neutral-750 hover:bg-neutral-900/80 transition-all duration-300 flex flex-col justify-between h-auto relative overflow-hidden group"
              id={`testimonial-card-${t.id}`}
            >
              {/* Top Quote Icon decoration */}
              <Quote className="absolute top-6 right-6 w-12 h-12 text-neutral-800/40 pointer-events-none" />

              <div>
                {/* 5-Star Rating block */}
                <div className="flex items-center gap-1 mb-4" id={`testimonial-rating-${t.id}`}>
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FF4D00] text-[#FF4D00] shrink-0" />
                  ))}
                </div>

                {/* Body Quote */}
                <p className="text-sm text-neutral-300 leading-relaxed italic mb-8 relative z-10">
                  "{t.quote}"
                </p>
              </div>

              {/* Bottom Card Holder Row */}
              <div className="border-t border-neutral-850/60 pt-4 mt-auto flex items-center gap-3">
                <div className="w-11 h-11 rounded-none overflow-hidden border border-neutral-800 shrink-0">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <div className="text-xs font-black uppercase text-white tracking-wide">
                    {t.name}
                  </div>
                  <div className="text-[10px] text-neutral-500 font-medium">
                    {t.role}
                  </div>
                  {/* Milestones / Custom Achievements display */}
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-none bg-[#FF4D00]/10 border border-[#FF4D00]/20 text-[9px] font-black uppercase tracking-wider text-[#FF4D00] mt-2">
                    <Sparkles className="w-2.5 h-2.5 text-[#FF4D00] animate-pulse" />
                    {t.achievement}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
