import { RoadmapItem, SportsSession, UserProfile, CourtFacility } from '../types';

export const DEMO_PERSONAS: UserProfile[] = [
  {
    uid: 'persona-1',
    displayName: 'Elena Rostova',
    email: 'elena.rostova@techhub.example',
    photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    role: 'Staff AI Research Engineer',
    companyOrSchool: 'Anthropic',
    hubCity: 'San Francisco (Mission / SoMa)',
    bio: 'LLM alignment engineer. Passionate about 4.0 baseline tennis rallies and weekend beach volleyball. Always keen to chat about agent architectures between sets!',
    sports: ['Tennis', 'Beach Volleyball', 'Pickleball'],
    skillRatings: {
      Tennis: 'Advanced (4.0 - 4.5)',
      'Beach Volleyball': 'Intermediate (3.0 - 3.5)',
      Pickleball: 'Intermediate (3.0 - 3.5)'
    },
    availability: [
      'Early Morning (6:30 - 8:00 AM)',
      'Post-Work / Sunset (5:30 - 7:30 PM)',
      'Weekend Morning (8:00 - 11:00 AM)'
    ],
    networkingGoals: 'Discuss distributed training, mechanistic interpretability, and find regular high-pace rally partners.',
    isGuest: false
  },
  {
    uid: 'persona-2',
    displayName: 'Marcus Vance',
    email: 'marcus.v@berkeley.edu',
    photoURL: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    role: 'CS Master\'s Candidate',
    companyOrSchool: 'UC Berkeley',
    hubCity: 'San Francisco (East Bay / South Park)',
    bio: 'Graduate student working on GPU kernels. Fast-paced pickleball and basketball pickup games. Great way to de-stress and meet startup engineers.',
    sports: ['Pickleball', 'Basketball', 'Running'],
    skillRatings: {
      Pickleball: 'Intermediate (3.0 - 3.5)',
      Basketball: 'Intermediate (3.0 - 3.5)',
      Running: 'Advanced (4.0 - 4.5)'
    },
    availability: [
      'Lunch Rally (12:00 - 1:30 PM)',
      'Late Evening Lit Courts (7:30 - 9:30 PM)',
      'Weekend Afternoon (2:00 - 5:00 PM)'
    ],
    networkingGoals: 'Looking for internship/full-time engineering insights, seed-stage founders, and aggressive dink battles on the court.',
    isGuest: false
  },
  {
    uid: 'persona-3',
    displayName: 'Priya Sharma',
    email: 'priya.sharma@stripe.example',
    photoURL: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    role: 'Principal Product Manager',
    companyOrSchool: 'Stripe',
    hubCity: 'Seattle (South Lake Union)',
    bio: 'Product lead for developer platforms. Avid trail runner and outdoor tennis enthusiast. Love discussing product strategy over a brisk 10K or baseline set.',
    sports: ['Running', 'Tennis', 'Cycling'],
    skillRatings: {
      Running: 'Advanced (4.0 - 4.5)',
      Tennis: 'Intermediate (3.0 - 3.5)',
      Cycling: 'Intermediate (3.0 - 3.5)'
    },
    availability: [
      'Early Morning (6:30 - 8:00 AM)',
      'Post-Work / Sunset (5:30 - 7:30 PM)'
    ],
    networkingGoals: 'Connect with technical founders, infrastructure builders, and early-morning endurance athletes.',
    isGuest: false
  },
  {
    uid: 'persona-4',
    displayName: 'David Morales',
    email: 'david@seedstage.example',
    photoURL: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    role: 'Founder & CEO',
    companyOrSchool: 'YC W24 AI Startup',
    hubCity: 'San Francisco (Marina / Presidio)',
    bio: 'Building developer tools. Outdoor sports are my meditation. Tennis 3.5, enthusiastic basketball full-court runner. Always happy to brainstorm product-market fit.',
    sports: ['Tennis', 'Basketball', 'Bouldering'],
    skillRatings: {
      Tennis: 'Intermediate (3.0 - 3.5)',
      Basketball: 'Intermediate (3.0 - 3.5)',
      Bouldering: 'Intermediate (3.0 - 3.5)'
    },
    availability: [
      'Post-Work / Sunset (5:30 - 7:30 PM)',
      'Weekend Morning (8:00 - 11:00 AM)'
    ],
    networkingGoals: 'Peer founders, angel investors, and sports partners who respect punctuality and fast-paced rallies.',
    isGuest: false
  }
];

