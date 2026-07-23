import { MembershipPlan, TrainingProgram, Testimonial, Trainer } from './types';

export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: '1-month',
    name: '1 Month',
    price: '₹2,499',
    period: 'month',
    description: 'Flexible month-to-month membership with complete access to all gym facilities.',
    features: [
      'Full access to cardio & strength equipment',
      'Locker room & shower facilities',
      '1 complimentary trainer assessment',
      'Free high-speed WiFi',
      'No long-term contract required'
    ],
    accentColor: 'from-orange-500 to-amber-500'
  },
  {
    id: '3-months',
    name: '3 Months',
    price: '₹5,999',
    period: '3 months',
    description: 'Our most popular plan. Save 20% compared to monthly pass + bonus group training.',
    features: [
      'Full access to all fitness equipment',
      'All 1 Month benefits included',
      'Access to group training & HIIT sessions',
      '1-on-1 monthly goal strategy session',
      '2 free guest passes for friends',
      'Personalized workout guidance'
    ],
    badge: 'Most Popular',
    isPopular: true,
    accentColor: 'from-red-600 to-orange-500'
  },
  {
    id: '1-year',
    name: '1 Year',
    price: '₹17,999',
    period: 'year',
    description: 'Best value for dedicated fitness lovers. Save over 40% with full member perks.',
    features: [
      'Unlimited 365-day facility access',
      'All 3 Months benefits included',
      'Customized personal nutrition plan',
      'Quarterly 1-on-1 personal training sessions',
      'Priority access to special gym events',
      'VIP locker room privileges',
      'Free Ignite Fitness gym kit'
    ],
    accentColor: 'from-yellow-400 via-orange-500 to-red-600'
  }
];

export const TRAINING_PROGRAMS: TrainingProgram[] = [
  {
    id: 'personal-training',
    title: 'Personal Training',
    subtitle: '1-ON-1 COACHING',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800&auto=format&fit=crop',
    iconName: 'Dumbbell',
    description: 'Work directly with certified trainers who create personalized workout plans tailored specifically to your body and goals.',
    tag: 'Custom Care'
  },
  {
    id: 'strength-training',
    title: 'Strength and Weight Training',
    subtitle: 'MUSCLE & POWER',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop',
    iconName: 'Zap',
    description: 'State-of-the-art cardio and heavy strength equipment, dumbbells, barbells, and machines to build real strength.',
    tag: 'Heavy Lifting'
  },
  {
    id: 'group-training',
    title: 'Group Training',
    subtitle: 'COMMUNITY & ENERGY',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop',
    iconName: 'Users',
    description: 'Fun, high-energy group workouts led by expert motivators that make exercising exciting and accountable.',
    tag: 'Team Vibe'
  },
  {
    id: 'hiit',
    title: 'HIIT (Interval Training)',
    subtitle: 'FAT BURN & STAMINA',
    image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=800&auto=format&fit=crop',
    iconName: 'Flame',
    description: 'Fast-paced, high-intensity workouts designed to maximize calorie burn and improve heart health in less time.',
    tag: 'Max Burn'
  },
  {
    id: 'nutrition-plans',
    title: 'Personalized Nutrition Plans',
    subtitle: 'DIET & RECOVERY',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800&auto=format&fit=crop',
    iconName: 'Utensils',
    description: 'Custom meal guidelines and daily macro targets calculated by experts to fuel your workouts and speed up results.',
    tag: 'Healthy Diet'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Anupama Rokhade',
    role: 'Gym Member',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
    quote: 'The atmosphere is energetic motivating people to workout.',
    rating: 5,
    achievement: 'Verified Google Review'
  },
  {
    id: '2',
    name: 'Suhani Puthane',
    role: 'Regular Member',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    quote: 'Great gym with a wide variety of equipment and friendly staff.',
    rating: 5,
    achievement: 'Verified Google Review'
  },
  {
    id: '3',
    name: 'Sujay Koneri',
    role: 'Fitness Enthusiast',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    quote: 'Definitely recommend it to anyone looking for a quality place to work out!',
    rating: 5,
    achievement: 'Verified Google Review'
  }
];

export const TRAINERS: Trainer[] = [
  {
    id: 'thomas',
    name: 'Thomas Millar',
    role: 'Strength & Conditioning Coach',
    image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=400&auto=format&fit=crop',
    bio: 'Thomas specializes in safe weightlifting techniques, posture correction, and progressive muscle building.',
    expertise: ['Weight Training', 'Strength Prep', 'Posture & Mobility'],
    socials: {
      facebook: 'https://facebook.com',
      twitter: 'https://twitter.com',
      instagram: 'https://instagram.com'
    }
  },
  {
    id: 'evelyn',
    name: 'Evelyn',
    role: 'HIIT & Group Fitness Trainer',
    image: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=400&auto=format&fit=crop',
    bio: 'Evelyn leads high-energy group workouts and HIIT sessions designed to boost stamina and burn calories efficiently.',
    expertise: ['HIIT Workouts', 'Group Fitness', 'Fat Loss'],
    socials: {
      facebook: 'https://facebook.com',
      twitter: 'https://twitter.com',
      instagram: 'https://instagram.com'
    }
  },
  {
    id: 'mark',
    name: 'Mark',
    role: 'Head Personal Trainer',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    bio: 'Mark helps members achieve total body transformation through customized 1-on-1 personal coaching and exercise plans.',
    expertise: ['1-on-1 Coaching', 'Body Transformation', 'Muscle Gain'],
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
    role: 'Nutrition & Wellness Specialist',
    image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=400&auto=format&fit=crop',
    bio: 'Eliana creates easy-to-follow meal plans and guides members on maintaining healthy eating habits to achieve their goals.',
    expertise: ['Nutrition Plans', 'Weight Management', 'Core & Mobility'],
    socials: {
      facebook: 'https://facebook.com',
      twitter: 'https://twitter.com',
      instagram: 'https://instagram.com'
    }
  }
];


