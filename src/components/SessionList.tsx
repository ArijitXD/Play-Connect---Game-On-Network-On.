import React, { useState } from 'react';
import { SportsSession, UserProfile, SportType, SkillLevel } from '../types';
import {
  MapPin,
  Calendar,
  Users,
  Sparkles,
  PlusCircle,
  CheckCircle2,
  Filter,
  Search,
  MessageSquare,
  ShieldCheck,
  Zap,
  ArrowRight
} from 'lucide-react';

interface SessionListProps {
  sessions: SportsSession[];
  currentUser: UserProfile | null;
  onJoinSession: (session: SportsSession) => Promise<void>;
  onAnalyzeSynergy: (session: SportsSession) => void;
  onOpenCreateSession: () => void;
  onOpenAuth: () => void;
}

export const SessionList: React.FC<SessionListProps> = ({
  sessions,
  currentUser,
  onJoinSession,
  onAnalyzeSynergy,
  onOpenCreateSession,
  onOpenAuth
}) => {
  const [selectedSport, setSelectedSport] = useState<string>('All');
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [joiningId, setJoiningId] = useState<string | null>(null);

  const sportsList: Array<string> = [
    'All',
    'Tennis',
    'Pickleball',
    'Basketball',
    'Running',
    'Beach Volleyball',
    'Bouldering',
    'Cycling',
    'Soccer'
  ];

  const citiesList = ['All', 'San Francisco', 'Seattle', 'Austin', 'New York', 'Boston'];

  const filteredSessions = sessions.filter((s) => {
    const matchesSport = selectedSport === 'All' || s.sport === selectedSport;
    const matchesCity = selectedCity === 'All' || s.city.toLowerCase().includes(selectedCity.toLowerCase());
    const matchesSearch =
      searchQuery === '' ||
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.locationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.networkingFocus.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.creatorCompany.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSport && matchesCity && matchesSearch;
  });

  const handleJoin = async (session: SportsSession) => {
    if (!currentUser) {
      onOpenAuth();
      return;
    }
    setJoiningId(session.id);
    try {
      await onJoinSession(session);
    } finally {
      setJoiningId(null);
    }
  };

  return (
    <div id="session-list-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Action Header & Search Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <span>Outdoor Pickups & Practice Rallies</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
              {filteredSessions.length} active
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Browse verified tech community sports sessions with matched availability and NTRP ratings.
          </p>
        </div>

        <button
          id="btn-host-session-top"
          onClick={onOpenCreateSession}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          Host an Outdoor Session
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              id="input-session-search"
              placeholder="Search by company (e.g. Anthropic, Stripe), court, or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* City Selector */}
          <div className="sm:w-56">
            <select
              id="select-city"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              aria-label="Filter by tech hub city"
              className="w-full py-2 px-3 bg-white text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-700"
            >
              {citiesList.map((c) => (
                <option key={c} value={c}>
                  City: {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Sports Chip Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-semibold text-slate-500 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Sport:
          </span>
          {sportsList.map((sport) => (
            <button
              key={sport}
              onClick={() => setSelectedSport(sport)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedSport === sport
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {sport}
            </button>
          ))}
        </div>
      </div>

      {/* Sessions Grid */}
      {filteredSessions.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-slate-100 mx-auto flex items-center justify-center text-slate-400">
            <Filter className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">No sessions match your filters</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your sport or city filter, or be the first to host a pickup session in your neighborhood!
          </p>
          <button
            onClick={onOpenCreateSession}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white text-xs font-bold"
          >
            <PlusCircle className="w-4 h-4" />
            Host a New Session
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredSessions.map((session) => {
            const isUserJoined = currentUser && session.participants.some((p) => p.uid === currentUser.uid);
            const isFull = session.participants.length >= session.maxParticipants;
            const spotsRemaining = Math.max(0, session.maxParticipants - session.participants.length);

            return (
              <div
                key={session.id}
                id={`session-card-${session.id}`}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  {/* Top Bar: Creator Info & Sport Tag */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={session.creatorPhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                        alt={session.creatorName}
                        className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="text-xs font-bold text-slate-900">{session.creatorName}</div>
                        <div className="text-[11px] text-slate-500 font-medium">
                          {session.creatorRole} • <span className="text-emerald-700 font-semibold">{session.creatorCompany}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-900 text-white">
                        {session.sport}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                        isFull ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {isFull ? 'Full' : `${spotsRemaining} spot${spotsRemaining === 1 ? '' : 's'} left`}
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {session.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {session.description}
                    </p>
                  </div>

                  {/* Core Match Details */}
                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span className="truncate font-medium">{session.dateTime}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span className="truncate font-medium">{session.locationName}</span>
                    </div>
                    <div className="flex items-center gap-1.5 col-span-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span>Skill Level Required: <strong>{session.skillLevel}</strong></span>
                    </div>
                  </div>

                  {/* Networking Focus Tag */}
                  <div className="flex items-center gap-1.5 text-xs text-indigo-900 bg-indigo-50/70 border border-indigo-100 px-3 py-1.5 rounded-lg">
                    <Zap className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />
                    <span className="truncate font-medium">
                      Networking Focus: <strong>{session.networkingFocus}</strong>
                    </span>
                  </div>

                  {/* Participants stack */}
                  <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                    <div className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      <span>
                        {session.participants.length} / {session.maxParticipants} players joined
                      </span>
                    </div>

                    <div className="flex -space-x-1.5 overflow-hidden">
                      {session.participants.map((p, i) => (
                        <div
                          key={p.uid || i}
                          title={`${p.displayName} (${p.company})`}
                          className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-slate-800 text-white text-[10px] font-bold flex items-center justify-center"
                        >
                          {p.displayName.charAt(0)}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action Controls */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    id={`btn-analyze-synergy-${session.id}`}
                    onClick={() => onAnalyzeSynergy(session)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 transition-all"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>AI Synergy Check</span>
                  </button>

                  <button
                    id={`btn-join-session-${session.id}`}
                    onClick={() => handleJoin(session)}
                    disabled={joiningId === session.id || (!isUserJoined && isFull)}
                    className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      isUserJoined
                        ? 'bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200'
                        : isFull
                        ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                    }`}
                  >
                    {isUserJoined ? (
                      <>Leave Session</>
                    ) : isFull ? (
                      <>Session Full</>
                    ) : (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Join Pickup
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
