import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, Activity, Heart, Info, ArrowRight, Zap, Target } from 'lucide-react';

export default function FitnessCalculator() {
  const [activeTab, setActiveTab] = useState<'heart' | 'calories'>('heart');

  // HEART STATE
  const [age, setAge] = useState<number>(28);
  const [restingHr, setRestingHr] = useState<number>(60);

  // CALORIES STATE
  const [weight, setWeight] = useState<number>(75); // kg
  const [height, setHeight] = useState<number>(178); // cm
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [activity, setActivity] = useState<number>(1.55); // active multiplier
  const [goal, setGoal] = useState<'maintain' | 'loss' | 'gain'>('maintain');

  // HEART CALCS
  const maxHr = 220 - age;
  const hrReserve = maxHr - restingHr;

  const getHrZone = (intensity: number) => {
    return Math.round(restingHr + hrReserve * intensity);
  };

  // CALORIE CALCS
  // Mifflin-St Jeor
  const bmr = gender === 'male'
    ? 10 * weight + 6.25 * height - 5 * age + 5
    : 10 * weight + 6.25 * height - 5 * age - 161;

  const maintenanceCalories = Math.round(bmr * activity);

  let targetCalories = maintenanceCalories;
  if (goal === 'loss') targetCalories = Math.round(maintenanceCalories - 500);
  if (goal === 'gain') targetCalories = Math.round(maintenanceCalories + 400);

  // Macros Breakdowns
  const getMacros = () => {
    // protein: 4 kcal/g, fat: 9 kcal/g, carb: 4 kcal/g
    let pPct = 0.3; // 30% protein default
    let fPct = 0.25; // 25% fat default
    let cPct = 0.45; // 45% carb default

    if (goal === 'gain') {
      pPct = 0.35; // 35% protein
      fPct = 0.25;
      cPct = 0.40;
    } else if (goal === 'loss') {
      pPct = 0.40; // 40% protein high
      fPct = 0.25;
      cPct = 0.35;
    }

    const proteinGrams = Math.round((targetCalories * pPct) / 4);
    const fatGrams = Math.round((targetCalories * fPct) / 9);
    const carbGrams = Math.round((targetCalories * cPct) / 4);

    return {
      pGrams: proteinGrams,
      fGrams: fatGrams,
      cGrams: carbGrams,
      pPct: Math.round(pPct * 100),
      fPct: Math.round(fPct * 100),
      cPct: Math.round(cPct * 100)
    };
  };

  const macros = getMacros();

  return (
    <section id="metrics" className="py-24 bg-neutral-950 border-t border-neutral-900/60 relative">
      <div className="absolute top-[20%] right-[10%] w-[350px] h-[350px] bg-orange-650/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[10%] w-[350px] h-[350px] bg-red-650/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D00]" />
              <span className="text-xs uppercase tracking-[0.3em] font-extrabold text-[#FF4D00]">Biometrics Station</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-sans uppercase tracking-tight text-white">
              Ignite Performance <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D00] to-red-650">Telemetry</span>
            </h2>
          </div>
          <p className="max-w-md text-neutral-400 text-sm sm:text-base tracking-wide leading-relaxed">
            Configure your personal coordinates. Calculate training zones and nutritional macros immediately using accredited athletic telemetry formulas.
          </p>
        </div>

        {/* Outer Wrapper Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* LEFT: Inputs & Selector Tabs (Grid Span 6) */}
          <div className="lg:col-span-6 bg-neutral-900 border border-neutral-850 rounded-none p-6 md:p-8 flex flex-col justify-between" id="calculator-workbench">
            <div>
              {/* Tab Selector */}
              <div className="flex bg-neutral-950 p-1.5 rounded-none mb-8 border border-neutral-850">
                <button
                  onClick={() => setActiveTab('heart')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-none text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === 'heart'
                      ? 'bg-neutral-900 border border-neutral-800 text-[#FF4D00] shadow-md'
                      : 'text-neutral-500 hover:text-neutral-300'
                  }`}
                  id="tab-btn-heart"
                >
                  <Heart className="w-4 h-4" />
                  Target Heart rate
                </button>
                <button
                  onClick={() => setActiveTab('calories')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-none text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === 'calories'
                      ? 'bg-neutral-900 border border-neutral-800 text-[#FF4D00] shadow-md'
                      : 'text-neutral-500 hover:text-neutral-300'
                  }`}
                  id="tab-btn-calories"
                >
                  <Calculator className="w-4 h-4" />
                  Caloric & Macro Needs
                </button>
              </div>

              {/* TAB 1: HEART INPUTS */}
              <AnimatePresence mode="wait">
                {activeTab === 'heart' ? (
                  <motion.div
                    key="heart-inputs"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    {/* Age Slider */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-xs uppercase tracking-wider text-neutral-400 font-bold">
                          Age Coordinate
                        </label>
                        <span className="text-lg font-mono font-black text-white">{age} <span className="text-neutral-500 text-xs">yrs</span></span>
                      </div>
                      <input
                        type="range"
                        min="14"
                        max="90"
                        value={age}
                        onChange={(e) => setAge(parseInt(e.target.value))}
                        className="w-full accent-[#FF4D00] h-1.5 bg-neutral-950 rounded-none appearance-none cursor-pointer"
                        id="range-input-age"
                      />
                    </div>

                    {/* Resting Heart Rate Slider */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-xs uppercase tracking-wider text-neutral-400 font-bold">
                          Resting Heart Rate (RHR)
                        </label>
                        <span className="text-lg font-mono font-black text-white">{restingHr} <span className="text-neutral-500 text-xs">BPM</span></span>
                      </div>
                      <input
                        type="range"
                        min="40"
                        max="100"
                        value={restingHr}
                        onChange={(e) => setRestingHr(parseInt(e.target.value))}
                        className="w-full accent-[#FF4D00] h-1.5 bg-neutral-950 rounded-none appearance-none cursor-pointer"
                        id="range-input-rhr"
                      />
                      <span className="text-[10px] text-neutral-500 mt-1 block">
                        💡 Measured sitting quiet in the morning (elite resting is typically 50-60 BPM).
                      </span>
                    </div>
                  </motion.div>
                ) : (
                  /* TAB 2: CALORIES INPUTS */
                  <motion.div
                    key="calories-inputs"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-5"
                  >
                    {/* Weight & Height sliders in columns */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="text-xs uppercase tracking-wider text-neutral-400 font-bold">
                            Weight
                          </label>
                          <span className="text-base font-mono font-black text-white">{weight} <span className="text-neutral-500 text-xs">kg</span></span>
                        </div>
                        <input
                          type="range"
                          min="40"
                          max="180"
                          value={weight}
                          onChange={(e) => setWeight(parseInt(e.target.value))}
                          className="w-full accent-[#FF4D00] h-1.5 bg-neutral-950 rounded-none appearance-none cursor-pointer"
                          id="range-input-weight"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="text-xs uppercase tracking-wider text-neutral-400 font-bold">
                            Height
                          </label>
                          <span className="text-base font-mono font-black text-white">{height} <span className="text-neutral-500 text-xs">cm</span></span>
                        </div>
                        <input
                          type="range"
                          min="120"
                          max="220"
                          value={height}
                          onChange={(e) => setHeight(parseInt(e.target.value))}
                          className="w-full accent-[#FF4D00] h-1.5 bg-neutral-950 rounded-none appearance-none cursor-pointer"
                          id="range-input-height"
                        />
                      </div>
                    </div>

                    {/* Gender and Activity Selector */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs uppercase tracking-wider text-neutral-500 font-bold block mb-1.5">
                          Biological Gender
                        </label>
                        <div className="flex bg-neutral-950 p-1 rounded-none border border-neutral-850">
                          <button
                            onClick={() => setGender('male')}
                            className={`flex-1 py-1.5 rounded-none text-[10px] font-black uppercase tracking-wider cursor-pointer ${
                              gender === 'male' ? 'bg-neutral-900 text-white' : 'text-neutral-500 hover:text-neutral-350'
                            }`}
                            id="gender-btn-male"
                          >
                            Male
                          </button>
                          <button
                            onClick={() => setGender('female')}
                            className={`flex-1 py-1.5 rounded-none text-[10px] font-black uppercase tracking-wider cursor-pointer ${
                              gender === 'female' ? 'bg-neutral-900 text-white' : 'text-neutral-500 hover:text-neutral-350'
                            }`}
                            id="gender-btn-female"
                          >
                            Female
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="text-xs uppercase tracking-wider text-neutral-500 font-bold block mb-1.5">
                          Daily Physical Activity
                        </label>
                        <select
                          value={activity}
                          onChange={(e) => setActivity(parseFloat(e.target.value))}
                          className="w-full bg-neutral-950 border border-neutral-850 rounded-none py-2 px-3 text-[11px] font-bold text-neutral-300 focus:outline-none focus:border-[#FF4D00] cursor-pointer"
                          id="select-input-activity"
                        >
                          <option value="1.2">Sedentary (No Exercise)</option>
                          <option value="1.375">Light (1-2 days/wk)</option>
                          <option value="1.55">Moderate Active (3-5 days/wk)</option>
                          <option value="1.725">Heavy Athlete (6-7 days/wk)</option>
                          <option value="1.9">Elite Vanguard (Daily Double sessions)</option>
                        </select>
                      </div>
                    </div>

                    {/* Target Goal Selector */}
                    <div>
                      <label className="text-xs uppercase tracking-wider text-neutral-500 font-bold block mb-2">
                        Primary Target Goal
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { id: 'loss', label: 'Fat Loss', desc: '-500 kcal deficit' },
                          { id: 'maintain', label: 'Maintenance', desc: 'Sustained energy' },
                          { id: 'gain', label: 'Muscle Gain', desc: '+400 kcal surplus' }
                        ].map((g) => {
                          const isSelected = goal === g.id;
                          return (
                            <button
                              key={g.id}
                              onClick={() => setGoal(g.id as 'maintain' | 'loss' | 'gain')}
                              className={`p-3 rounded-none border text-center transition-all cursor-pointer ${
                                isSelected
                                  ? 'border-[#FF4D00] bg-[#FF4D00]/5 text-white'
                                  : 'border-neutral-850 bg-neutral-950 hover:border-neutral-800 text-neutral-400'
                              }`}
                              id={`goal-btn-${g.id}`}
                            >
                              <div className="text-[10px] font-black uppercase tracking-wider text-white">{g.label}</div>
                              <div className="text-[8px] text-neutral-500 mt-0.5">{g.desc}</div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Scientific notation footnote */}
            <div className="mt-8 pt-4 border-t border-neutral-850/50 flex items-start gap-2 text-[10px] text-neutral-500">
              <Info className="w-3.5 h-3.5 text-neutral-600 shrink-0 mt-0.5" />
              <span>
                These telemetry values are approximate models based on peer-reviewed metabolic literature. Consistent overload & macro control are essential.
              </span>
            </div>
          </div>

          {/* RIGHT: Output Visual Panel (Grid Span 6) */}
          <div className="lg:col-span-6 flex flex-col justify-between" id="calculator-telemetry-dashboard">
            <AnimatePresence mode="wait">
              {activeTab === 'heart' ? (
                /* TAB 1 RESULTS: HEART ZONE CARD */
                <motion.div
                  key="heart-results"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="bg-neutral-900 border border-neutral-850 rounded-none p-6 md:p-8 flex-1 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <span className="text-[9px] uppercase tracking-widest text-neutral-500 font-bold">VANGUARD RANGE MAP</span>
                        <h3 className="text-xl font-black uppercase text-white font-sans tracking-tight">Zone Telemetry</h3>
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-none bg-neutral-950 border border-neutral-850 text-[10px] font-mono font-bold text-[#FF4D00]">
                        Max: {maxHr} BPM
                      </div>
                    </div>

                    {/* Zone list */}
                    <div className="space-y-4">
                      {[
                        { name: 'Warmup & Active Rest', intensity: '50% - 60%', range: `${getHrZone(0.5)} - ${getHrZone(0.6)}`, color: 'bg-neutral-600' },
                        { name: 'Aerobic Fat Burner', intensity: '60% - 70%', range: `${getHrZone(0.6)} - ${getHrZone(0.7)}`, color: 'bg-neutral-400' },
                        { name: 'Anaerobic Threshold (Cardio)', intensity: '70% - 85%', range: `${getHrZone(0.7)} - ${getHrZone(0.85)}`, color: 'bg-[#FF4D00]/80' },
                        { name: 'VO2 Max Elite Peak', intensity: '85% - 100%', range: `${getHrZone(0.85)} - ${getHrZone(1)}`, color: 'bg-[#FF4D00]' }
                      ].map((zone) => (
                        <div key={zone.name} className="p-3 bg-neutral-950 rounded-none border border-neutral-850 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-1.5 h-8 rounded-none ${zone.color}`} />
                            <div>
                              <div className="text-[10px] font-black uppercase text-white tracking-wider">{zone.name}</div>
                              <div className="text-[9px] text-neutral-500 uppercase mt-0.5">Intensity: {zone.intensity}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-mono font-black text-white">{zone.range}</div>
                            <div className="text-[8px] text-neutral-500 uppercase font-bold">BPM RANGE</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-[#FF4D00]/5 border border-[#FF4D00]/10 rounded-none flex items-center gap-3">
                    <Zap className="w-5 h-5 text-[#FF4D00] shrink-0" />
                    <span className="text-xs text-neutral-300 leading-relaxed">
                      Lifting in the <strong>Cardio & Peak Zones</strong> (above {getHrZone(0.7)} BPM) optimizes EPOC caloric calorie afterburn state.
                    </span>
                  </div>
                </motion.div>
              ) : (
                /* TAB 2 RESULTS: CALORIES & MACROS CARD */
                <motion.div
                  key="calories-results"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="bg-neutral-900 border border-neutral-850 rounded-none p-6 md:p-8 flex-1 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <span className="text-[9px] uppercase tracking-widest text-neutral-500 font-bold">NUTRITIONAL EQUILIBRIUM</span>
                        <h3 className="text-xl font-black uppercase text-white font-sans tracking-tight">Macro Breakdown</h3>
                      </div>
                      <div className="text-right">
                        <span className="text-[8px] uppercase tracking-wider text-neutral-500 block font-bold">DAILY TARGET TARGET</span>
                        <span className="text-2xl font-black font-sans text-[#FF4D00] tracking-tight block">
                          {targetCalories} <span className="text-xs text-neutral-450 font-normal uppercase">kcal</span>
                        </span>
                      </div>
                    </div>

                    {/* Macro Bars graphic */}
                    <div className="space-y-4 mb-6">
                      {/* Protein */}
                      <div>
                        <div className="flex justify-between items-center text-xs mb-1.5">
                          <span className="font-bold text-neutral-300 uppercase tracking-wider text-[10px]">Protein (Amino Compounds)</span>
                          <span className="font-mono font-bold text-white">{macros.pGrams}g <span className="text-[10px] text-neutral-500">({macros.pPct}%)</span></span>
                        </div>
                        <div className="w-full h-2 rounded-none bg-neutral-950 overflow-hidden">
                          <div className="h-full bg-[#FF4D00] rounded-none" style={{ width: `${macros.pPct}%` }} />
                        </div>
                      </div>

                      {/* Carbs */}
                      <div>
                        <div className="flex justify-between items-center text-xs mb-1.5">
                          <span className="font-bold text-neutral-300 uppercase tracking-wider text-[10px]">Carbohydrates (Glycogen Loading)</span>
                          <span className="font-mono font-bold text-white">{macros.cGrams}g <span className="text-[10px] text-neutral-500">({macros.cPct}%)</span></span>
                        </div>
                        <div className="w-full h-2 rounded-none bg-neutral-950 overflow-hidden">
                          <div className="h-full bg-neutral-400 rounded-none" style={{ width: `${macros.cPct}%` }} />
                        </div>
                      </div>

                      {/* Fats */}
                      <div>
                        <div className="flex justify-between items-center text-xs mb-1.5">
                          <span className="font-bold text-neutral-300 uppercase tracking-wider text-[10px]">Essential Fats (Hormone Support)</span>
                          <span className="font-mono font-bold text-white">{macros.fGrams}g <span className="text-[10px] text-neutral-500">({macros.fPct}%)</span></span>
                        </div>
                        <div className="w-full h-2 rounded-none bg-neutral-950 overflow-hidden">
                          <div className="h-full bg-neutral-600 rounded-none" style={{ width: `${macros.fPct}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-neutral-950 rounded-none border border-neutral-850">
                    <div className="text-xs text-neutral-400 leading-relaxed flex gap-2">
                      <Target className="w-4 h-4 text-[#FF4D00] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white block mb-0.5">Vanguard Nutrition Advice</strong>
                        {goal === 'loss' && 'Deficit focused. High protein maintains lean mass while metabolic interval sequences burn body fat.'}
                        {goal === 'maintain' && 'Perfect balance for physical longevity and daily sustained power output on the lifting platforms.'}
                        {goal === 'gain' && 'Surplus structured. Amplified carbs replenish glycogen stores to push heavy compound progressive overloading.'}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
