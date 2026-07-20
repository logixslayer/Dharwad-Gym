import { MembershipPlan, ClassItem, TrainingProgram, Testimonial, Trainer } from './types';

export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: 'spark',
    name: 'Spark',
    price: '$29',
    period: 'mo',
    description: 'Perfect for beginners looking to kickstart their physical momentum.',
    features: [
      'Access to standard gym floor',
      'Locker room & shower access',
      '1 complimentary trainer assessment',
      'Ignite mobile app tracking',
      'Free high-speed WiFi'
    ],
    accentColor: 'from-orange-500 to-amber-500'
  },
  {
    id: 'ignite',
    name: 'Ignite Elite',
    price: '$59',
    period: 'mo',
    description: 'Our most popular plan. Unlocks high-intensity programs and elite equipment.',
    features: [
      '24/7 unlimited facility access',
      'All standard Spark tier benefits',
      'Unlimited group fitness & HIIT classes',
      'Access to premium recovery zone (sauna/steam)',
      '2 guest passes per month',
      '1-on-1 monthly goal strategy session'
    ],
    badge: 'Best Value',
    isPopular: true,
    accentColor: 'from-red-600 to-orange-500'
  },
  {
    id: 'supernova',
    name: 'Supernova',
    price: '$129',
    period: 'mo',
    description: 'The ultimate fitness sanctuary. Dedicated coaching, recovery, and nutrition.',
    features: [
      'All Ignite Elite tier benefits',
      'Unlimited premium combat & yoga studio entry',
      'Personal coach with weekly 1-on-1 training',
      'Customized meal plans & dynamic macros tracker',
      'Unlimited infrared sauna & compression therapy',
      'Complimentary protein shake daily at the Fuel Bar',
      'Dedicated private workspace & VIP locker room'
    ],
    accentColor: 'from-yellow-400 via-orange-500 to-red-600'
  }
];

export const TRAINING_PROGRAMS: TrainingProgram[] = [
  {
    id: 'strength',
    title: 'Iron Velocity',
    subtitle: 'STRENGTH & POWER',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop',
    iconName: 'Dumbbell',
    description: 'Scrap the ordinary. Heavy compounds, powerlifting protocols, and progressive overloading designed to shatter plateaus.',
    tag: 'Elite Power'
  },
  {
    id: 'hiit',
    title: 'Metabolic Ignite',
    subtitle: 'CARDIO & ATHLETICS',
    image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=800&auto=format&fit=crop',
    iconName: 'Zap',
    description: 'High-intensity interval protocols combined with active tracking to burn maximal calories during and 24 hours after workout.',
    tag: 'Ultra Burn'
  },
  {
    id: 'combat',
    title: 'Apex Strike',
    subtitle: 'COMBAT & AGILITY',
    image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=800&auto=format&fit=crop',
    iconName: 'Flame',
    description: 'Immersive boxing and kickboxing instruction focusing on heavy bags, defensive agility, core power, and real endurance.',
    tag: 'Combat Fit'
  },
  {
    id: 'recovery',
    title: 'Zen Kinetic',
    subtitle: 'MOBILITY & RECOVERY',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop',
    iconName: 'Wind',
    description: 'Reset your nervous system. Deep active recovery, slow-flow yoga, and dynamic flexibility designed to prevent injury.',
    tag: 'Restorative'
  }
];

