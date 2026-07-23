import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, Heart, Info, Target, Flame } from 'lucide-react';

export default function FitnessCalculator() {
  const [activeTab, setActiveTab] = useState<'calories' | 'heart'>('calories');

  // HEART STATE
  const [age, setAge] = useState<number>(25);
  const [restingHr, setRestingHr] = useState<number>(65);

  // CALORIES STATE
  const [weight, setWeight] = useState<number>(70); // kg
  const [height, setHeight] = useState<number>(170); // cm
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [activity, setActivity] = useState<number>(1.55); // active multiplier
  const [goal, setGoal] = useState<'maintain' | 'loss' | 'gain'>('maintain');

  // HEART CALCS
  const maxHr = Math.max(120, 220 - age);
  const hrReserve = Math.max(20, maxHr - restingHr);

  const getHrZone = (intensity: number) => {
    return Math.round(restingHr + hrReserve * intensity);
  };

  // ACCURATE CALORIE CALCS (Mifflin-St Jeor formula)
  const bmr = gender === 'male'
    ? Math.round(10 * weight + 6.25 * height - 5 * age + 5)
    : Math.round(10 * weight + 6.25 * height - 5 * age - 161);

  const maintenanceCalories = Math.round(bmr * activity);

  let targetCalories = maintenanceCalories;
  if (goal === 'loss') targetCalories = Math.max(1200, Math.round(maintenanceCalories - 500));
  if (goal === 'gain') targetCalories = Math.round(maintenanceCalories + 400);

  // ACCURATE MACROS
  // Protein: 2.0g per kg of bodyweight (ideal for active training)
  const proteinGrams = Math.round(weight * 2.0);
  const proteinCalories = proteinGrams * 4;

  // Fat: 25% of target calories
  const fatCalories = targetCalories * 0.25;
  const fatGrams = Math.round(fatCalories / 9);

  // Carbs: Remaining calories
  const carbCalories = Math.max(0, targetCalories - (proteinCalories + fatCalories));
  const carbGrams = Math.round(carbCalories / 4);

  const proteinPct = Math.round((proteinCalories / targetCalories) * 100);
  const fatPct = Math.round((fatCalories / targetCalories) * 100);
  const carbPct = Math.round((carbCalories / targetCalories) * 100);

  return (
    <section id="metrics" className="py-20 bg-neutral-950 border-t border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D00]" />
              <span className="text-xs uppercase tracking-widest font-extrabold text-[#FF4D00]">Fitness Tools</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-sans uppercase tracking-tight text-white">
              Calorie & Heart Rate <span className="text-[#FF4D00]">Calculator</span>
            </h2>
          </div>
          <p className="max-w-md text-neutral-400 text-sm leading-relaxed">
            Calculate your exact daily calories, protein, carbs, and target heart rate zones based on proven metabolic formulas.
          </p>
        </div>

        {/* Outer Wrapper Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* LEFT: Inputs & Selector Tabs (Grid Span 6) */}
          <div className="lg:col-span-6 bg-neutral-900 border border-neutral-800 rounded-2xl p-6 md:p-8 flex flex-col justify-between" id="calculator-workbench">
            <div>
              {/* Tab Selector */}
              <div className="flex bg-neutral-950 p-1 rounded-xl mb-6 border border-neutral-800">
                <button
                  onClick={() => setActiveTab('calories')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === 'calories'
                      ? 'bg-neutral-800 text-[#FF4D00] shadow'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                  id="tab-btn-calories"
                >
                  <Calculator className="w-4 h-4" />
                  Calorie & Macro Needs
                </button>
                <button
                  onClick={() => setActiveTab('heart')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === 'heart'
                      ? 'bg-neutral-800 text-[#FF4D00] shadow'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                  id="tab-btn-heart"
                >
                  <Heart className="w-4 h-4" />
                  Target Heart Rate
                </button>
              </div>

              {/* TAB 1: CALORIES INPUTS */}
              <AnimatePresence mode="wait">
                {activeTab === 'calories' ? (
                  <motion.div
                    key="calories-inputs"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-5"
                  >
                    {/* Weight & Height */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label className="text-xs font-bold text-neutral-300">Weight (kg)</label>
                          <input
                            type="number"
                            min="30"
                            max="200"
                            value={weight}
                            onChange={(e) => setWeight(Math.max(30, Math.min(200, Number(e.target.value) || 30)))}
                            className="w-16 bg-neutral-950 border border-neutral-800 rounded text-right px-2 py-0.5 text-xs text-white font-mono font-bold"
                          />
                        </div>
                        <input
                          type="range"
                          min="30"
                          max="180"
                          value={weight}
                          onChange={(e) => setWeight(Number(e.target.value))}
                          className="w-full accent-[#FF4D00] h-1.5 bg-neutral-950 rounded appearance-none cursor-pointer"
                          id="range-input-weight"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label className="text-xs font-bold text-neutral-300">Height (cm)</label>
                          <input
                            type="number"
                            min="100"
                            max="230"
                            value={height}
                            onChange={(e) => setHeight(Math.max(100, Math.min(230, Number(e.target.value) || 100)))}
                            className="w-16 bg-neutral-950 border border-neutral-800 rounded text-right px-2 py-0.5 text-xs text-white font-mono font-bold"
                          />
                        </div>
                        <input
                          type="range"
                          min="120"
                          max="220"
                          value={height}
                          onChange={(e) => setHeight(Number(e.target.value))}
                          className="w-full accent-[#FF4D00] h-1.5 bg-neutral-950 rounded appearance-none cursor-pointer"
                          id="range-input-height"
                        />
                      </div>
                    </div>

                    {/* Age & Gender */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label className="text-xs font-bold text-neutral-300">Age (years)</label>
                          <input
                            type="number"
                            min="12"
                            max="90"
                            value={age}
                            onChange={(e) => setAge(Math.max(12, Math.min(90, Number(e.target.value) || 12)))}
                            className="w-16 bg-neutral-950 border border-neutral-800 rounded text-right px-2 py-0.5 text-xs text-white font-mono font-bold"
                          />
                        </div>
                        <input
                          type="range"
                          min="14"
                          max="80"
                          value={age}
                          onChange={(e) => setAge(Number(e.target.value))}
                          className="w-full accent-[#FF4D00] h-1.5 bg-neutral-950 rounded appearance-none cursor-pointer"
                          id="range-input-age-cal"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-neutral-300 block mb-1.5">Gender</label>
                        <div className="flex bg-neutral-950 p-1 rounded-lg border border-neutral-800">
                          <button
                            type="button"
                            onClick={() => setGender('male')}
                            className={`flex-1 py-1 rounded text-xs font-bold transition-all ${
                              gender === 'male' ? 'bg-neutral-800 text-white' : 'text-neutral-500 hover:text-neutral-300'
                            }`}
                            id="gender-btn-male"
                          >
                            Male
                          </button>
                          <button
                            type="button"
                            onClick={() => setGender('female')}
                            className={`flex-1 py-1 rounded text-xs font-bold transition-all ${
                              gender === 'female' ? 'bg-neutral-800 text-white' : 'text-neutral-500 hover:text-neutral-300'
                            }`}
                            id="gender-btn-female"
                          >
                            Female
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Activity Level */}
                    <div>
                      <label className="text-xs font-bold text-neutral-300 block mb-1.5">Weekly Activity Level</label>
                      <select
                        value={activity}
                        onChange={(e) => setActivity(parseFloat(e.target.value))}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg py-2 px-3 text-xs text-white focus:outline-none focus:border-[#FF4D00] cursor-pointer"
                        id="select-input-activity"
                      >
                        <option value="1.2">Sedentary (Little or no exercise)</option>
                        <option value="1.375">Lightly Active (Workout 1-3 days/week)</option>
                        <option value="1.55">Moderately Active (Workout 3-5 days/week)</option>
                        <option value="1.725">Very Active (Workout 6-7 days/week)</option>
                      </select>
                    </div>

                    {/* Target Goal */}
                    <div>
                      <label className="text-xs font-bold text-neutral-300 block mb-2">Fitness Goal</label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: 'loss', label: 'Weight Loss', desc: '-500 kcal' },
                          { id: 'maintain', label: 'Maintain', desc: 'Current weight' },
                          { id: 'gain', label: 'Muscle Gain', desc: '+400 kcal' }
                        ].map((g) => {
                          const isSelected = goal === g.id;
                          return (
                            <button
                              key={g.id}
                              type="button"
                              onClick={() => setGoal(g.id as 'maintain' | 'loss' | 'gain')}
                              className={`p-2.5 rounded-lg border text-center transition-all cursor-pointer ${
                                isSelected
                                  ? 'border-[#FF4D00] bg-[#FF4D00]/10 text-white'
                                  : 'border-neutral-800 bg-neutral-950 hover:border-neutral-700 text-neutral-400'
                              }`}
                              id={`goal-btn-${g.id}`}
                            >
                              <div className="text-xs font-bold text-white">{g.label}</div>
                              <div className="text-[10px] text-neutral-500 mt-0.5">{g.desc}</div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  /* TAB 2: HEART INPUTS */
                  <motion.div
                    key="heart-inputs"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-xs font-bold text-neutral-300">Your Age</label>
                        <span className="text-sm font-mono font-bold text-white">{age} yrs</span>
                      </div>
                      <input
                        type="range"
                        min="14"
                        max="80"
                        value={age}
                        onChange={(e) => setAge(Number(e.target.value))}
                        className="w-full accent-[#FF4D00] h-1.5 bg-neutral-950 rounded appearance-none cursor-pointer"
                        id="range-input-age-hr"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-xs font-bold text-neutral-300">Resting Heart Rate (BPM)</label>
                        <span className="text-sm font-mono font-bold text-white">{restingHr} BPM</span>
                      </div>
                      <input
                        type="range"
                        min="40"
                        max="100"
                        value={restingHr}
                        onChange={(e) => setRestingHr(Number(e.target.value))}
                        className="w-full accent-[#FF4D00] h-1.5 bg-neutral-950 rounded appearance-none cursor-pointer"
                        id="range-input-rhr"
                      />
                      <span className="text-[11px] text-neutral-500 mt-1 block">
                        Measured while sitting quietly in the morning (Normal resting heart rate is 60-80 BPM).
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-800 flex items-start gap-2 text-[11px] text-neutral-500">
              <Info className="w-4 h-4 text-[#FF4D00] shrink-0 mt-0.5" />
              <span>
                Calculated using standard Mifflin-St Jeor metabolic formulas for reliable daily intake guidance.
              </span>
            </div>
          </div>

          {/* RIGHT: Output Visual Panel (Grid Span 6) */}
          <div className="lg:col-span-6 flex flex-col justify-between" id="calculator-telemetry-dashboard">
            <AnimatePresence mode="wait">
              {activeTab === 'calories' ? (
                /* CALORIES & MACROS RESULTS */
                <motion.div
                  key="calories-results"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 md:p-8 flex-1 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-bold">YOUR DAILY TARGET</span>
                        <h3 className="text-xl font-bold uppercase text-white tracking-tight">Nutrition Summary</h3>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-neutral-400 font-medium block">Daily Calories</span>
                        <span className="text-3xl font-black font-sans text-[#FF4D00] tracking-tight block">
                          {targetCalories} <span className="text-xs text-neutral-400 font-normal">kcal/day</span>
                        </span>
                      </div>
                    </div>

                    {/* Metabolic breakdown pills */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800">
                        <span className="text-[10px] text-neutral-500 uppercase font-bold block">Base Metabolic Rate (BMR)</span>
                        <span className="text-lg font-mono font-bold text-white">{bmr} kcal</span>
                      </div>
                      <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800">
                        <span className="text-[10px] text-neutral-500 uppercase font-bold block">Maintenance (TDEE)</span>
                        <span className="text-lg font-mono font-bold text-white">{maintenanceCalories} kcal</span>
                      </div>
                    </div>

                    {/* Macro Bars graphic */}
                    <div className="space-y-4 mb-6">
                      {/* Protein */}
                      <div>
                        <div className="flex justify-between items-center text-xs mb-1">
                          <span className="font-bold text-white">Protein (Build & Repair)</span>
                          <span className="font-mono font-bold text-[#FF4D00]">{proteinGrams}g <span className="text-[#FF4D00]/70">({proteinPct}%)</span></span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-neutral-950 overflow-hidden">
                          <div className="h-full bg-[#FF4D00]" style={{ width: `${Math.min(100, proteinPct)}%` }} />
                        </div>
                      </div>

                      {/* Carbs */}
                      <div>
                        <div className="flex justify-between items-center text-xs mb-1">
                          <span className="font-bold text-white">Carbs (Daily Energy)</span>
                          <span className="font-mono font-bold text-neutral-300">{carbGrams}g <span className="text-neutral-500">({carbPct}%)</span></span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-neutral-950 overflow-hidden">
                          <div className="h-full bg-neutral-400" style={{ width: `${Math.min(100, carbPct)}%` }} />
                        </div>
                      </div>

                      {/* Fats */}
                      <div>
                        <div className="flex justify-between items-center text-xs mb-1">
                          <span className="font-bold text-white">Fats (Hormones & Health)</span>
                          <span className="font-mono font-bold text-neutral-400">{fatGrams}g <span className="text-neutral-500">({fatPct}%)</span></span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-neutral-950 overflow-hidden">
                          <div className="h-full bg-neutral-600" style={{ width: `${Math.min(100, fatPct)}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 bg-neutral-950 rounded-xl border border-neutral-800 flex items-start gap-2.5">
                    <Target className="w-4 h-4 text-[#FF4D00] shrink-0 mt-0.5" />
                    <div className="text-xs text-neutral-300 leading-relaxed">
                      {goal === 'loss' && 'A 500 kcal daily deficit promotes safe fat loss of ~0.5kg per week while preserving muscle mass.'}
                      {goal === 'maintain' && 'Consuming maintenance calories supports workout performance and maintains your current weight.'}
                      {goal === 'gain' && 'A 400 kcal surplus fuels muscle growth and strength progression during heavy weight training.'}
                    </div>
                  </div>
                </motion.div>
              ) : (
                /* HEART ZONE CARD */
                <motion.div
                  key="heart-results"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 md:p-8 flex-1 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-bold">WORKOUT INTENSITY</span>
                        <h3 className="text-xl font-bold uppercase text-white tracking-tight">Heart Rate Zones</h3>
                      </div>
                      <div className="px-3 py-1 rounded bg-neutral-950 border border-neutral-800 text-xs font-mono font-bold text-[#FF4D00]">
                        Max: {maxHr} BPM
                      </div>
                    </div>

                    {/* Zone list */}
                    <div className="space-y-3">
                      {[
                        { name: 'Warmup & Recovery', intensity: '50% - 60%', range: `${getHrZone(0.5)} - ${getHrZone(0.6)} BPM`, color: 'bg-neutral-600' },
                        { name: 'Fat Burning Zone', intensity: '60% - 70%', range: `${getHrZone(0.6)} - ${getHrZone(0.7)} BPM`, color: 'bg-neutral-400' },
                        { name: 'Aerobic / Cardio Zone', intensity: '70% - 85%', range: `${getHrZone(0.7)} - ${getHrZone(0.85)} BPM`, color: 'bg-[#FF4D00]/80' },
                        { name: 'Peak / HIIT Zone', intensity: '85% - 100%', range: `${getHrZone(0.85)} - ${getHrZone(1)} BPM`, color: 'bg-[#FF4D00]' }
                      ].map((zone) => (
                        <div key={zone.name} className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-1.5 h-7 rounded-full ${zone.color}`} />
                            <div>
                              <div className="text-xs font-bold text-white">{zone.name}</div>
                              <div className="text-[10px] text-neutral-500">Intensity: {zone.intensity}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-mono font-bold text-white">{zone.range}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 p-3.5 bg-[#FF4D00]/10 border border-[#FF4D00]/20 rounded-xl flex items-center gap-3">
                    <Flame className="w-5 h-5 text-[#FF4D00] shrink-0" />
                    <span className="text-xs text-neutral-300 leading-relaxed">
                      Training in the <strong>Fat Burning & Cardio Zones</strong> (above {getHrZone(0.6)} BPM) maximizes stamina and post-workout calorie burn.
                    </span>
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
