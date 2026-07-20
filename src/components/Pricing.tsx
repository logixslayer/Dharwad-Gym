import { motion } from 'motion/react';
import { Check, Flame, Sparkles } from 'lucide-react';
import { MEMBERSHIP_PLANS } from '../data';
import { MembershipPlan } from '../types';

interface PricingProps {
  onPlanSelect: (planId: string) => void;
}

export default function Pricing({ onPlanSelect }: PricingProps) {
  return (
    <section id="pricing" className="py-24 bg-neutral-900 border-t border-neutral-950 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/20 via-neutral-900 to-neutral-950/20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D00]" />
              <span className="text-xs uppercase tracking-[0.3em] font-extrabold text-[#FF4D00]">Premium Packages</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-sans uppercase tracking-tight text-white">
              Invest In Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4D00] to-red-650">Physical Capital</span>
            </h2>
          </div>
          <p className="max-w-md text-neutral-400 text-sm sm:text-base tracking-wide leading-relaxed">
            Choose your level of commitment. Transparent monthly plans with zero enrollment fees and instant onboarding card activation.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch" id="pricing-plans-grid">
          {MEMBERSHIP_PLANS.map((plan) => {
            const isPopular = plan.isPopular;
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`rounded-none p-8 border relative flex flex-col justify-between overflow-hidden transition-all duration-500 hover:scale-[1.01] ${
                  isPopular
                    ? 'border-[#FF4D00] bg-neutral-950 shadow-md ring-1 ring-[#FF4D00]/25'
                    : 'border-neutral-850 bg-neutral-950/50 hover:border-neutral-700 hover:bg-neutral-950'
                }`}
                id={`pricing-card-${plan.id}`}
              >
                {/* Visual Glow overlay for popular card */}
                {isPopular && (
                  <div className="absolute top-0 right-0 w-36 h-36 bg-[#FF4D00]/5 rounded-full blur-3xl pointer-events-none" />
                )}

                <div>
                  {/* Card Header */}
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-xl font-black uppercase text-white tracking-wide font-sans">
                        {plan.name}
                      </h3>
                      <p className="text-xs text-neutral-500 mt-1 max-w-[200px]">
                        {plan.description}
                      </p>
                    </div>

                    {isPopular && (
                      <div className="inline-flex items-center gap-1 px-3 py-1 rounded-none bg-[#FF4D00] text-black text-[9px] font-black uppercase tracking-wider shadow-md">
                        <Sparkles className="w-3 h-3 text-black animate-pulse" />
                        {plan.badge}
                      </div>
                    )}
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-4xl sm:text-5xl font-black font-sans text-white">{plan.price}</span>
                    <span className="text-xs uppercase text-neutral-500 font-extrabold">/{plan.period}</span>
                  </div>

                  {/* Features List */}
                  <div className="space-y-4 mb-8" id={`pricing-features-${plan.id}`}>
                    <span className="text-[10px] uppercase font-black tracking-widest text-neutral-500 block">
                      Tier Inclusions:
                    </span>
                    <ul className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex gap-2.5 items-start text-xs text-neutral-350 leading-relaxed">
                          <div className="w-4.5 h-4.5 rounded-none bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-[#FF4D00]" />
                          </div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card CTA button */}
                <button
                  onClick={() => onPlanSelect(plan.id)}
                  className={`w-full py-4 rounded-none text-xs font-black uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer skew-x-[-10deg] ${
                    isPopular
                      ? 'bg-[#FF4D00] text-black hover:scale-[1.01] hover:shadow-[0_0_20px_rgba(255,77,0,0.3)]'
                      : 'bg-transparent border border-white/20 text-white hover:bg-white hover:text-black'
                  }`}
                  id={`pricing-select-${plan.id}`}
                >
                  <span className="inline-block skew-x-[10deg] flex items-center gap-2">
                    <Flame className={`w-4 h-4 ${isPopular ? 'text-black' : 'text-[#FF4D00] animate-pulse'}`} />
                    Select {plan.name}
                  </span>
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Guarantee Info Footnote */}
        <div className="mt-16 text-center max-w-lg mx-auto p-4 rounded-none bg-neutral-950/30 border border-neutral-850/50 text-[10px] text-neutral-500">
          🛡️ <strong>100% Ironclad Guarantee</strong>: If you do not burn, sweat, or find total mental flow within 14 days, you can request an instant full refund on your Spark or Ignite tiers. No questions asked.
        </div>
      </div>
    </section>
  );
}
