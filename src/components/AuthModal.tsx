import React, { useState } from 'react';
import { UserProfile } from '../types';
import { DEMO_PERSONAS } from '../lib/mockData';
import {
  auth,
  googleProvider,
  saveUserProfile
} from '../lib/firebase';
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { X, LogIn, Sparkles, User, Mail, Lock, Loader2, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  onClose: () => void;
  onSuccess: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onClose, onSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [role, setRole] = useState('Software Engineer');
  const [company, setCompany] = useState('Tech Co');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const profile: UserProfile = {
        uid: user.uid,
        displayName: user.displayName || 'Tech Player',
        email: user.email || '',
        photoURL: user.photoURL || undefined,
        role: 'Tech Professional',
        companyOrSchool: 'Tech Hub',
        hubCity: 'San Francisco (Mission / SoMa)',
        bio: 'Enthusiastic sports player and tech builder.',
        sports: ['Tennis', 'Pickleball'],
        skillRatings: {
          Tennis: 'Intermediate (3.0 - 3.5)',
          Pickleball: 'Intermediate (3.0 - 3.5)'
        },
        availability: ['Early Morning (6:30 - 8:00 AM)', 'Post-Work / Sunset (5:30 - 7:30 PM)'],
        networkingGoals: 'Connect with local engineers, founders, and students over tennis and pickleball.'
      };
      await saveUserProfile(profile);
      onSuccess(profile);
      onClose();
    } catch (e: any) {
      console.error('Google sign in error:', e);
      setErrorMsg(e.message || 'Google sign-in popup closed or cancelled.');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      if (isSignUp) {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        const profile: UserProfile = {
          uid: cred.user.uid,
          displayName: displayName || email.split('@')[0],
          email: cred.user.email || email,
          role: role || 'Tech Professional',
          companyOrSchool: company || 'Tech Co',
          hubCity: 'San Francisco',
          bio: 'Looking for regular rallies and tech networking.',
          sports: ['Tennis', 'Pickleball'],
          skillRatings: {
            Tennis: 'Intermediate (3.0 - 3.5)',
            Pickleball: 'Intermediate (3.0 - 3.5)'
          },
          availability: ['Post-Work / Sunset (5:30 - 7:30 PM)', 'Weekend Morning (8:00 - 11:00 AM)'],
          networkingGoals: 'Build friendships and share technical perspectives on the court.'
        };
        await saveUserProfile(profile);
        onSuccess(profile);
      } else {
        const cred = await signInWithEmailAndPassword(auth, email, password);
        const profile: UserProfile = {
          uid: cred.user.uid,
          displayName: cred.user.displayName || email.split('@')[0],
          email: cred.user.email || email,
          role: 'Tech Professional',
          companyOrSchool: 'Tech Co',
          hubCity: 'San Francisco',
          bio: 'Looking for regular rallies and tech networking.',
          sports: ['Tennis', 'Pickleball'],
          skillRatings: {
            Tennis: 'Intermediate (3.0 - 3.5)',
            Pickleball: 'Intermediate (3.0 - 3.5)'
          },
          availability: ['Post-Work / Sunset (5:30 - 7:30 PM)'],
          networkingGoals: 'Find dependable sports partners.'
        };
        await saveUserProfile(profile);
        onSuccess(profile);
      }
      onClose();
    } catch (e: any) {
      console.error('Auth error:', e);
      setErrorMsg(e.message || 'Authentication failed. You can also select a Quick Demo Persona below.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectDemoPersona = (persona: UserProfile) => {
    saveUserProfile(persona);
    onSuccess(persona);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl my-8">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <LogIn className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-bold text-white">
              {isSignUp ? 'Join Urban Sports Matchmaker' : 'Sign In to Match & Play'}
            </h3>
          </div>
          <p className="text-xs text-slate-400">
            Firebase Authentication on Cloud Run.
          </p>
        </div>

        <div className="p-6 space-y-5 text-xs">
          {errorMsg && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs">
              {errorMsg}
            </div>
          )}

          {/* Quick Demo Switcher - Highlighted for frictionless test access */}
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2">
            <div className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                Quick 1-Click Evaluation Personas
              </span>
              <span className="text-[10px] font-normal text-emerald-700">No password needed</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {DEMO_PERSONAS.map((p) => (
                <button
                  key={p.uid}
                  type="button"
                  onClick={() => handleSelectDemoPersona(p)}
                  className="p-2 rounded-lg bg-white hover:bg-emerald-100/60 border border-emerald-200 text-left transition-all text-slate-800 shadow-2xs"
                >
                  <div className="font-bold text-slate-900 truncate">{p.displayName}</div>
                  <div className="text-[10px] text-emerald-700 truncate">{p.role} @ {p.companyOrSchool}</div>
                  <div className="text-[9px] text-slate-500 mt-0.5">{p.sports[0]} ({p.skillRatings[p.sports[0]]?.split(' ')[0]})</div>
                </button>
              ))}
            </div>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink mx-3 text-[11px] text-slate-400 font-medium">Or Use Your Account</span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          {/* Google Sign-in */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full py-2.5 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold flex items-center justify-center gap-2 shadow-2xs transition-all"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            Continue with Google
          </button>

          {/* Email / Password Form */}
          <form onSubmit={handleEmailAuth} className="space-y-3 pt-1">
            {isSignUp && (
              <>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Rivera"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full p-2 bg-white rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Role</label>
                    <input
                      type="text"
                      placeholder="e.g. AI Engineer"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full p-2 bg-white rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Company / University</label>
                    <input
                      type="text"
                      placeholder="e.g. OpenAI / Stanford"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full p-2 bg-white rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block font-bold text-slate-700 mb-1">Email</label>
              <input
                type="email"
                required
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 bg-white rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 bg-white rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold flex items-center justify-center gap-2 shadow-xs transition-all disabled:opacity-50"
            >
              {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              {isSignUp ? 'Create Tech Sports Profile' : 'Sign In'}
            </button>
          </form>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-emerald-700 hover:text-emerald-800 font-bold"
            >
              {isSignUp
                ? 'Already have an account? Sign in here'
                : 'Need an account? Sign up with email'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
