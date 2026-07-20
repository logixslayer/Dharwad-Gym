import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp, Facebook, Twitter, Instagram, Plus, Award, Flame, Users, Calendar } from 'lucide-react';
import { TRAINERS } from '../data';

export default function AboutUs() {
  // Accordion state for About Us details
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);

  // Selected trainer state to show bio and expertise details
  const [selectedTrainerId, setSelectedTrainerId] = useState<string>('mark');

  const accordionItems = [
    {
      id: 0,
      num: '01',
      title: 'More than fifteen years of experience',
      content: 'Ignite Fitness was forged in 2011 with a vision to build an elite, high-performance training environment. Our fifteen-year lineage guarantees bulletproof coaching methodologies and training protocols designed to unlock your human raw potential.'
    },
    {
      id: 1,
      num: '02',
      title: 'Authorized certified instructors',
      content: 'Every coach on our floor holds gold-standard international athletic certifications. We do not hire general reps; our instructors are elite powerlifters, certified metabolic specialists, and active combat trainers.'
    },
    {
      id: 2,
      num: '03',
      title: 'Outstanding caliber of work',
      content: 'We hold our trainers and our members to an uncompromising standard. From our real-time biometric telemetry tracking to meticulously calibrated machinery, every component of Ignite Fitness is engineered for maximum performance output.'
    }
  ];

  const toggleAccordion = (id: number) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  const selectedTrainer = TRAINERS.find(t => t.id === selectedTrainerId) || TRAINERS[0];

  return (
    <section id="about" className="py-24 bg-neutral-950 border-t border-neutral-900/60 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-[10%] right-[-10%] w-[400px] h-[400px] bg-[#FF4D00]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] bg-red-650/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* ================= ABOUT US BLOCK ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-32">
          
          {/* Left: Overlapping Photos & Visual Elements (5 Columns) */}
          <div className="lg:col-span-5 relative" id="about-visuals-panel">
            {/* Desktop Overlapping Layout */}
            <div className="hidden sm:block h-[500px] relative w-full">
              {/* Back Image (Boxer / Woman Training) */}
              <motion.div 
                initial={{ opacity: 0, x: -30, rotate: -3 }}
                whileInView={{ opacity: 1, x: 0, rotate: -6 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="absolute top-4 left-4 w-2/3 h-[300px] z-10 overflow-hidden border-2 border-neutral-800 shadow-2xl"
              >
                <div className="absolute inset-0 bg-neutral-950/20 z-10" />
                <img 
                  src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop" 
                  alt="Elite Cardio Training" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </motion.div>

              {/* Front Image (Bodybuilder Lifting) */}
              <motion.div 
                initial={{ opacity: 0, y: 30, rotate: 3 }}
                whileInView={{ opacity: 1, y: 0, rotate: 4 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute bottom-4 right-4 w-2/3 h-[320px] z-20 overflow-hidden border-2 border-[#FF4D00]/30 shadow-2xl"
              >
                <div className="absolute inset-0 bg-neutral-950/10 z-10" />
                <img 
                  src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=600&auto=format&fit=crop" 
                  alt="Strength Conditioning" 
                  className="w-full h-full object-cover hover:scale-105 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </motion.div>

              {/* Creative Floating Badge */}
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 bg-[#FF4D00] text-black w-20 h-20 flex flex-col items-center justify-center font-black skew-x-[-10deg] shadow-[0_0_30px_rgba(255,77,0,0.4)]"
              >
                <span className="text-xl skew-x-[10deg] leading-none">15+</span>
                <span className="text-[8px] uppercase tracking-wider font-mono skew-x-[10deg]">Yrs Exp</span>
              </motion.div>
            </div>

            {/* Mobile Stacked Layout (Responsive) */}
            <div className="block sm:hidden space-y-4">
              <div className="h-64 rounded-none overflow-hidden border border-neutral-850">
                <img 
                  src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=600&auto=format&fit=crop" 
                  alt="Training" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-neutral-900 border border-neutral-850 p-4 flex flex-col justify-center">
                  <div className="text-2xl font-black text-[#FF4D00]">15+</div>
                  <div className="text-[9px] uppercase tracking-wider text-neutral-400">Years of Elite Legacy</div>
                </div>
                <div className="bg-[#FF4D00] text-black p-4 flex flex-col justify-center skew-x-[-6deg]">
                  <div className="text-xl font-black skew-x-[6deg] uppercase">Certified</div>
                  <div className="text-[9px] uppercase tracking-wider font-bold skew-x-[6deg]">Authorized Coaches</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Content & Accordions (7 Columns) */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D00]" />
                <span className="text-xs uppercase tracking-[0.3em] font-extrabold text-[#FF4D00]">About Us</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black font-sans uppercase tracking-tight text-white mb-6">
                WE HAVE A GREAT DEAL OF <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D00] to-red-650">EXPERIENCE WITH FITNESS</span>
              </h2>
              <p className="text-neutral-400 text-sm sm:text-base leading-relaxed tracking-wide">
                We design specialized athletic regimens and high-intensity pathways created by personal, certified coaches to target individual biometrics. Whether you are aiming for structural powerlifting depth, metabolic conditioning, or functional mobility rehabilitation, Ignite provides the uncompromising arena.
              </p>
            </div>

            {/* Interactive Accordion Details */}
            <div className="space-y-4" id="about-experience-accordion">
              {accordionItems.map((item) => {
                const isOpen = activeAccordion === item.id;
                return (
                  <div 
                    key={item.id} 
                    className={`border transition-all duration-300 ${
                      isOpen 
                        ? 'border-[#FF4D00]/40 bg-neutral-900/40' 
                        : 'border-neutral-850 bg-transparent'
                    }`}
                  >
                    <button
                      onClick={() => toggleAccordion(item.id)}
                      className="w-full flex items-center justify-between p-5 text-left focus:outline-none cursor-pointer"
                      id={`about-accordion-btn-${item.id}`}
                    >
                      <div className="flex items-center gap-4">
                        <span className={`font-mono text-sm font-black transition-colors ${isOpen ? 'text-[#FF4D00]' : 'text-neutral-500'}`}>
                          {item.num}
                        </span>
                        <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-white">
                          {item.title}
                        </span>
                      </div>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-[#FF4D00] shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-neutral-500 shrink-0" />
                      )}
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="p-5 pt-0 text-xs sm:text-sm text-neutral-400 leading-relaxed border-t border-neutral-900/40">
                            {item.content}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

        </div>


        {/* ================= KEY TRAINERS SECTION ================= */}
        <div className="border-t border-neutral-900/60 pt-24" id="trainers">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
            <div className="flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D00]" />
              <span className="text-xs uppercase tracking-[0.3em] font-extrabold text-[#FF4D00]">Our Trainer</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-sans uppercase tracking-tight text-white">
              Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D00] to-red-650">Proficient Trainers</span>
            </h2>
            <p className="text-neutral-400 text-sm tracking-wide leading-relaxed">
              Our elite trainers bring certified credentials, intense competitive experience, and tailored biometric blueprints to your physical transformation journey.
            </p>
          </div>

          {/* Interactive Trainers Circular Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center mb-16" id="trainers-grid">
            {TRAINERS.map((trainer) => {
              const isSelected = selectedTrainerId === trainer.id;
              return (
                <button
                  key={trainer.id}
                  onClick={() => setSelectedTrainerId(trainer.id)}
                  className="flex flex-col items-center group focus:outline-none cursor-pointer"
                  id={`trainer-select-${trainer.id}`}
                >
                  {/* Concentric Double Circle Ring */}
                  <div className="relative mb-5">
                    {/* Pulsing Backlit Glow for Selected or Special trainer */}
                    {isSelected && (
                      <div className="absolute inset-[-4px] rounded-full bg-[#FF4D00]/25 blur-md animate-pulse pointer-events-none" />
                    )}

                    {/* Concentric outer dashed circle */}
                    <div className={`p-2.5 rounded-full border-2 border-dashed transition-all duration-300 ${
                      isSelected 
                        ? 'border-[#FF4D00] rotate-45' 
                        : 'border-neutral-800 group-hover:border-neutral-600'
                    }`}>
                      {/* Inner image container */}
                      <div className={`w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-2 p-1 transition-all duration-300 ${
                        isSelected 
                          ? 'border-[#FF4D00] bg-neutral-900' 
                          : 'border-neutral-850 bg-neutral-950 group-hover:border-neutral-700'
                      }`}>
                        <img
                          src={trainer.image}
                          alt={trainer.name}
                          className={`w-full h-full object-cover rounded-full transition-all duration-500 ${
                            isSelected ? 'scale-105 filter grayscale-0' : 'filter grayscale group-hover:grayscale-0'
                          }`}
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>

                    {/* Plus Icon Overlay / Red circular accent tag (mimicking the Mark trainer in image) */}
                    {trainer.specialBadge && (
                      <div className="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-[#FF4D00] text-black font-black flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
                        <Plus className="w-4 h-4 text-black stroke-[3px]" />
                      </div>
                    )}
                  </div>

                  {/* Name & Role Text */}
                  <div className="text-center">
                    <h3 className={`text-sm sm:text-base font-black uppercase tracking-wider transition-colors ${
                      isSelected ? 'text-[#FF4D00]' : 'text-white group-hover:text-[#FF4D00]'
                    }`}>
                      {trainer.name}
                    </h3>
                    <p className="text-[10px] uppercase text-neutral-500 font-mono tracking-widest mt-0.5">
                      {trainer.role}
                    </p>
                  </div>

                  {/* Social Media Mini-Icons */}
                  <div className="flex gap-2.5 mt-3 opacity-60 group-hover:opacity-100 transition-opacity">
                    <a 
                      href={trainer.socials.facebook} 
                      target="_blank" 
                      rel="noreferrer"
                      className="p-1.5 rounded-none bg-neutral-900 border border-neutral-850 hover:border-[#FF4D00] hover:text-[#FF4D00] text-neutral-400 transition-all cursor-pointer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Facebook className="w-3 h-3" />
                    </a>
                    <a 
                      href={trainer.socials.twitter} 
                      target="_blank" 
                      rel="noreferrer"
                      className="p-1.5 rounded-none bg-neutral-900 border border-neutral-850 hover:border-[#FF4D00] hover:text-[#FF4D00] text-neutral-400 transition-all cursor-pointer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Twitter className="w-3 h-3" />
                    </a>
                    <a 
                      href={trainer.socials.instagram} 
                      target="_blank" 
                      rel="noreferrer"
                      className="p-1.5 rounded-none bg-neutral-900 border border-neutral-850 hover:border-[#FF4D00] hover:text-[#FF4D00] text-neutral-400 transition-all cursor-pointer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Instagram className="w-3 h-3" />
                    </a>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Expanded Selected Trainer Bio & Expertise Panel (Responsive & Interactive) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTrainer.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="max-w-4xl mx-auto bg-neutral-900 border border-neutral-850 p-6 sm:p-10 relative overflow-hidden flex flex-col md:flex-row items-stretch gap-8 shadow-2xl"
              id="trainer-details-panel"
            >
              {/* Highlight background lines */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF4D00]/5 rounded-full blur-2xl pointer-events-none" />

              {/* Mini Info Panel Left */}
              <div className="md:w-1/3 flex flex-col justify-between items-center md:items-start text-center md:text-left border-b md:border-b-0 md:border-r border-neutral-800 pb-6 md:pb-0 md:pr-8">
                <div>
                  <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-[#FF4D00] border border-[#FF4D00]/30 px-2.5 py-1 bg-[#FF4D00]/5 inline-block mb-3">
                    Active Coach Spec
                  </span>
                  <h4 className="text-xl font-black text-white uppercase tracking-tight">
                    {selectedTrainer.name}
                  </h4>
                  <p className="text-xs text-neutral-450 uppercase font-mono tracking-widest mt-1">
                    {selectedTrainer.role}
                  </p>
                </div>

                <div className="mt-6 space-y-2.5 w-full hidden md:block">
                  <div className="flex justify-between text-[11px] uppercase tracking-wider text-neutral-500 font-bold border-b border-neutral-850/40 pb-1.5">
                    <span>Rank Status</span>
                    <span className="text-white font-black">Elite Class</span>
                  </div>
                  <div className="flex justify-between text-[11px] uppercase tracking-wider text-neutral-500 font-bold border-b border-neutral-850/40 pb-1.5">
                    <span>Specialty</span>
                    <span className="text-[#FF4D00] font-black">Biometric Prep</span>
                  </div>
                </div>
              </div>

              {/* Bio & Expertise Right */}
              <div className="md:w-2/3 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <h5 className="text-xs uppercase tracking-[0.2em] font-extrabold text-neutral-400 font-mono">
                    Professional Background
                  </h5>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed italic">
                    "{selectedTrainer.bio}"
                  </p>
                </div>

                <div className="space-y-3">
                  <h5 className="text-xs uppercase tracking-[0.2em] font-extrabold text-neutral-400 font-mono">
                    Areas of Expertise
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {selectedTrainer.expertise.map((exp, idx) => (
                      <span
                        key={idx}
                        className="px-3.5 py-1.5 text-[10px] sm:text-xs font-bold text-neutral-300 uppercase bg-neutral-950 border border-neutral-800 hover:border-[#FF4D00] hover:text-white transition-colors duration-300"
                      >
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Micro Motivational Accents */}
                <div className="pt-4 border-t border-neutral-850/40 flex items-center gap-3 text-[10px] text-neutral-500 uppercase tracking-widest">
                  <Flame className="w-4 h-4 text-[#FF4D00]" />
                  <span>Unlocking raw human potential • Join his session now</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
