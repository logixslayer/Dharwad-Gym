import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Check,
  Flame,
  ArrowRight,
  Sparkles,
  Trophy,
  Target,
  User,
  Mail,
  Phone,
  QrCode,
  Download,
  CheckCircle,
  HelpCircle,
  Activity
} from 'lucide-react';
import { MEMBERSHIP_PLANS } from '../data';
import { OnboardingData } from '../types';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (data: OnboardingData) => void;
  registeredData: OnboardingData | null;
  preselectedPlanId: string | null;
}

export default function OnboardingModal({
  isOpen,
  onClose,
  onSuccess,
  registeredData,
  preselectedPlanId
}: OnboardingModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<OnboardingData>({
    planId: '1month',
    fullName: '',
    email: '',
    phone: '',
    goal: 'Build Muscle',
    experienceLevel: 'intermediate'
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showFinishedCard, setShowFinishedCard] = useState(false);
  const [generatedPassId, setGeneratedPassId] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (registeredData) {
        setFormData(registeredData);
        setShowFinishedCard(true);
        if (!generatedPassId) {
          setGeneratedPassId('IF-' + Math.floor(100000 + Math.random() * 900000));
        }
      } else {
        setShowFinishedCard(false);
        setStep(1);
        setErrorMsg('');
        setFormData({
          planId: preselectedPlanId || '1month',
          fullName: '',
          email: '',
          phone: '',
          goal: 'Build Muscle',
          experienceLevel: 'intermediate'
        });
      }
    }
  }, [isOpen, registeredData, preselectedPlanId]);

  if (!isOpen) return null;

  const selectedPlan = MEMBERSHIP_PLANS.find((p) => p.id === formData.planId) || MEMBERSHIP_PLANS[1];

  const handleNextStep = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      // Validate Step 3
      if (!formData.fullName.trim()) {
        setErrorMsg('Please enter your full name');
        return;
      }
      if (!formData.email.trim() || !formData.email.includes('@')) {
        setErrorMsg('Please enter a valid email address');
        return;
      }
      if (!formData.phone.trim() || formData.phone.length < 8) {
        setErrorMsg('Please enter a valid phone number');
        return;
      }
      setErrorMsg('');
      triggerPassGeneration();
    }
  };

  const triggerPassGeneration = () => {
    setIsGenerating(true);
    // Simulate high-performance barcode and database entry generation
    setTimeout(() => {
      const randomId = 'IF-' + Math.floor(100000 + Math.random() * 900000);
      setGeneratedPassId(randomId);
      setIsGenerating(false);
      setShowFinishedCard(true);
      onSuccess(formData);
    }, 2000);
  };

  const handleBackStep = () => {
    setErrorMsg('');
    setStep((prev) => Math.max(1, prev - 1));
  };

  const goals = [
    { name: 'Build Muscle', desc: 'Hypertrophy and mass building protocols', icon: Trophy },
    { name: 'Burn Fat', desc: 'Metabolic intervals and active shred sessions', icon: Flame },
    { name: 'Power & Agility', desc: 'Heavy compounds, compound lifts, speed', icon: Activity },
    { name: 'Mind & Mobility', desc: 'Dynamic stretch, recovery and yoga flows', icon: Target }
  ];

  const expLevels: { id: 'beginner' | 'intermediate' | 'advanced'; label: string; desc: string }[] = [
    { id: 'beginner', label: 'Rookie', desc: 'First year in the gym' },
    { id: 'intermediate', label: 'Conditioned', desc: '1-3 years of consistent compounds' },
    { id: 'advanced', label: 'Vanguard', desc: '3+ years of progressive loading' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      {/* Dark overlay with background blur */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-neutral-950/90 backdrop-blur-md"
        id="modal-overlay"
      />

      {/* Main Modal container */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-2xl sm:rounded-3xl shadow-2xl z-10 flex flex-col md:flex-row my-auto max-h-[92vh] overflow-y-auto sm:overflow-hidden"
        id="modal-container"
      >
        {/* Left Side: Motivational Sidebar (Hidden on small mobile, flex on desktop) */}
        <div className="hidden md:flex md:w-2/5 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 p-8 flex-col justify-between border-r border-neutral-800/50">
          <div>
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                <Flame className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-black tracking-widest text-white uppercase">IGNITE FITNESS</span>
            </div>

            <div className="space-y-6">
              <div className="text-xs uppercase tracking-widest text-orange-500 font-bold">Onboarding Process</div>
              <div className="space-y-4">
                {[
                  { stepNum: 1, label: 'Select Your Plan', desc: '1 month, 3 months, or 1 year' },
                  { stepNum: 2, label: 'Customize Your Goals', desc: 'Define your training target' },
                  { stepNum: 3, label: 'Secure Member Profile', desc: 'Your personalized access pass' }
                ].map((s) => {
                  const isActive = step === s.stepNum && !showFinishedCard;
                  const isDone = step > s.stepNum || showFinishedCard;
                  return (
                    <div key={s.stepNum} className="flex gap-3 items-start">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors duration-300 ${
                          isDone
                            ? 'bg-orange-500 text-white'
                            : isActive
                            ? 'border border-orange-500 text-orange-400'
                            : 'border border-neutral-800 text-neutral-600'
                        }`}
                      >
                        {isDone ? <Check className="w-3.5 h-3.5" /> : s.stepNum}
                      </div>
                      <div>
                        <div className={`text-sm font-bold tracking-wide ${isActive ? 'text-white' : isDone ? 'text-neutral-400' : 'text-neutral-600'}`}>
                          {s.label}
                        </div>
                        <div className="text-xs text-neutral-500 mt-0.5">{s.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-neutral-850/50">
            <div className="text-xs text-neutral-500 italic">
              "The iron never lies to you. You can walk outside and listen to all kinds of talk, get told that you are a god or a total bastard. But 200 pounds is always 200 pounds."
            </div>
            <div className="text-[10px] text-neutral-600 font-bold mt-2">— Henry Rollins</div>
          </div>
        </div>

        {/* Compact Mobile Top Step Header (Only on mobile) */}
        <div className="md:hidden bg-neutral-950 px-5 pt-5 pb-3 border-b border-neutral-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#FF4D00] flex items-center justify-center shrink-0">
              <Flame className="w-3.5 h-3.5 text-black" />
            </div>
            <div>
              <span className="text-xs font-black tracking-wider text-white uppercase block">IGNITE FITNESS</span>
              <span className="text-[10px] text-[#FF4D00] font-bold block">
                {!showFinishedCard ? `Step ${step} of 3` : 'Pass Ready'}
              </span>
            </div>
          </div>
          {/* Step Progress Pills */}
          {!showFinishedCard && (
            <div className="flex gap-1.5 items-center pr-8">
              {[1, 2, 3].map((sNum) => (
                <div
                  key={sNum}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    sNum === step
                      ? 'w-6 bg-[#FF4D00]'
                      : sNum < step
                      ? 'w-2 bg-[#FF4D00]/50'
                      : 'w-2 bg-neutral-800'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Main Interactive Forms */}
        <div className="w-full md:w-3/5 p-5 sm:p-8 flex flex-col justify-between bg-neutral-900 overflow-y-auto">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full border border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all cursor-pointer z-30 bg-neutral-900/80 backdrop-blur-md"
            id="modal-close"
          >
            <X className="w-4 h-4" />
          </button>

          {!showFinishedCard ? (
            <div>
              {/* Form step headers */}
              <div className="mb-5 sm:mb-6 pr-8 sm:pr-0">
                <span className="text-[10px] sm:text-xs uppercase tracking-widest font-bold text-neutral-500">
                  Step {step} of 3
                </span>
                <h2 className="text-xl sm:text-2xl font-black font-sans uppercase tracking-tight text-white mt-1">
                  {step === 1 && 'Select Membership Plan'}
                  {step === 2 && 'Tailor Your Performance'}
                  {step === 3 && 'Secure Your Membership Pass'}
                </h2>
                <p className="text-xs sm:text-sm text-neutral-400 mt-1 leading-relaxed">
                  {step === 1 && 'Choose the subscription plan that aligns with your fitness goals.'}
                  {step === 2 && 'Customize your goal and experience level to personalize your program.'}
                  {step === 3 && 'Input your details to generate your official digital member pass.'}
                </p>
              </div>

              {/* STEP 1: PLAN SELECTOR */}
              {step === 1 && (
                <div className="space-y-3" id="step-1-plans">
                  {MEMBERSHIP_PLANS.map((p) => {
                    const isSelected = formData.planId === p.id;
                    return (
                      <button
                        key={p.id}
                        onClick={() => setFormData({ ...formData, planId: p.id })}
                        className={`w-full text-left p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border transition-all duration-300 relative overflow-hidden group cursor-pointer ${
                          isSelected
                            ? 'border-[#FF4D00] bg-[#FF4D00]/10'
                            : 'border-neutral-800 bg-neutral-950 hover:border-neutral-700'
                        }`}
                        id={`plan-choice-${p.id}`}
                      >
                        <div className="flex flex-row items-center justify-between gap-3">
                          <div className="flex items-start sm:items-center gap-3">
                            <div
                              className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 sm:mt-0 transition-colors ${
                                isSelected ? 'border-[#FF4D00] bg-[#FF4D00]' : 'border-neutral-700'
                              }`}
                            >
                              {isSelected && <Check className="w-3 h-3 text-black font-bold" />}
                            </div>
                            <div>
                              <div className="text-sm sm:text-base font-bold text-white group-hover:text-[#FF4D00] transition-colors">
                                {p.name}
                              </div>
                              <div className="text-[11px] sm:text-xs text-neutral-400 mt-0.5 line-clamp-1">
                                {p.description}
                              </div>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="text-base sm:text-lg font-black text-white font-mono">{p.price}</div>
                            <div className="text-[9px] text-neutral-500 uppercase font-bold">/{p.period}</div>
                          </div>
                        </div>

                        {p.isPopular && (
                          <div className="absolute right-0 top-0 bg-[#FF4D00] text-[8px] sm:text-[9px] font-black uppercase text-black px-2.5 py-0.5 rounded-bl-lg tracking-widest">
                            {p.badge}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* STEP 2: GOALS & EXPERIENCE */}
              {step === 2 && (
                <div className="space-y-4 sm:space-y-5" id="step-2-goals">
                  <div>
                    <label className="text-xs uppercase tracking-wider font-bold text-neutral-400 block mb-2">
                      Primary Fitness Intention
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {goals.map((g) => {
                        const isSelected = formData.goal === g.name;
                        const IconComponent = g.icon;
                        return (
                          <button
                            key={g.name}
                            onClick={() => setFormData({ ...formData, goal: g.name })}
                            className={`p-3 rounded-xl border text-left transition-all duration-300 cursor-pointer flex items-center gap-3 ${
                              isSelected
                                ? 'border-[#FF4D00] bg-[#FF4D00]/10 text-white'
                                : 'border-neutral-800 bg-neutral-950 hover:border-neutral-700 text-neutral-400'
                            }`}
                            id={`goal-choice-${g.name.replace(/\s+/g, '-').toLowerCase()}`}
                          >
                            <IconComponent className={`w-5 h-5 shrink-0 ${isSelected ? 'text-[#FF4D00]' : 'text-neutral-500'}`} />
                            <div>
                              <div className="text-xs font-bold text-white uppercase tracking-wider">{g.name}</div>
                              <div className="text-[10px] text-neutral-500 line-clamp-1">{g.desc}</div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-wider font-bold text-neutral-400 block mb-2">
                      Lifting Experience Level
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {expLevels.map((lvl) => {
                        const isSelected = formData.experienceLevel === lvl.id;
                        return (
                          <button
                            key={lvl.id}
                            onClick={() => setFormData({ ...formData, experienceLevel: lvl.id })}
                            className={`p-2.5 sm:p-3 rounded-xl border text-center transition-all duration-300 cursor-pointer ${
                              isSelected
                                ? 'border-[#FF4D00] bg-[#FF4D00]/10 text-white'
                                : 'border-neutral-800 bg-neutral-950 hover:border-neutral-700 text-neutral-400'
                            }`}
                            id={`exp-choice-${lvl.id}`}
                          >
                            <div className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-white">{lvl.label}</div>
                            <div className="text-[9px] text-neutral-500 mt-0.5 line-clamp-1">{lvl.desc}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: DETAILS FORM */}
              {step === 3 && (
                <div className="space-y-3.5" id="step-3-form">
                  <div className="relative">
                    <label className="text-xs uppercase tracking-wider font-bold text-neutral-400 block mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Anand Kulkarni"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl py-2.5 sm:py-3 px-9 text-xs sm:text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#FF4D00] transition-colors"
                        id="form-input-name"
                      />
                      <User className="absolute left-3 top-3 w-4 h-4 text-neutral-500" />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="text-xs uppercase tracking-wider font-bold text-neutral-400 block mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="anand@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl py-2.5 sm:py-3 px-9 text-xs sm:text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#FF4D00] transition-colors"
                        id="form-input-email"
                      />
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-neutral-500" />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="text-xs uppercase tracking-wider font-bold text-neutral-400 block mb-1">
                      Phone Number
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        placeholder="098765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl py-2.5 sm:py-3 px-9 text-xs sm:text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#FF4D00] transition-colors"
                        id="form-input-phone"
                      />
                      <Phone className="absolute left-3 top-3 w-4 h-4 text-neutral-500" />
                    </div>
                  </div>

                  <div className="p-2.5 bg-neutral-950/60 rounded-xl border border-neutral-800 flex items-start gap-2 text-[11px] text-neutral-400">
                    <CheckCircle className="w-4 h-4 text-[#FF4D00] shrink-0 mt-0.5" />
                    <span>
                      Instant generation of your digital pass with zero enrollment fees.
                    </span>
                  </div>

                  {errorMsg && (
                    <div className="text-xs text-red-400 font-bold bg-red-950/30 border border-red-900/50 p-2.5 rounded-lg" id="form-error">
                      ⚠️ {errorMsg}
                    </div>
                  )}
                </div>
              )}

              {/* Navigation controls */}
              <div className="flex items-center justify-between mt-6 pt-5 border-t border-neutral-800">
                {step > 1 ? (
                  <button
                    onClick={handleBackStep}
                    className="px-4 py-2.5 rounded-xl border border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-800 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    id="modal-btn-back"
                  >
                    Back
                  </button>
                ) : (
                  <div />
                )}

                <button
                  onClick={handleNextStep}
                  className="px-5 py-2.5 sm:py-3 rounded-xl bg-[#FF4D00] text-black text-xs font-extrabold uppercase tracking-wider hover:bg-[#FF4D00]/90 transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(255,77,0,0.3)]"
                  id="modal-btn-next"
                >
                  {step === 3 ? 'Generate Access Pass' : 'Next Step'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : isGenerating ? (
            <div className="flex flex-col items-center justify-center py-12 text-center" id="modal-generating">
              <div className="relative w-14 h-14 mb-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
                  className="absolute inset-0 rounded-full border-t-2 border-r-2 border-[#FF4D00] border-l-2 border-b-2 border-transparent"
                />
                <Flame className="w-7 h-7 text-[#FF4D00] absolute inset-0 m-auto animate-pulse" />
              </div>
              <h3 className="text-lg font-bold text-white uppercase tracking-wider">Generating Pass...</h3>
              <p className="text-xs text-neutral-500 max-w-xs mt-1">
                Allocating system-authorized barcode IDs and dynamic member pass.
              </p>
            </div>
          ) : (
            /* DYNAMIC ACCESS PASS RESULT CARD */
            <div className="text-center py-2" id="modal-success-screen">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-950/50 border border-emerald-500/30 text-emerald-400 mb-3">
                <Check className="w-5 h-5" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white font-sans">
                You Are Ignited!
              </h3>
              <p className="text-xs text-neutral-400 mt-1 max-w-md mx-auto leading-relaxed">
                Your digital membership pass is ready. Show this pass at the front desk at SP Laxmi Heights, Dharwad.
              </p>

              {/* Beautiful interactive member pass card */}
              <motion.div
                initial={{ rotateY: -15, scale: 0.95 }}
                animate={{ rotateY: 0, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative mt-5 max-w-xs sm:max-w-sm mx-auto p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 border border-[#FF4D00]/30 text-left overflow-hidden shadow-[0_0_30px_rgba(255,77,0,0.15)] group"
                id="virtual-access-pass"
              >
                {/* Glowing subtle light elements inside card */}
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${selectedPlan.accentColor} opacity-20 rounded-full blur-2xl`} />

                {/* Header of pass */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-[8px] uppercase tracking-widest font-black text-neutral-500">IGNITE FITNESS PASS</span>
                    <h4 className="text-base font-black tracking-tight text-white uppercase font-sans">IGNITE DHARWAD</h4>
                  </div>
                  <div className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest bg-gradient-to-r ${selectedPlan.accentColor} text-white`}>
                    {selectedPlan.name}
                  </div>
                </div>

                {/* Member detail grid */}
                <div className="grid grid-cols-2 gap-y-3 gap-x-2 mb-4">
                  <div>
                    <span className="text-[8px] uppercase tracking-wider text-neutral-500 block">CARDHOLDER</span>
                    <span className="text-xs font-bold text-white tracking-wide block truncate">{formData.fullName}</span>
                  </div>
                  <div>
                    <span className="text-[8px] uppercase tracking-wider text-neutral-500 block">MEMBER ID</span>
                    <span className="text-xs font-mono font-bold text-[#FF4D00] tracking-wider block">{generatedPassId}</span>
                  </div>
                  <div>
                    <span className="text-[8px] uppercase tracking-wider text-neutral-500 block">GOAL</span>
                    <span className="text-[11px] font-medium text-neutral-300 block truncate">{formData.goal}</span>
                  </div>
                  <div>
                    <span className="text-[8px] uppercase tracking-wider text-neutral-500 block">LOCATION</span>
                    <span className="text-[11px] font-medium text-neutral-300 block">Dharwad PB Rd</span>
                  </div>
                </div>

                {/* Barcode representation */}
                <div className="border-t border-neutral-800 pt-3 flex items-center justify-between gap-2">
                  <div className="flex flex-col gap-1 shrink-0">
                    <span className="text-[8px] uppercase tracking-widest text-neutral-500 font-bold">ENTRY BARCODE</span>
                    {/* Simulated barcode graphic */}
                    <div className="flex gap-[1px] items-stretch h-6 w-32 bg-neutral-900 px-1 rounded">
                      {[1,2,1,3,1,2,1,2,3,1,2,1,3,1,2].map((width, idx) => (
                        <div
                          key={idx}
                          className="bg-neutral-300"
                          style={{ width: `${width}px` }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* QR Code */}
                  <div className="w-10 h-10 bg-white rounded flex items-center justify-center p-1 shadow">
                    <QrCode className="w-8 h-8 text-neutral-950" />
                  </div>
                </div>
              </motion.div>

              {/* Member Card Actions */}
              <div className="flex gap-4 items-center justify-center mt-5">
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-neutral-800 text-neutral-200 hover:text-white hover:bg-neutral-700 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  id="modal-success-done"
                >
                  Close Pass
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
