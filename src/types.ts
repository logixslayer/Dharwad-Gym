export interface MembershipPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  badge?: string;
  isPopular?: boolean;
  accentColor: string;
}

export interface ClassItem {
  id: string;
  name: string;
  category: string;
  trainer: string;
  time: string;
  duration: string;
  capacity: number;
  reservedSpots: number;
  day: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
}

export interface TrainingProgram {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  iconName: string;
  description: string;
  tag: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  image: string;
  quote: string;
  rating: number;
  achievement: string;
}

export interface OnboardingData {
  planId: string;
  fullName: string;
  email: string;
  phone: string;
  goal: string;
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
}

export interface Trainer {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  expertise: string[];
  socials: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
  };
  specialBadge?: boolean;
}