export const INITIAL_SESSIONS: SportsSession[] = [
  {
    id: 'session-sf-tennis-1',
    creatorId: 'persona-1',
    creatorName: 'Elena Rostova',
    creatorRole: 'Staff AI Engineer',
    creatorCompany: 'Anthropic',
    creatorPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    sport: 'Tennis',
    title: 'High-Tempo NTRP 4.0 Baseline Rally & AI Systems Chat',
    description: 'Looking for a solid 4.0+ hitter for 90 mins of deep cross-court drills followed by a 10-point tiebreaker. Then casual coffee around 24th St.',
    skillLevel: 'Advanced (4.0 - 4.5)',
    dateTime: 'Tomorrow • 6:30 PM - 8:00 PM',
    locationName: 'Dolores Park Tennis Courts',
    address: '19th & Dolores St, San Francisco, CA',
    city: 'San Francisco',
    maxParticipants: 2,
    participants: [
      {
        uid: 'persona-1',
        displayName: 'Elena Rostova',
        role: 'Staff AI Engineer',
        company: 'Anthropic'
      }
    ],
    networkingFocus: 'Agentic Workflows & Scaling Laws',
    courtDetails: 'Court #2 reserved under SF Rec & Parks. Lit until 10:00 PM.',
    status: 'Open',
    createdAt: new Date().toISOString()
  },
  {
    id: 'session-sf-pickle-2',
    creatorId: 'persona-2',
    creatorName: 'Marcus Vance',
    creatorRole: 'CS Student',
    creatorCompany: 'UC Berkeley',
    creatorPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    sport: 'Pickleball',
    title: 'Sunset 4v4 Doubles Scramble & Founder/Student Mix',
    description: 'Fast rotation doubles game. We have balls and extra paddles. Open to intermediate players looking for competitive kitchen dinks and startup stories.',
    skillLevel: 'Intermediate (3.0 - 3.5)',
    dateTime: 'Thursday • 6:00 PM - 7:30 PM',
    locationName: 'South Park Outdoor Courts',
    address: '64 South Park St, San Francisco, CA',
    city: 'San Francisco',
    maxParticipants: 4,
    participants: [
      {
        uid: 'persona-2',
        displayName: 'Marcus Vance',
        role: 'CS Student',
        company: 'UC Berkeley'
      },
      {
        uid: 'persona-4',
        displayName: 'David Morales',
        role: 'Founder',
        company: 'YC AI Co'
      }
    ],
    networkingFocus: 'Seed Stage Tech & Summer Internships',
    courtDetails: 'Open public courts, fast turnover, lights stay on till 9 PM.',
    status: 'Open',
    createdAt: new Date().toISOString()
  },
  {
    id: 'session-sea-run-3',
    creatorId: 'persona-3',
    creatorName: 'Priya Sharma',
    creatorRole: 'Principal PM',
    creatorCompany: 'Stripe',
    creatorPhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    sport: 'Running',
    title: 'Pre-Standup 8K Tempo Run around Lake Union',
    description: 'Consistent 8:00 min/mile pace. Meet at South Lake Union Park near MOHAI. We finish right in time for 9:00 AM sprint standups.',
    skillLevel: 'Intermediate (3.0 - 3.5)',
    dateTime: 'Wednesday • 7:00 AM - 8:00 AM',
    locationName: 'Lake Union Park MOHAI Loop',
    address: '860 Terry Ave N, Seattle, WA',
    city: 'Seattle',
    maxParticipants: 6,
    participants: [
      {
        uid: 'persona-3',
        displayName: 'Priya Sharma',
        role: 'Principal PM',
        company: 'Stripe'
      }
    ],
    networkingFocus: 'Platform Economics & Developer Tools',
    courtDetails: 'Paved waterfront loop, scenic, zero car interruptions.',
    status: 'Open',
    createdAt: new Date().toISOString()
  },
  {
    id: 'session-sf-hoops-4',
    creatorId: 'persona-4',
    creatorName: 'David Morales',
    creatorRole: 'Founder & CEO',
    creatorCompany: 'YC Startup',
    creatorPhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    sport: 'Basketball',
    title: 'Saturday Morning 3v3 Half-Court Hustle & Product Talk',
    description: 'Friendly but competitive 3v3 half-court pickup games. Great outdoor court with double rims. Bring light/dark shirts.',
    skillLevel: 'Intermediate (3.0 - 3.5)',
    dateTime: 'Saturday • 9:30 AM - 11:30 AM',
    locationName: 'Alice Marble Outdoor Park',
    address: '1201 Greenwich St, San Francisco, CA',
    city: 'San Francisco',
    maxParticipants: 6,
    participants: [
      {
        uid: 'persona-4',
        displayName: 'David Morales',
        role: 'Founder',
        company: 'YC Startup'
      }
    ],
    networkingFocus: 'Venture Capital & Hiring Top Talent',
    courtDetails: 'Stunning Bay views, breezy, high-quality asphalt surface.',
    status: 'Open',
    createdAt: new Date().toISOString()
  }
];

