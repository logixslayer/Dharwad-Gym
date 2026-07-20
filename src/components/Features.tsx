import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Dumbbell, Zap, Flame, Wind, ArrowRight, ShieldCheck, Award, FlameKindling } from 'lucide-react';
import { TRAINING_PROGRAMS } from '../data';
import { TrainingProgram } from '../types';

interface FeaturesProps {
  onJoinClick: () => void;
}

export default function Features({ onJoinClick }: FeaturesProps) {
  const [selectedProgramId, setSelectedProgramId] = useState<string>('strength');

  // Helper to map string to Lucide Icon
  const getIcon = (name: string) => {
    switch (name) {
      case 'Dumbbell':
        return <Dumbbell className="w-5 h-5 text-[#FF4D00]" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-[#FF4D00]" />;
      case 'Flame':
        return <Flame className="w-5 h-5 text-[#FF4D00]" />;
      case 'Wind':
        return <Wind className="w-5 h-5 text-[#FF4D00]" />;
      default:
        return <Dumbbell className="w-5 h-5" />;
    }
  };

  const activeProgram = TRAINING_PROGRAMS.find((p) => p.id === selectedProgramId) || TRAINING_PROGRAMS[0];

  // Elite metrics for selected programs to enrich interactivity
  const programDetails: Record<
    string,
    {
      calories: string;
      difficulty: 'Intermediate' | 'Advanced' | 'All Levels';
      muscles: string[];
      frequency: string;
      eliteHighlight: string;
    }
  > = {
    strength: {
      calories: '650 - 900 kcal/hr',
      difficulty: 'Advanced',
      muscles: ['Quadriceps', 'Glutes', 'Lats', 'Chest', 'Core'],
      frequency: '3 - 4 sessions / week',
      eliteHighlight: 'Includes progressive overload mapping, bar path telemetry analysis, and private lifting platform reserves.'
    },
    hiit: {
      calories: '800 - 1100 kcal/hr',
      difficulty: 'All Levels',
      muscles: ['Full Body', 'Cardiovascular System', 'Calves', 'Core'],
      frequency: '2 - 3 sessions / week',
      eliteHighlight: 'EPOC "afterburn" effect state optimization, real-time heart rate zones displayed on dark screen grids.'
    },
    combat: {
      calories: '750 - 1000 kcal/hr',
      difficulty: 'Intermediate',
      muscles: ['Shoulders', 'Triceps', 'Core Rotate', 'Hip Flexors'],
      frequency: '2 - 3 sessions / week',
      eliteHighlight: 'Full mitt-work choreography with champion kickboxers, impact reaction trackers, and heavy bag drills.'
    },
    recovery: {
      calories: '250 - 400 kcal/hr',
      difficulty: 'All Levels',
      muscles: ['Spine Mobilizers', 'Hamstrings', 'Rotator Cuff', 'Nervous System'],
      frequency: 'Daily restoration',
      eliteHighlight: 'Active release techniques, temperature-contrast advice, infrared integration, and myofascial triggers.'
    }
  };

  const activeMetrics = programDetails[selectedProgramId] || programDetails.strength;

  return (
    <section id="programs" className="py-24 bg-neutral-950 border-t border-neutral-900/60 relative">
      {/* Light glow elements */}
      <div className="absolute top-[30%] left-[5%] w-[400px] h-[400px] bg-red-650/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[5%] w-[400px] h-[400px] bg-orange-650/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D00]" />
              <span className="text-xs uppercase tracking-[0.3em] font-extrabold text-[#FF4D00]">Elite Curriculum</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-sans uppercase tracking-tight text-white">
              Shatter Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D00] to-red-600">Static Threshold</span>
            </h2>
          </div>
          <p className="max-w-md text-neutral-400 text-sm sm:text-base tracking-wide leading-relaxed">
            Our training methodologies aren't built on standard gym routines. We combine physical overload with high-contrast, clean architecture to forge pure drive.
          </p>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: List of high-contrast cards (Grid Span 7) */}
          <div className="lg:col-span-7 space-y-4" id="programs-card-container">
            {TRAINING_PROGRAMS.map((program) => {
              const isSelected = selectedProgramId === program.id;
              return (
                <button
                  key={program.id}
                  onClick={() => setSelectedProgramId(program.id)}
                  className={`w-full text-left rounded-none overflow-hidden border transition-all duration-500 relative flex flex-col sm:flex-row items-stretch cursor-pointer group h-auto sm:h-44 ${
                    isSelected
                      ? 'border-[#FF4D00] bg-gradient-to-r from-neutral-900 to-orange-950/10 shadow-[0_4px_30px_rgba(255,77,0,0.05)]'
                      : 'border-neutral-900 bg-neutral-900/40 hover:border-neutral-800'
                  }`}
                  id={`program-btn-${program.id}`}
                >
                  {/* Photo thumbnail column */}
                  <div className="w-full sm:w-1/3 min-h-32 sm:min-h-0 relative overflow-hidden shrink-0">
                    <img
                      src={program.image}
                      alt={program.title}
                      className="w-full h-full object-cover object-center transition-transform duration-750 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-neutral-950/60 to-transparent" />
                  </div>

                  {/* Body Content Column */}
                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500">
                          {program.subtitle}
                        </span>
                        <div className="px-2 py-0.5 rounded-none bg-neutral-900 border border-neutral-800 text-[8px] font-bold uppercase tracking-widest text-[#FF4D00]">
                          {program.tag}
                        </div>
                      </div>
                      <h3 className="text-lg font-black uppercase tracking-tight text-white group-hover:text-orange-400 transition-colors">
                        {program.title}
                      </h3>
                      <p className="text-xs text-neutral-400 mt-2 line-clamp-2 leading-relaxed">
                        {program.description}
                      </p>
                    </div>

                    {/* Bottom Indicator */}
                    <div className="flex items-center justify-between mt-4 border-t border-neutral-850/60 pt-2.5">
                      <div className="flex items-center gap-2">
                        {getIcon(program.iconName)}
                        <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-500">
                          Active Protocol
                        </span>
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 transition-all ${isSelected ? 'text-[#FF4D00]' : 'text-neutral-600 group-hover:text-neutral-400'}`}>
                        {isSelected ? 'Viewing details' : 'View metrics'}
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Dynamic Deep Metric Dashboard (Grid Span 5) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedProgramId}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="rounded-none bg-neutral-900/50 border border-neutral-850 p-6 md:p-8 relative overflow-hidden shadow-2xl"
                id="program-details-dashboard"
              >
                {/* Background glow overlay specific to active tab */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF4D00]/5 rounded-full blur-3xl pointer-events-none" />

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-none bg-[#FF4D00]/10 border border-[#FF4D00]/20 flex items-center justify-center">
                      {getIcon(activeProgram.iconName)}
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-widest text-neutral-500 font-bold">METRICS SHEETS</span>
                      <h4 className="text-sm font-black uppercase text-white tracking-wider">{activeProgram.title}</h4>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-neutral-400 font-extrabold">Live Load</span>
                  </div>
                </div>

                {/* Subtitle / Quote */}
                <div className="text-sm text-neutral-300 italic border-l-2 border-[#FF4D00] pl-4 mb-8">
                  "{activeProgram.description}"
                </div>

                {/* Technical Metric Grid */}
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center py-2 border-b border-neutral-850">
                    <span className="text-xs uppercase text-neutral-500 tracking-wider">Estimated Metabolism Burn</span>
                    <span className="text-xs font-mono font-bold text-white">{activeMetrics.calories}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-neutral-850">
                    <span className="text-xs uppercase text-neutral-500 tracking-wider">Lifting Tier Required</span>
                    <span className={`text-xs font-black uppercase tracking-wider ${activeMetrics.difficulty === 'Advanced' ? 'text-[#FF4D00]' : 'text-[#FF4D00]/85'}`}>
                      {activeMetrics.difficulty}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-neutral-850">
                    <span className="text-xs uppercase text-neutral-500 tracking-wider">Optimal Weekly Dose</span>
                    <span className="text-xs font-bold text-neutral-200">{activeMetrics.frequency}</span>
                  </div>
                  <div>
                    <span className="text-xs uppercase text-neutral-500 tracking-wider block mb-2">Target Muscle Recruits</span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeMetrics.muscles.map((muscle) => (
                        <span key={muscle} className="px-2.5 py-1 rounded-none bg-neutral-950 border border-neutral-850 text-[10px] font-bold text-neutral-400 uppercase tracking-wide">
                          {muscle}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Elite Highlight text */}
                <div className="p-4 bg-neutral-950/50 rounded-none border border-neutral-850 text-xs text-neutral-400 leading-relaxed mb-8 flex gap-3">
                  <Award className="w-5 h-5 text-[#FF4D00] shrink-0" />
                  <div>
                    <strong className="text-neutral-200 block mb-0.5">Ignite Vanguard Spec</strong>
                    {activeMetrics.eliteHighlight}
                  </div>
                </div>

                {/* Action CTA inside detail card */}
                <button
                  onClick={onJoinClick}
                  className="w-full py-4 rounded-none bg-[#FF4D00] text-black hover:scale-[1.01] text-xs font-black uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer skew-x-[-10deg]"
                  id="bento-signup-cta"
                >
                  <span className="inline-block skew-x-[10deg] flex items-center gap-2">
                    Request Program Assessment
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
