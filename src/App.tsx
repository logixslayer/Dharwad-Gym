import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import Features from './components/Features';
import FitnessCalculator from './components/FitnessCalculator';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import OnboardingModal from './components/OnboardingModal';
import { OnboardingData } from './types';

export default function App() {
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [registeredData, setRegisteredData] = useState<OnboardingData | null>(null);
  const [preselectedPlanId, setPreselectedPlanId] = useState<string | null>(null);

  // Load persistent member pass from localStorage on mount
  useEffect(() => {
    try {
      const savedPass = localStorage.getItem('ignite_member_pass');
      if (savedPass) {
        setRegisteredData(JSON.parse(savedPass));
      }
    } catch (e) {
      console.error('Error loading member pass:', e);
    }
  }, []);

  const handleJoinClick = () => {
    setPreselectedPlanId('ignite'); // default
    setIsOnboardingOpen(true);
  };

  const handlePlanSelect = (planId: string) => {
    setPreselectedPlanId(planId);
    setIsOnboardingOpen(true);
  };

  const handleOnboardingSuccess = (data: OnboardingData) => {
    setRegisteredData(data);
    try {
      localStorage.setItem('ignite_member_pass', JSON.stringify(data));
    } catch (e) {
      console.error('Error saving member pass:', e);
    }
  };

  const handleOpenPass = () => {
    setIsOnboardingOpen(true);
  };

  return (
    <div className="bg-neutral-950 min-h-screen text-white font-sans overflow-x-hidden selection:bg-orange-500 selection:text-black">
      {/* Dynamic Grid Background */}
      <div className="fixed inset-0 bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:16px_16px] opacity-25 pointer-events-none z-0" />

      {/* Navigation */}
      <Navbar
        onJoinClick={handleJoinClick}
        isRegistered={!!registeredData}
        onOpenPass={handleOpenPass}
      />

      {/* Sections */}
      <main className="relative z-10">
        {/* Hero Section */}
        <Hero
          onJoinClick={handleJoinClick}
          isRegistered={!!registeredData}
          onOpenPass={handleOpenPass}
        />

        {/* About Us & Key Trainers Section */}
        <AboutUs />

        {/* Features / Bento Programs */}
        <Features onJoinClick={handleJoinClick} />

        {/* Fitness Metrics & Macro Telemetry */}
        <FitnessCalculator />

        {/* Pricing & Memberships */}
        <Pricing onPlanSelect={handlePlanSelect} />

        {/* Transformation Testimonials */}
        <Testimonials />
      </main>

      {/* Footer & Contacts */}
      <Footer />

      {/* Interactive Onboarding Wizard & Access Pass Generator */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onSuccess={handleOnboardingSuccess}
        registeredData={registeredData}
        preselectedPlanId={preselectedPlanId}
      />
    </div>
  );
}