export const CLASS_SCHEDULE: ClassItem[] = [
  // Monday
  { id: 'm1', name: 'Barbell Mastery', category: 'Strength', trainer: 'Marcus Vance', time: '06:00 AM', duration: '60 min', capacity: 15, reservedSpots: 12, day: 'Mon' },
  { id: 'm2', name: 'Metabolic Shred', category: 'HIIT', trainer: 'Sarah Jenkins', time: '08:30 AM', duration: '45 min', capacity: 20, reservedSpots: 19, day: 'Mon' },
  { id: 'm3', name: 'Boxing Conditioning', category: 'Combat', trainer: 'Coach Jax', time: '05:30 PM', duration: '60 min', capacity: 12, reservedSpots: 8, day: 'Mon' },
  { id: 'm4', name: 'Deep Yin Yoga', category: 'Recovery', trainer: 'Elena Rostova', time: '07:00 PM', duration: '75 min', capacity: 25, reservedSpots: 14, day: 'Mon' },

  // Tuesday
  { id: 't1', name: 'Kettlebell Flow', category: 'Strength', trainer: 'Marcus Vance', time: '07:00 AM', duration: '50 min', capacity: 16, reservedSpots: 11, day: 'Tue' },
  { id: 't2', name: 'Sprint Intervals', category: 'HIIT', trainer: 'Sarah Jenkins', time: '09:00 AM', duration: '45 min', capacity: 20, reservedSpots: 15, day: 'Tue' },
  { id: 't3', name: 'Kickboxing Apex', category: 'Combat', trainer: 'Coach Jax', time: '06:00 PM', duration: '60 min', capacity: 12, reservedSpots: 12, day: 'Tue' },

  // Wednesday
  { id: 'w1', name: 'Olympic Weightlifting', category: 'Strength', trainer: 'Marcus Vance', time: '06:00 AM', duration: '75 min', capacity: 10, reservedSpots: 9, day: 'Wed' },
  { id: 'w2', name: 'Tabata Burnout', category: 'HIIT', trainer: 'Sarah Jenkins', time: '12:00 PM', duration: '30 min', capacity: 25, reservedSpots: 21, day: 'Wed' },
  { id: 'w3', name: 'Asana Core Flow', category: 'Recovery', trainer: 'Elena Rostova', time: '05:30 PM', duration: '60 min', capacity: 20, reservedSpots: 18, day: 'Wed' },

  // Thursday
  { id: 'th1', name: 'Hypertrophy Session', category: 'Strength', trainer: 'Marcus Vance', time: '08:00 AM', duration: '60 min', capacity: 18, reservedSpots: 13, day: 'Thu' },
  { id: 'th2', name: 'Full-Body Ignite', category: 'HIIT', trainer: 'Sarah Jenkins', time: '05:30 PM', duration: '50 min', capacity: 20, reservedSpots: 20, day: 'Thu' },
  { id: 'th3', name: 'Combat Sparring Drill', category: 'Combat', trainer: 'Coach Jax', time: '07:00 PM', duration: '60 min', capacity: 12, reservedSpots: 7, day: 'Thu' },

  // Friday
  { id: 'f1', name: 'PR Bench & Deadlift', category: 'Strength', trainer: 'Marcus Vance', time: '06:00 AM', duration: '90 min', capacity: 12, reservedSpots: 11, day: 'Fri' },
  { id: 'f2', name: 'Athletic Conditioning', category: 'HIIT', trainer: 'Sarah Jenkins', time: '08:30 AM', duration: '45 min', capacity: 22, reservedSpots: 16, day: 'Fri' },
  { id: 'f3', name: 'Myofascial Release', category: 'Recovery', trainer: 'Elena Rostova', time: '06:00 PM', duration: '60 min', capacity: 30, reservedSpots: 22, day: 'Fri' },

  // Saturday & Sunday
  { id: 'sa1', name: 'Weekend Warrior Blast', category: 'HIIT', trainer: 'All Coaches', time: '09:00 AM', duration: '75 min', capacity: 35, reservedSpots: 32, day: 'Sat' },
  { id: 'sa2', name: 'Muay Thai Fundamentals', category: 'Combat', trainer: 'Coach Jax', time: '11:00 AM', duration: '60 min', capacity: 15, reservedSpots: 15, day: 'Sat' },
  { id: 'su1', name: 'Mobility Recovery Flow', category: 'Recovery', trainer: 'Elena Rostova', time: '10:00 AM', duration: '60 min', capacity: 25, reservedSpots: 12, day: 'Sun' }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'David Goggins',
    role: 'Competitive Lifter & Marathoner',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    quote: 'Ignite completely re-engineered my training mentality. The moody, high-intensity aesthetic and the bulletproof elite equipment pushed me to add 80lbs to my deadlift in six months.',
    rating: 5,
    achievement: 'Gained 15 lbs muscle mass'
  },
  {
    id: '2',
    name: 'Samantha Ray',
    role: 'Corporate Athlete',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    quote: 'The Metabolic Ignite classes are phenomenal. I work a high-stress tech role, but coming in to train in this beautiful minimalist space with premium lighting completely melts the stress away.',
    rating: 5,
    achievement: 'Reduced body fat by 11%'
  },
  {
    id: '3',
    name: 'Keanu Reeves',
    role: 'Combat Enthusiast',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    quote: 'Apex Strike is as authentic as it gets. Expert sparring, proper instruction, and an absolute premium community that holds you accountable. Ignite represents absolute focus.',
    rating: 5,
    achievement: 'Mastered Muay Thai fundamentals'
  }
];

export const TRAINERS: Trainer[] = [
  {
    id: 'thomas',
    name: 'Thomas Millar',
    role: 'Exercise Trainer',
    image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=400&auto=format&fit=crop',
    bio: 'Thomas excels in progressive overloading and advanced barbell structures. He is dedicated to helping members shatter static plateaus.',
    expertise: ['Strength Prep', 'Barbell Mastery', 'Kettlebell Flow'],
    socials: {
      facebook: 'https://facebook.com',
      twitter: 'https://twitter.com',
      instagram: 'https://instagram.com'
    }
  },
  {
    id: 'evelyn',
    name: 'Evelyn',
    role: 'Gym Trainer',
    image: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=400&auto=format&fit=crop',
    bio: 'Evelyn combines real-time biometric telemetry with elite interval routines to optimize fat loss, respiratory threshold, and stamina.',
    expertise: ['HIIT Intervals', 'Metabolic Shred', 'Mobility Prep'],
    socials: {
      facebook: 'https://facebook.com',
      twitter: 'https://twitter.com',
      instagram: 'https://instagram.com'
    }
  },
  {
    id: 'mark',
    name: 'Mark',
    role: 'Gym Trainer',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    bio: 'Mark is an elite bodybuilding coach focusing on target muscle recruitments, raw hyper-trophy loading, and aggressive contest preparation.',
    expertise: ['Hypertrophy Mastery', 'Athletic Conditioning', 'Body Recomposition'],
    socials: {
      facebook: 'https://facebook.com',
      twitter: 'https://twitter.com',
      instagram: 'https://instagram.com'
    },
    specialBadge: true
  },
  {
    id: 'eliana',
    name: 'Eliana',
    role: 'Exercise Trainer',
    image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=400&auto=format&fit=crop',
    bio: 'Eliana brings a background in martial arts to deliver lightning-fast combat endurance drills, heavy bag conditioning, and core stability.',
    expertise: ['Combat Agility', 'Kickboxing Apex', 'Core Power'],
    socials: {
      facebook: 'https://facebook.com',
      twitter: 'https://twitter.com',
      instagram: 'https://instagram.com'
    }
  }
];

