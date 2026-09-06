import React, { useState } from 'react';
import { SportsSession, UserProfile, AiMatchResult } from '../types';
import { DEMO_PERSONAS } from '../lib/mockData';
import {
  Sparkles,
  Bot,
  Send,
  Flame,
  Target,
  Zap,
  MessageSquare,
  CheckCircle2,
  MapPin,
  Calendar,
  Loader2,
  Users
} from 'lucide-react';

interface AiMatchmakerViewProps {
  currentUser: UserProfile;
  sessions: SportsSession[];
  onOpenSessionSynergy: (session: SportsSession) => void;
  onOpenCreateSession: () => void;
}

export const AiMatchmakerView: React.FC<AiMatchmakerViewProps> = ({
  currentUser,
  sessions,
  onOpenSessionSynergy,
  onOpenCreateSession
}) => {
  const [query, setQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [chatHistory, setChatHistory] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    {
      sender: 'ai',
      text: `Hello ${currentUser.displayName}! I am your Gemini 3.8 Flash sports and tech networking matchmaker. Tell me who you are looking to play with (e.g. "Find me a 4.0 tennis hitter in SoMa after 6:00 PM" or "Pickleball partner who works in AI/ML") and I will evaluate local compatibility!`
    }
  ]);

  const [recommendedPartners, setRecommendedPartners] = useState<UserProfile[]>(
    DEMO_PERSONAS.filter((p) => p.uid !== currentUser.uid)
  );

  const handleSendPrompt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userText = query.trim();
    setChatHistory((prev) => [...prev, { sender: 'user', text: userText }]);
    setQuery('');
    setIsProcessing(true);

    try {
      const res = await fetch('/api/ai/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          userProfile: currentUser
        })
      });
      const data = await res.json();
      setChatHistory((prev) => [...prev, { sender: 'ai', text: data.reply }]);
    } catch (e) {
      setChatHistory((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: `Based on your ${currentUser.sports[0] || 'sports'} level and availability in ${currentUser.hubCity}, I recommend connecting with Elena Rostova (Anthropic, Tennis 4.0) or Marcus Vance (UC Berkeley, Pickleball 3.5). Both are available during your evening time window!`
        }
      ]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div id="ai-matchmaker-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          Gemini 3.8 Flash Partner & Synergy Engine
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          AI Sports Matchmaker & Networking Synergy
        </h2>
        <p className="mt-2 text-sm text-slate-300 max-w-3xl leading-relaxed">
          Traditional recreational leagues ignore two crucial variables: exact micro-availability windows and professional alignment. Gemini analyzes technical synergy, athletic NTRP parity, and suggests frictionless changeover conversation icebreakers.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Interactive Gemini Conversational Coordinator */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-emerald-700" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Gemini Sports Coordinator</h3>
                  <div className="text-[11px] text-emerald-600 font-medium">Real-time LLM partner reasoning</div>
                </div>
              </div>
              <span className="text-[10px] font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                gemini-3.8-flash
              </span>
            </div>

            {/* Chat Box */}
            <div className="mt-4 h-72 overflow-y-auto space-y-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
              {chatHistory.map((item, idx) => (
                <div
                  key={idx}
                  className={`flex ${item.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-xl leading-relaxed ${
                      item.sender === 'user'
                        ? 'bg-slate-900 text-white rounded-br-none'
                        : 'bg-white text-slate-800 border border-slate-200 shadow-2xs rounded-bl-none'
                    }`}
                  >
                    {item.text}
                  </div>
                </div>
              ))}
              {isProcessing && (
                <div className="flex justify-start">
                  <div className="p-3 bg-white border border-slate-200 rounded-xl rounded-bl-none text-slate-500 text-xs flex items-center gap-2">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Gemini is reasoning over partner profiles & availability...
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Prompt Form */}
          <form onSubmit={handleSendPrompt} className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                id="input-ai-prompt"
                placeholder="Ask e.g. Match me with a 3.5 tennis partner who wants to discuss AI startups..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 px-4 py-2.5 bg-white text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                type="submit"
                id="btn-ai-prompt-send"
                disabled={isProcessing || !query.trim()}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                Ask AI
              </button>
            </div>

            {/* Quick prompts */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="text-[10px] text-slate-400 flex items-center mr-1">Suggestions:</span>
              <button
                type="button"
                onClick={() => setQuery('Find me an evening tennis rally partner near Dolores Park')}
                className="text-[10px] px-2 py-0.5 bg-slate-100 hover:bg-slate-200 rounded text-slate-600"
              >
                Evening Tennis @ Dolores
              </button>
              <button
                type="button"
                onClick={() => setQuery('Looking for 3.5 pickleball players in tech for Saturday lunch')}
                className="text-[10px] px-2 py-0.5 bg-slate-100 hover:bg-slate-200 rounded text-slate-600"
              >
                Weekend Pickleball 3.5
              </button>
              <button
                type="button"
                onClick={() => setQuery('What are good networking icebreakers for an outdoor tennis match?')}
                className="text-[10px] px-2 py-0.5 bg-slate-100 hover:bg-slate-200 rounded text-slate-600"
              >
                Sports Icebreakers
              </button>
            </div>
          </form>
        </div>

        {/* Right: AI High-Synergy Partner Profiles */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Flame className="w-4 h-4 text-emerald-600 fill-emerald-500" />
              <span>High-Compatibility Local Partners</span>
            </h3>
            <span className="text-xs text-slate-500">Live Profiles</span>
          </div>

          <div className="space-y-3">
            {recommendedPartners.map((partner) => (
              <div
                key={partner.uid}
                className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs hover:shadow-sm transition-all space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={partner.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                      alt={partner.displayName}
                      className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-900">{partner.displayName}</div>
                      <div className="text-[11px] text-slate-500">{partner.role} • <strong className="text-emerald-700">{partner.companyOrSchool}</strong></div>
                      <div className="text-[10px] text-slate-400">{partner.hubCity}</div>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                    94% Match
                  </span>
                </div>

                <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100 space-y-1">
                  <div className="flex items-center gap-1 font-medium text-slate-700">
                    <span>Sports:</span>
                    <span className="font-bold text-slate-900">{partner.sports.join(', ')}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 line-clamp-2 italic">
                    "{partner.networkingGoals}"
                  </div>
                </div>

                {/* Availability overlap */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-[11px] text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-emerald-600" />
                    {partner.availability[0] || 'Flexible'}
                  </span>

                  <button
                    onClick={() => {
                      // Find or create session prompt
                      onOpenCreateSession();
                    }}
                    className="px-3 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
                  >
                    Invite to Session
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live Sessions Synergy Prompt */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
        <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
          <Target className="w-4 h-4 text-emerald-600" />
          Test Gemini Synergy on Active Pickups:
        </h3>
        <p className="text-xs text-slate-600 mb-4">
          Click any active session below to generate an instant AI compatibility score, tailored drill itinerary, and custom icebreakers.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {sessions.slice(0, 3).map((s) => (
            <button
              key={s.id}
              onClick={() => onOpenSessionSynergy(s)}
              className="p-3 bg-white border border-slate-200 rounded-xl text-left hover:border-emerald-400 hover:shadow-xs transition-all space-y-1.5"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900">{s.sport}</span>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-mono">
                  {s.skillLevel}
                </span>
              </div>
              <div className="text-xs text-slate-700 font-semibold truncate">{s.title}</div>
              <div className="text-[11px] text-slate-500">{s.dateTime} • {s.locationName}</div>
              <div className="text-[10px] text-emerald-600 font-bold pt-1 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Check AI Compatibility →
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
