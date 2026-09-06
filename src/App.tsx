import React, { useState, useEffect } from 'react';
import { UserProfile, SportsSession, RoadmapItem } from './types';
import { DEMO_PERSONAS } from './lib/mockData';
import {
  auth,
  testFirebaseConnection,
  seedInitialFirestoreData,
  fetchUserProfile,
  saveUserProfile,
  fetchAllSessions,
  createSportsSession,
  rsvpToSession,
  fetchAllRoadmaps,
  voteRoadmap
} from './lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { Navbar } from './components/Navbar';
import { ProblemHero } from './components/ProblemHero';
import { SessionList } from './components/SessionList';
import { AiMatchmakerView } from './components/AiMatchmakerView';
import { RoadmapView } from './components/RoadmapView';
import { CourtFinder } from './components/CourtFinder';
import { ProblemArchitectureView } from './components/ProblemArchitectureView';
import { AiMatchmakerModal } from './components/AiMatchmakerModal';
import { CreateSessionModal } from './components/CreateSessionModal';
import { AuthModal } from './components/AuthModal';
import { UserProfileModal } from './components/UserProfileModal';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'sessions' | 'ai-match' | 'roadmap' | 'courts' | 'problem'>('sessions');
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(DEMO_PERSONAS[0]); // Default to first demo persona for immediate interactivity
  const [sessions, setSessions] = useState<SportsSession[]>([]);
  const [roadmaps, setRoadmaps] = useState<RoadmapItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modals
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showCreateSessionModal, setShowCreateSessionModal] = useState(false);
  const [selectedSessionForAi, setSelectedSessionForAi] = useState<SportsSession | null>(null);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Bootstrap data and auth listener
  useEffect(() => {
    async function bootstrap() {
      setIsLoading(true);
      try {
        // Test Firebase connection per skill guidelines
        await testFirebaseConnection();
        // Seed initial data if empty
        await seedInitialFirestoreData();

        // Load sessions & roadmaps
        const loadedSessions = await fetchAllSessions();
        setSessions(loadedSessions);

        const loadedRoadmaps = await fetchAllRoadmaps();
        setRoadmaps(loadedRoadmaps);
      } catch (err) {
        console.error('Bootstrap error:', err);
      } finally {
        setIsLoading(false);
      }
    }

    bootstrap();

    // Firebase Auth listener
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const profile = await fetchUserProfile(firebaseUser.uid);
        if (profile) {
          setCurrentUser(profile);
        } else {
          // Default profile from Firebase Auth user
          const newProfile: UserProfile = {
            uid: firebaseUser.uid,
            displayName: firebaseUser.displayName || 'Tech Player',
            email: firebaseUser.email || '',
            photoURL: firebaseUser.photoURL || undefined,
            role: 'Tech Professional',
            companyOrSchool: 'Tech Hub',
            hubCity: 'San Francisco (Mission / SoMa)',
            bio: 'Active outdoor sports player and tech builder.',
            sports: ['Tennis', 'Pickleball'],
            skillRatings: {
              Tennis: 'Intermediate (3.0 - 3.5)',
              Pickleball: 'Intermediate (3.0 - 3.5)'
            },
            availability: ['Early Morning (6:30 - 8:00 AM)', 'Post-Work / Sunset (5:30 - 7:30 PM)'],
            networkingGoals: 'Connect with local engineers and researchers.'
          };
          setCurrentUser(newProfile);
          saveUserProfile(newProfile);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSelectPersona = (persona: UserProfile) => {
    setCurrentUser(persona);
    saveUserProfile(persona);
    showToast(`Switched persona to ${persona.displayName} (${persona.companyOrSchool})`);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      // ignore
    }
    // Fallback to guest persona
    setCurrentUser(null);
    showToast('Signed out. You can sign in or choose a demo persona anytime.');
  };

  const handleSaveProfile = async (updated: UserProfile) => {
    setCurrentUser(updated);
    await saveUserProfile(updated);
    showToast('Sports profile & skill ratings updated successfully!');
  };

  const handleCreateSession = async (newSession: SportsSession) => {
    await createSportsSession(newSession);
    setSessions((prev) => [newSession, ...prev]);
    showToast('Session published to local tech hub courts!');
  };

  const handleJoinSession = async (session: SportsSession) => {
    if (!currentUser) {
      setShowAuthModal(true);
      return;
    }
    try {
      const updated = await rsvpToSession(session, currentUser);
      setSessions((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
      const isNowJoined = updated.participants.some((p) => p.uid === currentUser.uid);
      showToast(isNowJoined ? 'You joined the session! RSVP confirmed.' : 'You have left the session.');
    } catch (err: any) {
      showToast(err.message || 'Could not update RSVP');
    }
  };

  const handleVoteRoadmap = async (itemId: string) => {
    const userId = currentUser ? currentUser.uid : 'guest-user';
    const updated = await voteRoadmap(itemId, userId);
    setRoadmaps(updated);
    showToast('Vote recorded on the product roadmap!');
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-2.5 text-xs font-semibold animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        currentUser={currentUser}
        onOpenAuth={() => setShowAuthModal(true)}
        onOpenProfile={() => setShowProfileModal(true)}
        onOpenCreateSession={() => {
          if (!currentUser) setShowAuthModal(true);
          else setShowCreateSessionModal(true);
        }}
        onSelectPersona={handleSelectPersona}
        onSignOut={handleSignOut}
      />

      {/* Main Body Content based on active tab */}
      <main className="flex-1">
        {currentTab === 'sessions' && (
          <>
            <ProblemHero
              onExploreClick={() => {
                const el = document.getElementById('session-list-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onAiMatchClick={() => setCurrentTab('ai-match')}
              onRoadmapClick={() => setCurrentTab('roadmap')}
            />
            <SessionList
              sessions={sessions}
              currentUser={currentUser}
              onJoinSession={handleJoinSession}
              onAnalyzeSynergy={(session) => setSelectedSessionForAi(session)}
              onOpenCreateSession={() => {
                if (!currentUser) setShowAuthModal(true);
                else setShowCreateSessionModal(true);
              }}
              onOpenAuth={() => setShowAuthModal(true)}
            />
          </>
        )}

        {currentTab === 'ai-match' && (
          <AiMatchmakerView
            currentUser={currentUser || DEMO_PERSONAS[0]}
            sessions={sessions}
            onOpenSessionSynergy={(session) => setSelectedSessionForAi(session)}
            onOpenCreateSession={() => {
              if (!currentUser) setShowAuthModal(true);
              else setShowCreateSessionModal(true);
            }}
          />
        )}

        {currentTab === 'roadmap' && (
          <RoadmapView
            items={roadmaps}
            onVote={handleVoteRoadmap}
            currentUserId={currentUser ? currentUser.uid : 'guest'}
          />
        )}

        {currentTab === 'courts' && <CourtFinder />}

        {currentTab === 'problem' && (
          <ProblemArchitectureView
            onStartMatching={() => setCurrentTab('ai-match')}
            onExploreRoadmap={() => setCurrentTab('roadmap')}
          />
        )}
      </main>

      {/* Modals */}
      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          onSuccess={(user) => {
            setCurrentUser(user);
            showToast(`Welcome ${user.displayName}! Signed in successfully.`);
          }}
        />
      )}

      {showProfileModal && currentUser && (
        <UserProfileModal
          currentUser={currentUser}
          onClose={() => setShowProfileModal(false)}
          onSave={handleSaveProfile}
        />
      )}

      {showCreateSessionModal && currentUser && (
        <CreateSessionModal
          currentUser={currentUser}
          onClose={() => setShowCreateSessionModal(false)}
          onCreate={handleCreateSession}
        />
      )}

      {selectedSessionForAi && (
        <AiMatchmakerModal
          session={selectedSessionForAi}
          currentUser={currentUser || DEMO_PERSONAS[0]}
          onClose={() => setSelectedSessionForAi(null)}
          onJoinSession={handleJoinSession}
        />
      )}

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="font-bold text-sm flex items-center justify-center md:justify-start gap-2">
              <span>🎾 Urban Sports Matchmaker</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono">
                Cloud Run • AI Studio
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-md">
              A frictionless platform connecting urban professionals and students in high-density tech hubs to play outdoor sports and network organically.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400">
            <button
              onClick={() => setCurrentTab('problem')}
              className="hover:text-white transition-colors"
            >
              Problem Statement
            </button>
            <button
              onClick={() => setCurrentTab('roadmap')}
              className="hover:text-white transition-colors"
            >
              Roadmap
            </button>
            <button
              onClick={() => setCurrentTab('ai-match')}
              className="hover:text-white transition-colors"
            >
              Gemini AI Matching
            </button>
            <button
              onClick={() => setCurrentTab('courts')}
              className="hover:text-white transition-colors"
            >
              Outdoor Courts
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
          <div>
            Built with Firebase Auth, Cloud Firestore, Express API Proxy, and Gemini 3.8 Flash SDK.
          </div>
          <div>
            SF Bay Area • Seattle • Austin • NYC • Boston
          </div>
        </div>
      </footer>
    </div>
  );
}
