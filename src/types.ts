export type SportType =
  | 'Tennis'
  | 'Pickleball'
  | 'Basketball'
  | 'Running'
  | 'Beach Volleyball'
  | 'Bouldering'
  | 'Cycling'
  | 'Soccer';

export type SkillLevel = 'Beginner (2.0 - 2.5)' | 'Intermediate (3.0 - 3.5)' | 'Advanced (4.0 - 4.5)' | 'Expert (5.0+)';

export type AvailabilitySlot =
  | 'Early Morning (6:30 - 8:00 AM)'
  | 'Lunch Rally (12:00 - 1:30 PM)'
  | 'Post-Work / Sunset (5:30 - 7:30 PM)'
  | 'Late Evening Lit Courts (7:30 - 9:30 PM)'
  | 'Weekend Morning (8:00 - 11:00 AM)'
  | 'Weekend Afternoon (2:00 - 5:00 PM)';

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  role: string; // e.g. "Senior Staff AI Engineer", "CS Student @ Stanford", "Product Manager"
  companyOrSchool: string; // e.g. "Google / DeepMind", "UC Berkeley", "Stripe", "YC Founder"
  hubCity: string; // e.g. "San Francisco (SoMa / Mission)", "Seattle", "New York", "Austin"
  bio: string;
  sports: SportType[];
  skillRatings: Record<string, SkillLevel>;
  availability: AvailabilitySlot[];
  networkingGoals: string;
  isGuest?: boolean;
}

export interface SportsSession {
  id: string;
  creatorId: string;
  creatorName: string;
  creatorRole: string;
  creatorCompany: string;
  creatorPhoto?: string;
  sport: SportType;
  title: string;
  description: string;
  skillLevel: SkillLevel | 'All Levels Welcome';
  dateTime: string;
  locationName: string;
  address: string;
  city: string;
  maxParticipants: number;
  participants: Array<{
    uid: string;
    displayName: string;
    role: string;
    company: string;
  }>;
  networkingFocus: string;
  courtDetails?: string;
  status: 'Open' | 'Full' | 'Completed';
  createdAt: string;
}

export interface SessionRsvp {
  id: string;
  sessionId: string;
  userId: string;
  userName: string;
  userRole: string;
  status: 'Confirmed' | 'Waitlist';
  skillLevel: string;
  note?: string;
  createdAt: string;
}

export interface RoadmapItem {
  id: string;
  phase: 'Phase 1: Core Engine' | 'Phase 2: AI Matchmaker' | 'Phase 3: Verified Ratings' | 'Phase 4: Tech Hub Leagues' | 'Phase 5: Smart Courts IoT';
  title: string;
  description: string;
  status: 'Live in App' | 'In Progress' | 'Next Up' | 'Planned';
  category: 'Matching & Sync' | 'AI Intelligence' | 'Community & Networking' | 'Hardware & Facilities';
  targetQuarter: string;
  votes: number;
  upvotedBy: string[];
  deliverables: string[];
}

export interface AiMatchResult {
  compatibilityScore: number;
  synergyAnalysis: string;
  networkingPotential: string;
  suggestedIcebreaker: string;
  sharedPointers: string[];
}

export interface AiSessionPlan {
  sessionTitle: string;
  warmup: string;
  drills: string[];
  matchFormat: string;
  networkingWindow: string;
  conversationTopic: string;
  gearChecklist: string[];
}

export interface CourtFacility {
  id: string;
  name: string;
  city: string;
  sport: SportType;
  address: string;
  lighting: string;
  courtCount: number;
  surface: string;
  bestTimes: string;
  features: string[];
}
