import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, User, Check, Flame, Trophy, Activity, Wind, Filter } from 'lucide-react';
import { CLASS_SCHEDULE } from '../data';
import { ClassItem } from '../types';

interface ClassScheduleProps {
  onJoinClick: () => void;
  isRegistered: boolean;
}

type DayType = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';

export default function ClassSchedule({ onJoinClick, isRegistered }: ClassScheduleProps) {
  const [selectedDay, setSelectedDay] = useState<DayType>('Mon');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [bookedClassIds, setBookedClassIds] = useState<string[]>([]);
  const [spotReduction, setSpotReduction] = useState<Record<string, number>>({});

  const days: { key: DayType; label: string }[] = [
    { key: 'Mon', label: 'Monday' },
    { key: 'Tue', label: 'Tuesday' },
    { key: 'Wed', label: 'Wednesday' },
    { key: 'Thu', label: 'Thursday' },
    { key: 'Fri', label: 'Friday' },
    { key: 'Sat', label: 'Saturday' },
    { key: 'Sun', label: 'Sunday' }
  ];

  const categories = ['All', 'Strength', 'HIIT', 'Combat', 'Recovery'];

  // Filter schedules based on Day & Category
  const filteredClasses = CLASS_SCHEDULE.filter((cls) => {
    const matchesDay = cls.day === selectedDay;
    const matchesCategory = selectedCategory === 'All' || cls.category === selectedCategory;
    return matchesDay && matchesCategory;
  });

  const handleReserveSpot = (classId: string, item: ClassItem) => {
    if (!isRegistered) {
      // Prompt user to register first
      onJoinClick();
      return;
    }

    if (bookedClassIds.includes(classId)) {
      // Cancel reservation
      setBookedClassIds((prev) => prev.filter((id) => id !== classId));
      setSpotReduction((prev) => ({
        ...prev,
        [classId]: (prev[classId] || 0) - 1
      }));
    } else {
      // Book spot
      const currentFilled = item.reservedSpots + (spotReduction[classId] || 0);
      if (currentFilled >= item.capacity) {
        return; // Full
      }

      setBookedClassIds((prev) => [...prev, classId]);
      setSpotReduction((prev) => ({
        ...prev,
        [classId]: (prev[classId] || 0) + 1
      }));
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Strength':
        return <Trophy className="w-3.5 h-3.5 text-orange-500" />;
      case 'HIIT':
        return <Flame className="w-3.5 h-3.5 text-red-500" />;
      case 'Combat':
        return <Activity className="w-3.5 h-3.5 text-amber-500" />;
      case 'Recovery':
        return <Wind className="w-3.5 h-3.5 text-teal-400" />;
      default:
        return null;
    }
  };

  return (
    <section id="schedule" className="py-24 bg-neutral-900 border-t border-neutral-950 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/20 via-neutral-900 to-neutral-950/20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D00]" />
              <span className="text-xs uppercase tracking-[0.3em] font-extrabold text-[#FF4D00]">Live Timeframes</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-sans uppercase tracking-tight text-white">
              Dynamic Class <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D00] to-red-650">Scheduler</span>
            </h2>
          </div>
          <p className="max-w-md text-neutral-400 text-sm sm:text-base tracking-wide leading-relaxed">
            Choose your focus day and category. Registered members can lock in a virtual training spot instantaneously.
          </p>
        </div>

        {/* Days of Week - Highly Aesthetic Tab Bar */}
        <div className="flex flex-wrap gap-2 md:gap-3 justify-center mb-10 border-b border-neutral-800/80 pb-6 overflow-x-auto scrollbar-none" id="schedule-days-bar">
          {days.map((d) => {
            const isSelected = selectedDay === d.key;
            return (
              <button
                key={d.key}
                onClick={() => setSelectedDay(d.key)}
                className={`px-5 py-3 rounded-none font-bold uppercase tracking-widest text-xs transition-all duration-300 shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-[#FF4D00] text-black shadow-md'
                    : 'bg-neutral-950 border border-neutral-850 text-neutral-400 hover:text-white hover:border-neutral-700'
                }`}
                id={`schedule-day-${d.key}`}
              >
                {d.label}
              </button>
            );
          })}
        </div>

        {/* Category Filter Bar */}
        <div className="flex flex-wrap gap-2 justify-center sm:justify-start items-center mb-8 bg-neutral-950 border border-neutral-850 p-2 rounded-none max-w-2xl mx-auto md:mx-0">
          <div className="flex items-center gap-2 text-neutral-500 text-xs font-bold uppercase tracking-wider px-3 border-r border-neutral-850">
            <Filter className="w-3.5 h-3.5" />
            Filter Focus
          </div>
          <div className="flex flex-wrap gap-1">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-none text-[10px] font-black uppercase tracking-wider transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-neutral-900 border border-neutral-800 text-[#FF4D00]'
                      : 'text-neutral-500 hover:text-neutral-350'
                  }`}
                  id={`schedule-filter-${cat.toLowerCase()}`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Schedule List / Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="schedule-cards-grid">
          <AnimatePresence mode="popLayout">
            {filteredClasses.length > 0 ? (
              filteredClasses.map((item) => {
                const isBooked = bookedClassIds.includes(item.id);
                const currentFilled = item.reservedSpots + (spotReduction[item.id] || 0);
                const isFull = currentFilled >= item.capacity;
                const spotsLeft = item.capacity - currentFilled;

                return (
                  <motion.div
                    layout
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className={`rounded-none p-6 border transition-all duration-300 flex flex-col justify-between h-64 relative overflow-hidden group ${
                      isBooked
                        ? 'border-[#FF4D00]/50 bg-[#FF4D00]/5 shadow-[0_4px_20px_rgba(255,77,0,0.05)]'
                        : 'border-neutral-850 bg-neutral-950/40 hover:border-neutral-800 hover:bg-neutral-950/80'
                    }`}
                    id={`class-card-${item.id}`}
                  >
                    <div>
                      {/* Top Row Category & Time */}
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-none bg-neutral-900 border border-neutral-800 text-[9px] font-black uppercase tracking-wider text-neutral-300">
                          {getCategoryIcon(item.category)}
                          {item.category}
                        </div>
                        <div className="flex items-center gap-1 text-neutral-500 text-[10px] font-mono font-medium">
                          <Clock className="w-3 h-3 text-[#FF4D00]" />
                          {item.time} ({item.duration})
                        </div>
                      </div>

                      {/* Class Title & Trainer */}
                      <h3 className="text-lg font-black uppercase tracking-tight text-white group-hover:text-[#FF4D00] transition-colors">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-1.5 mt-2 text-neutral-400 text-xs">
                        <User className="w-3.5 h-3.5 text-neutral-600" />
                        <span>Lead: <strong className="text-neutral-300 font-semibold">{item.trainer}</strong></span>
                      </div>
                    </div>

                    {/* Bottom Capacity & Button */}
                    <div className="border-t border-neutral-900/80 pt-4 mt-4 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[9px] uppercase tracking-widest text-neutral-500 font-bold">Capacity Status</span>
                        <div className="flex items-center gap-2 mt-1">
                          {/* Spots bar indicator */}
                          <div className="w-16 h-1.5 rounded-full bg-neutral-850 overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${
                                isFull ? 'bg-red-500' : isBooked ? 'bg-[#FF4D00] animate-pulse' : 'bg-neutral-500'
                              }`}
                              style={{ width: `${(currentFilled / item.capacity) * 100}%` }}
                            />
                          </div>
                          <span className={`text-[10px] font-mono font-bold ${isFull ? 'text-red-500' : spotsLeft <= 3 ? 'text-amber-500' : 'text-neutral-400'}`}>
                            {isFull ? 'Full' : `${spotsLeft} spots left`}
                          </span>
                        </div>
                      </div>

                      {/* Reserve Button */}
                      <button
                        onClick={() => handleReserveSpot(item.id, item)}
                        disabled={isFull && !isBooked}
                        className={`px-3.5 py-2 rounded-none text-[10px] font-black uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                          isBooked
                            ? 'bg-[#FF4D00] text-black shadow-md'
                            : isFull
                            ? 'bg-neutral-950 text-neutral-600 border border-neutral-850 cursor-not-allowed'
                            : 'bg-neutral-950 border border-neutral-800 text-neutral-300 hover:text-white hover:border-[#FF4D00]'
                        }`}
                        id={`class-reserve-btn-${item.id}`}
                      >
                        {isBooked ? (
                          <>
                            <Check className="w-3 h-3" />
                            Booked
                          </>
                        ) : isFull ? (
                          'Closed'
                        ) : (
                          'Lock Spot'
                        )}
                      </button>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="col-span-full py-16 text-center border border-dashed border-neutral-800 rounded-2xl bg-neutral-950/20" id="schedule-empty-state">
                <span className="text-sm text-neutral-500 uppercase tracking-widest block mb-1">No Classes Found</span>
                <p className="text-xs text-neutral-600">Try adjusting your filters or checking a different training day.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