export const INITIAL_ROADMAP: RoadmapItem[] = [
  {
    id: 'roadmap-p1-core',
    phase: 'Phase 1: Core Engine',
    title: 'Precision Skill & Availability Match Engine',
    description: 'Instant filtering across 8 outdoor sports, hyper-local tech hub zones, and 6 discrete availability blocks (pre-standup, lunch, sunset).',
    status: 'Live in App',
    category: 'Matching & Sync',
    targetQuarter: 'Q1 2026',
    votes: 142,
    upvotedBy: ['persona-1', 'persona-2'],
    deliverables: [
      'Firebase Auth with Google & Tech Persona quick-switcher',
      'Firestore real-time session booking and instant RSVP logic',
      'Location zoning for high-density tech hubs (SF, Seattle, NYC, Austin)'
    ]
  },
  {
    id: 'roadmap-p2-gemini',
    phase: 'Phase 2: AI Matchmaker',
    title: 'Gemini AI Synergy Scoring & Practice Architect',
    description: 'Multi-factor intelligence evaluating tech background synergy, skill parity, and court availability with tailored icebreakers and drill plans.',
    status: 'Live in App',
    category: 'AI Intelligence',
    targetQuarter: 'Q1 2026',
    votes: 218,
    upvotedBy: ['persona-1', 'persona-3', 'persona-4'],
    deliverables: [
      'Gemini 3.8 Flash automated compatibility analyzer (/api/ai/match)',
      'Automated sports session generator with custom drills & gear checklists',
      'Smart conversational coordinator assistant for natural language scheduling'
    ]
  },
  {
    id: 'roadmap-p3-ratings',
    phase: 'Phase 3: Verified Ratings',
    title: 'Decentralized NTRP Skill Ratings & Peer Endorsements',
    description: 'Solve skill mismatches with post-game peer validations, verifiable match histories, and Google Calendar / Apple Health two-way synchronization.',
    status: 'In Progress',
    category: 'Matching & Sync',
    targetQuarter: 'Q2 2026',
    votes: 185,
    upvotedBy: ['persona-2'],
    deliverables: [
      'Post-match peer rating consensus system with spam protection',
      'Automatic Google Calendar busy-window sync to detect open rally slots',
      'Real-time weather radar & wind alert cancellations with 1-click rebooking'
    ]
  },
  {
    id: 'roadmap-p4-leagues',
    phase: 'Phase 4: Tech Hub Leagues',
    title: 'Tech Company Ladders & University Campus Chapters',
    description: 'Private and cross-company corporate ladders for Google, Meta, Apple, Stripe, YC cohorts, and Stanford/Berkeley student clubs.',
    status: 'Next Up',
    category: 'Community & Networking',
    targetQuarter: 'Q3 2026',
    votes: 164,
    upvotedBy: ['persona-3'],
    deliverables: [
      'Verified work email & campus domain badges (@google.com, @berkeley.edu)',
      'Company vs Company friendly ladders (e.g. Stripe vs OpenAI Pickleball Cup)',
      'Slack and Discord webhook bots for immediate court pickup alerts'
    ]
  },
  {
    id: 'roadmap-p5-courts',
    phase: 'Phase 5: Smart Courts IoT',
    title: 'Municipal Smart Court Sensors & Lighting Status',
    description: 'Direct integration with municipal court reservation systems, public court camera status for open spots, and sunset lighting schedule tracking.',
    status: 'Planned',
    category: 'Hardware & Facilities',
    targetQuarter: 'Q4 2026',
    votes: 97,
    upvotedBy: [],
    deliverables: [
      'Open-source IoT court occupancy detector integrations',
      'Automated court permit booking API for public recreation departments',
      'Community gear-swap & racket restringing directory'
    ]
  }
];

