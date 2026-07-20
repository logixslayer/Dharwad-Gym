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
    planId: 'ignite',
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
          planId: preselectedPlanId || 'ignite',
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark overlay with background blur */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-neutral-950/90 backdrop-blur-md"
        id="modal-overlay"
      />

      {/* Main Modal container */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col md:flex-row min-h-[580px]"
        id="modal-container"
      >
        {/* Left Side: Motivational Sidebar */}
        <div className="w-full md:w-2/5 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 p-8 flex flex-col justify-between border-r border-neutral-800/50">
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
                  { stepNum: 1, label: 'Select Your Plan', desc: 'Spark, Ignite Elite, or Supernova' },
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

        {/* Right Side: Main Interactive Forms */}
        <div className="w-full md:w-3/5 p-8 flex flex-col justify-between bg-neutral-900">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full border border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all cursor-pointer"
            id="modal-close"
          >
            <X className="w-4 h-4" />
          </button>

          {!showFinishedCard ? (
            <div>
              {/* Form step headers */}
              <div className="mb-6">
                <span className="text-xs uppercase tracking-widest font-bold text-neutral-500">
                  Step {step} of 3
                </span>
                <h2 className="text-2xl font-black font-sans uppercase tracking-tight text-white mt-1">
                  {step === 1 && 'Unchain Your Potential'}
                  {step === 2 && 'Tailor Your Performance'}
                  {step === 3 && 'Secure Your Ignite Membership'}
                </h2>
                <p className="text-sm text-neutral-400 mt-1">
                  {step === 1 && 'Select the subscription plan that aligns with your frequency and expectations.'}
                  {step === 2 && 'We tailor our initial trainer session and routines around your background and target metrics.'}
                  {step === 3 && 'Input your authentic contact details to construct your digital barcode member pass.'}
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
                        className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 relative overflow-hidden group cursor-pointer ${
                          isSelected
                            ? 'border-orange-500 bg-orange-950/10'
                            : 'border-neutral-800 bg-neutral-900 hover:border-neutral-700'
                        }`}
                        id={`plan-choice-${p.id}`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                                isSelected ? 'border-orange-500 bg-orange-500' : 'border-neutral-700'
                              }`}
                            >
                              {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                            </div>
                            <div>
                              <div className="text-base font-bold text-white group-hover:text-orange-400 transition-colors">
                                {p.name}
                              </div>
                              <div className="text-xs text-neutral-400 mt-0.5 max-w-[280px] sm:max-w-[340px] truncate">
                                {p.description}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-black text-white">{p.price}</div>
                            <div className="text-[10px] text-neutral-500 uppercase font-bold">/{p.period}</div>
                          </div>
                        </div>

                        {p.isPopular && (
                          <div className="absolute right-0 top-0 bg-gradient-to-l from-orange-500 to-red-600 text-[9px] font-black uppercase text-white px-3 py-0.5 rounded-bl-lg tracking-widest">
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
                <div className="space-y-5" id="step-2-goals">
                  <div>
                    <label className="text-xs uppercase tracking-wider font-bold text-neutral-500 block mb-2">
                      Primary Fitness Intention
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {goals.map((g) => {
                        const isSelected = formData.goal === g.name;
                        const IconComponent = g.icon;
                        return (
                          <button
                            key={g.name}
                            onClick={() => setFormData({ ...formData, goal: g.name })}
                            className={`p-3.5 rounded-xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between h-24 ${
                              isSelected
                                ? 'border-orange-500 bg-orange-950/10 text-white'
                                : 'border-neutral-800 bg-neutral-900 hover:border-neutral-700 text-neutral-400'
                            }`}
                            id={`goal-choice-${g.name.replace(/\s+/g, '-').toLowerCase()}`}
                          >
                            <IconComponent className={`w-5 h-5 ${isSelected ? 'text-orange-500' : 'text-neutral-500'}`} />
                            <div>
                              <div className="text-xs font-bold text-white uppercase tracking-wider">{g.name}</div>
                              <div className="text-[9px] text-neutral-500 mt-0.5 line-clamp-1">{g.desc}</div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-wider font-bold text-neutral-500 block mb-2">
                      Lifting Experience Level
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {expLevels.map((lvl) => {
                        const isSelected = formData.experienceLevel === lvl.id;
                        return (
                          <button
                            key={lvl.id}
                            onClick={() => setFormData({ ...formData, experienceLevel: lvl.id })}
                            className={`p-3 rounded-xl border text-center transition-all duration-300 cursor-pointer ${
                              isSelected
                                ? 'border-orange-500 bg-orange-950/10 text-white'
                                : 'border-neutral-800 bg-neutral-900 hover:border-neutral-700 text-neutral-400'
                            }`}
                            id={`exp-choice-${lvl.id}`}
                          >
                            <div className="text-xs font-black uppercase tracking-wider text-white">{lvl.label}</div>
                            <div className="text-[9px] text-neutral-500 mt-0.5">{lvl.desc}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: DETAILS FORM */}
              {step === 3 && (
                <div className="space-y-4" id="step-3-form">
                  <div className="relative">
                    <label className="text-xs uppercase tracking-wider font-bold text-neutral-500 block mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl py-3 px-10 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-orange-500 transition-colors"
                        id="form-input-name"
                      />
                      <User className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-neutral-600" />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="text-xs uppercase tracking-wider font-bold text-neutral-500 block mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl py-3 px-10 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-orange-500 transition-colors"
                        id="form-input-email"
                      />
                      <Mail className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-neutral-600" />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="text-xs uppercase tracking-wider font-bold text-neutral-500 block mb-1">
                      Phone Number
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl py-3 px-10 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-orange-500 transition-colors"
                        id="form-input-phone"
                      />
                      <Phone className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-neutral-600" />
                    </div>
                  </div>

                  <div className="p-3 bg-neutral-950/40 rounded-xl border border-neutral-850 flex items-start gap-2 text-xs text-neutral-400">
                    <CheckCircle className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                    <span>
                      Upon clicking complete, our high-fidelity system will generate a dynamic, secure QR pass and member card with zero hidden fees.
                    </span>
                  </div>

                  {errorMsg && (
                    <div className="text-xs text-red-500 font-bold bg-red-950/20 border border-red-900/30 p-2 rounded-lg" id="form-error">
                      ⚠️ {errorMsg}
                    </div>
                  )}
                </div>
              )}

              {/* Navigation controls */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-neutral-800/50">
                {step > 1 ? (
                  <button
                    onClick={handleBackStep}
                    className="px-5 py-2.5 rounded-xl border border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-850 text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
                    id="modal-btn-back"
                  >
                    Back
                  </button>
                ) : (
                  <div />
                )}

                <button
                  onClick={handleNextStep}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white text-xs font-black uppercase tracking-widest transition-all duration-300 hover:shadow-[0_0_20px_rgba(249,115,22,0.3)] flex items-center gap-2 cursor-pointer"
                  id="modal-btn-next"
                >
                  {step === 3 ? 'Generate Access Pass' : 'Next Step'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : isGenerating ? (
            <div className="flex flex-col items-center justify-center py-20 text-center" id="modal-generating">
              <div className="relative w-16 h-16 mb-6">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
                  className="absolute inset-0 rounded-full border-t-2 border-r-2 border-orange-500 border-l-2 border-b-2 border-transparent"
                />
                <Flame className="w-8 h-8 text-orange-500 absolute inset-0 m-auto animate-pulse" />
              </div>
              <h3 className="text-xl font-bold text-white uppercase tracking-wider">Igniting Member Pass...</h3>
              <p className="text-sm text-neutral-500 max-w-xs mt-2">
                Allocating system-authorized barcode IDs and dynamic member metrics.
              </p>
            </div>
          ) : (
            /* DYNAMIC SENSATIONAL ACCESS PASS RESULT CARD */
            <div className="text-center" id="modal-success-screen">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-950/50 border border-emerald-500/30 text-emerald-400 mb-4 animate-bounce">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight text-white font-sans">
                You Are Ignited!
              </h3>
              <p className="text-xs text-neutral-400 mt-1 max-w-md mx-auto">
                Your premium digital membership has been registered. Below is your official virtual wallet access pass. Show this at our front-desk scanner or keyless turnstile.
              </p>

              {/* Beautiful interactive member pass card */}
              <motion.div
                initial={{ rotateY: -15, scale: 0.95 }}
                animate={{ rotateY: 0, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative mt-6 max-w-sm mx-auto p-6 rounded-2xl bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 border border-orange-500/30 text-left overflow-hidden shadow-[0_0_40px_rgba(249,115,22,0.15)] group"
                id="virtual-access-pass"
              >
                {/* Glowing subtle light elements inside card */}
                <div className={`absolute top-0 right-0 w-28 h-28 bg-gradient-to-br ${selectedPlan.accentColor} opacity-20 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700`} />

                {/* Header of pass */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest font-black text-neutral-500">MEMBER PASS</span>
                    <h4 className="text-lg font-black tracking-tight text-white uppercase font-sans">IGNITE CLUB</h4>
                  </div>
                  <div className={`px-2.5 py-1 rounded text-[9px] font-black uppercase tracking-widest bg-gradient-to-r ${selectedPlan.accentColor} text-white`}>
                    {selectedPlan.name}
                  </div>
                </div>

                {/* Member detail grid */}
                <div className="grid grid-cols-2 gap-y-4 gap-x-2 mb-6">
                  <div>
                    <span className="text-[8px] uppercase tracking-wider text-neutral-500 block">CARDHOLDER</span>
                    <span className="text-sm font-bold text-white tracking-wide block truncate">{formData.fullName}</span>
                  </div>
                  <div>
                    <span className="text-[8px] uppercase tracking-wider text-neutral-500 block">MEMBER ID</span>
                    <span className="text-sm font-mono font-bold text-orange-400 tracking-wider block">{generatedPassId}</span>
                  </div>
                  <div>
                    <span className="text-[8px] uppercase tracking-wider text-neutral-500 block">Gym INTENTION</span>
                    <span className="text-xs font-medium text-neutral-300 block">{formData.goal}</span>
                  </div>
                  <div>
                    <span className="text-[8px] uppercase tracking-wider text-neutral-500 block">JOINED DATE</span>
                    <span className="text-xs font-medium text-neutral-300 block">JULY 2026</span>
                  </div>
                </div>

                {/* Barcode representation */}
                <div className="border-t border-neutral-850 pt-4 flex items-center justify-between gap-4">
                  <div className="flex flex-col gap-1 shrink-0">
                    <span className="text-[8px] uppercase tracking-widest text-neutral-500 font-bold">FRONT-DESK ENTRY BARCODE</span>
                    {/* Simulated barcode graphic */}
                    <div className="flex gap-[1.5px] items-stretch h-8 w-44 bg-neutral-900 px-1 rounded">
                      {[1,3,1,2,4,1,2,1,3,1,2,1,4,1,3,1,2,1].map((width, idx) => (
                        <div
                          key={idx}
                          className={`bg-neutral-300`}
                          style={{ width: `${width}px` }}
                        />
                      ))}
                    </div>
                    <span className="text-[8px] text-center font-mono text-neutral-500 mt-0.5">{generatedPassId}</span>
                  </div>

                  {/* QR Code */}
                  <div className="w-12 h-12 bg-white rounded flex items-center justify-center p-1 cursor-pointer hover:scale-105 transition-transform shadow">
                    <QrCode className="w-10 h-10 text-neutral-950" />
                  </div>
                </div>

                {/* Sparkles / Watermark overlay */}
                <div className="absolute -bottom-6 -right-6 text-neutral-900 opacity-20 pointer-events-none group-hover:scale-110 transition-transform duration-500">
                  <Flame className="w-24 h-24" />
                </div>
              </motion.div>

              {/* Member Card Actions */}
              <div className="flex gap-4 items-center justify-center mt-6">
                <button
                  onClick={onClose}
                  className="px-6 py-3 rounded-xl bg-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-700 text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
                  id="modal-success-done"
                >
                  Enter Member Hub
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
