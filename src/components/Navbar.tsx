import React, { useState } from 'react';
import { UserProfile } from '../types';
import { DEMO_PERSONAS } from '../lib/mockData';
import {
  Sparkles,
  MapPin,
  Calendar,
  Compass,
  PlusCircle,
  LogIn,
  LogOut,
  User,
  ChevronDown,
  Layers,
  HelpCircle
} from 'lucide-react';

interface NavbarProps {
  currentTab: 'sessions' | 'ai-match' | 'roadmap' | 'courts' | 'problem';
  onTabChange: (tab: 'sessions' | 'ai-match' | 'roadmap' | 'courts' | 'problem') => void;
  currentUser: UserProfile | null;
  onOpenAuth: () => void;
  onOpenProfile: () => void;
  onOpenCreateSession: () => void;
  onSelectPersona: (persona: UserProfile) => void;
  onSignOut: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onTabChange,
  currentUser,
  onOpenAuth,
  onOpenProfile,
  onOpenCreateSession,
  onSelectPersona,
  onSignOut
}) => {
  const [showPersonaMenu, setShowPersonaMenu] = useState(false);

  return (
    <header id="main-header" className="sticky top-0 z-40 w-full bg-slate-900/95 backdrop-blur border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo & Title */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onTabChange('sessions')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-emerald-500/20">
            <span className="text-xl">🎾</span>
          </div>
          <div>
            <div className="font-bold text-base text-white tracking-tight flex items-center gap-1.5">
              <span>Urban Sports</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Matchmaker
              </span>
            </div>
            <div className="text-[11px] text-slate-400 hidden sm:block">
              Tech Hubs Partner Sync & Networking
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60">
          <button
            id="nav-tab-sessions"
            onClick={() => onTabChange('sessions')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              currentTab === 'sessions'
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            Pickups & Rallies
          </button>

          <button
            id="nav-tab-ai-match"
            onClick={() => onTabChange('ai-match')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              currentTab === 'ai-match'
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            AI Matchmaker
          </button>

          <button
            id="nav-tab-roadmap"
            onClick={() => onTabChange('roadmap')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              currentTab === 'roadmap'
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Roadmap
          </button>

          <button
            id="nav-tab-courts"
            onClick={() => onTabChange('courts')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              currentTab === 'courts'
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            Court Finder
          </button>

          <button
            id="nav-tab-problem"
            onClick={() => onTabChange('problem')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
              currentTab === 'problem'
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            Problem
          </button>
        </nav>

        {/* Action Controls & User Auth */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            id="btn-nav-create-session"
            onClick={onOpenCreateSession}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs shadow-sm transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Host Session</span>
          </button>

          {/* Persona / Auth dropdown */}
          {currentUser ? (
            <div className="relative">
              <button
                id="btn-user-menu"
                onClick={() => setShowPersonaMenu(!showPersonaMenu)}
                className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-left transition-all"
              >
                <img
                  src={currentUser.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                  alt={currentUser.displayName}
                  className="w-7 h-7 rounded-lg object-cover border border-emerald-500/40"
                  referrerPolicy="no-referrer"
                />
                <div className="hidden sm:block">
                  <div className="text-xs font-semibold text-white leading-tight max-w-[120px] truncate">
                    {currentUser.displayName}
                  </div>
                  <div className="text-[10px] text-emerald-400 font-mono leading-tight max-w-[120px] truncate">
                    {currentUser.companyOrSchool}
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {showPersonaMenu && (
                <div className="absolute right-0 mt-2 w-72 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-2 z-50">
                  <div className="p-2 border-b border-slate-800 mb-1">
                    <div className="text-xs font-bold text-white">{currentUser.displayName}</div>
                    <div className="text-xs text-slate-400">{currentUser.role} • {currentUser.companyOrSchool}</div>
                    <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" />
                      {currentUser.hubCity}
                    </div>
                  </div>

                  <div className="space-y-1 mb-2">
                    <button
                      id="btn-open-user-profile"
                      onClick={() => {
                        setShowPersonaMenu(false);
                        onOpenProfile();
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-slate-800 flex items-center gap-2"
                    >
                      <User className="w-3.5 h-3.5 text-emerald-400" />
                      Edit My Sports Profile & Rating
                    </button>
                  </div>

                  <div className="pt-2 border-t border-slate-800">
                    <div className="text-[10px] font-bold text-slate-400 px-2 uppercase tracking-wider mb-1">
                      Quick Demo Personas Switcher
                    </div>
                    {DEMO_PERSONAS.map((p) => (
                      <button
                        key={p.uid}
                        onClick={() => {
                          onSelectPersona(p);
                          setShowPersonaMenu(false);
                        }}
                        className={`w-full text-left px-2 py-1.5 rounded-lg text-xs flex items-center justify-between ${
                          currentUser.uid === p.uid ? 'bg-emerald-500/20 text-emerald-300 font-semibold' : 'text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <span className="truncate">{p.displayName} ({p.companyOrSchool})</span>
                        <span className="text-[10px] text-slate-400">{p.sports[0]}</span>
                      </button>
                    ))}
                  </div>

                  <div className="pt-2 mt-2 border-t border-slate-800">
                    <button
                      id="btn-sign-out"
                      onClick={() => {
                        setShowPersonaMenu(false);
                        onSignOut();
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-rose-400 hover:bg-rose-500/10 flex items-center gap-2"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              id="btn-nav-login"
              onClick={onOpenAuth}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-all"
            >
              <LogIn className="w-3.5 h-3.5 text-emerald-400" />
              <span>Sign In / Demo</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-800/80 bg-slate-900/90 px-2 py-2 text-xs">
        <button
          onClick={() => onTabChange('sessions')}
          className={`px-2 py-1 rounded ${currentTab === 'sessions' ? 'text-emerald-400 font-bold' : 'text-slate-400'}`}
        >
          Pickups
        </button>
        <button
          onClick={() => onTabChange('ai-match')}
          className={`px-2 py-1 rounded ${currentTab === 'ai-match' ? 'text-emerald-400 font-bold' : 'text-slate-400'}`}
        >
          AI Match
        </button>
        <button
          onClick={() => onTabChange('roadmap')}
          className={`px-2 py-1 rounded ${currentTab === 'roadmap' ? 'text-emerald-400 font-bold' : 'text-slate-400'}`}
        >
          Roadmap
        </button>
        <button
          onClick={() => onTabChange('courts')}
          className={`px-2 py-1 rounded ${currentTab === 'courts' ? 'text-emerald-400 font-bold' : 'text-slate-400'}`}
        >
          Courts
        </button>
      </div>
    </header>
  );
};