export const CURATED_COURTS: CourtFacility[] = [
  {
    id: 'court-dolores',
    name: 'Dolores Park Tennis & Pickleball Courts',
    city: 'San Francisco',
    sport: 'Tennis',
    address: '19th & Dolores St, San Francisco, CA',
    lighting: 'Lit until 10:00 PM every night',
    courtCount: 3,
    surface: 'Hard Court (Plexipave)',
    bestTimes: 'Weekday mornings (7:00 AM) or post-8:00 PM turnover',
    features: ['High wind shelter', 'Bustling park vibe', 'Proximity to Mission cafes']
  },
  {
    id: 'court-alice-marble',
    name: 'Alice Marble Courts (Russian Hill)',
    city: 'San Francisco',
    sport: 'Tennis',
    address: '1201 Greenwich St, San Francisco, CA',
    lighting: 'No lights (Sunset play only)',
    courtCount: 4,
    surface: 'Hard Court + Basketball Half-Court',
    bestTimes: 'Midday sunny rallies or Saturday 8:00 AM',
    features: ['Panoramic Alcatraz & Bay views', 'Fresh ocean breeze', 'Iconic SF aesthetic']
  },
  {
    id: 'court-goldman',
    name: 'Goldman Tennis Center (Golden Gate Park)',
    city: 'San Francisco',
    sport: 'Pickleball',
    address: 'Nancy Pelosi Dr & Bowling Green Dr, SF, CA',
    lighting: 'Fully floodlit until 10:00 PM',
    courtCount: 16,
    surface: 'Championship Hard Courts',
    bestTimes: 'Bookable online 7 days ahead; great evening crowd',
    features: ['Locker rooms', 'Pro shop with racket demo', 'Dedicated pickleball complex']
  },
  {
    id: 'court-south-park',
    name: 'South Park Tech Commons Rec Area',
    city: 'San Francisco',
    sport: 'Pickleball',
    address: 'South Park St, San Francisco, CA',
    lighting: 'Ambient park lighting',
    courtCount: 2,
    surface: 'Smooth outdoor pavement',
    bestTimes: '12:00 PM lunch rallies; Friday afternoon mix',
    features: ['Heart of SoMa tech ecosystem', 'Dozens of seed funds & coffee shops nearby']
  },
  {
    id: 'court-slu-seattle',
    name: 'South Lake Union Park Recreation Area',
    city: 'Seattle',
    sport: 'Running',
    address: '860 Terry Ave N, Seattle, WA',
    lighting: 'Well-lit waterfront pathways',
    courtCount: 1,
    surface: 'Continuous paved trail (6.2-mile loop)',
    bestTimes: '6:30 AM sunrise or 5:30 PM post-work',
    features: ['Flat water edge', 'Directly adjacent to Amazon SLU campus', 'Zero traffic crossings']
  },
  {
    id: 'court-pease-austin',
    name: 'Pease District Park Sports Courts',
    city: 'Austin',
    sport: 'Basketball',
    address: '1100 Kingsbury St, Austin, TX',
    lighting: 'Lit until 10:00 PM',
    courtCount: 2,
    surface: 'Full court regulation asphalt',
    bestTimes: 'Tues/Thurs evenings 7:00 PM',
    features: ['Tree canopy shade', 'Active tech founder pickup games', 'Spring water refill stations']
  }
];
