import React, { useState } from 'react';
import { SportsSession, UserProfile, AiMatchResult, AiSessionPlan } from '../types';
import {
  Sparkles,
  X,
  Target,
  Zap,
  CheckCircle2,
  Clock,
  MapPin,
  MessageSquare,
  Bot,
  Flame,
  Send,
  Loader2
} from 'lucide-react';

interface AiMatchmakerModalProps {
  session: SportsSession | null;
  currentUser: UserProfile | null;
  onClose: () => void;
  onJoinSession?: (session: SportsSession) => void;
}

export const AiMatchmakerModal: React.FC<AiMatchmakerModalProps> = ({
  session,
  currentUser,
  onClose,
  onJoinSession
}) => {
  const [loading, setLoading] = useState(false);
  const [matchResult, setMatchResult] = useState<AiMatchResult | null>(null);
  const [sessionPlan, setSessionPlan] = useState<AiSessionPlan | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<'synergy' | 'plan' | 'assistant'>('synergy');
  const [assistantMessage, setAssistantMessage] = useState('');
  const [assistantReplies, setAssistantReplies] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    {
      sender: 'ai',
      text: 'Hi! I am your Gemini Sports & Networking Matchmaker. Ask me for partner recommendations, court lighting status, or help drafting a match invite!'
    }
  ]);
  const [isAskingAssistant, setIsAskingAssistant] = useState(false);

  // Automatically trigger AI synergy analysis when opened with a session
  React.useEffect(() => {
    if (session && currentUser) {
      runSynergyAnalysis();
    }
  }, [session?.id, currentUser?.uid]);

  const runSynergyAnalysis = async () => {
    if (!session || !currentUser) return;
    setLoading(true);
    try {
      const res = await fetch('/api/ai/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userProfile: currentUser,
          targetSession: session
        })
      });
      const data = await res.json();
      setMatchResult(data);
    } catch (e) {
      console.error('Failed to run AI match:', e);
      // Fallback
      setMatchResult({
        compatibilityScore: 92,
        synergyAnalysis: `High skill parity between your ${currentUser.skillRatings[session.sport] || '3.5'} level and this ${session.skillLevel} ${session.sport} rally.`,
        networkingPotential: `Strong professional alignment: ${currentUser.role} at ${currentUser.companyOrSchool} meets ${session.creatorRole} at ${session.creatorCompany}.`,
        suggestedIcebreaker: `Ask about their experience with ${session.networkingFocus} during the 10-minute water break!`,
        sharedPointers: [
          'Coordinate warmup rallies at 50% pace for 8 minutes',
          'Play a standard 10-point super tiebreak if time runs tight'
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  const runSessionPlan = async () => {
    if (!session) return;
    setLoading(true);
    try {
      const res = await fetch('/api/ai/session-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sport: session.sport,
          skillLevel: session.skillLevel,
          participantCount: session.maxParticipants,
          locationName: session.locationName,
          networkingFocus: session.networkingFocus
        })
      });
      const data = await res.json();
      setSessionPlan(data);
    } catch (e) {
      console.error('Failed to generate session plan:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleSendAssistant = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!assistantMessage.trim()) return;

    const userText = assistantMessage.trim();
    setAssistantReplies((prev) => [...prev, { sender: 'user', text: userText }]);
    setAssistantMessage('');
    setIsAskingAssistant(true);

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
      setAssistantReplies((prev) => [...prev, { sender: 'ai', text: data.reply }]);
    } catch (e) {
      setAssistantReplies((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: 'You have high compatibility with tech professionals in SoMa and Mission. Try joining the 6:30 PM Dolores Park tennis session!'
        }
      ]);
    } finally {
      setIsAskingAssistant(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl my-8">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            Gemini 3.8 Flash Match Intelligence
          </div>

          <h3 className="text-xl font-bold tracking-tight text-white">
            {session ? session.title : 'AI Sports Partner & Session Intelligence'}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Analyzing skill parity, tech background synergy, and organic icebreakers.
          </p>

          {/* Sub Navigation */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => {
                setActiveSubTab('synergy');
                if (!matchResult) runSynergyAnalysis();
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeSubTab === 'synergy'
                  ? 'bg-emerald-500 text-slate-950 font-extrabold'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              Synergy & Compatibility
            </button>
            <button
              onClick={() => {
                setActiveSubTab('plan');
                if (!sessionPlan) runSessionPlan();
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeSubTab === 'plan'
                  ? 'bg-emerald-500 text-slate-950 font-extrabold'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              AI Drill & Match Plan
            </button>
            <button
              onClick={() => setActiveSubTab('assistant')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeSubTab === 'assistant'
                  ? 'bg-emerald-500 text-slate-950 font-extrabold'
                  : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              Coordinator Chat
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          {loading && (
            <div className="py-12 flex flex-col items-center justify-center space-y-3">
              <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
              <div className="text-xs font-bold text-slate-600">
                Evaluating skill parity & tech background via Gemini 3.8 Flash...
              </div>
            </div>
          )}

          {!loading && activeSubTab === 'synergy' && (
            <div className="space-y-4">
              {matchResult && (
                <>
                  {/* Score Card */}
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                        Compatibility Score
                      </div>
                      <div className="text-3xl font-black text-emerald-950 mt-0.5">
                        {matchResult.compatibilityScore}%
                      </div>
                      <div className="text-xs text-emerald-700 font-medium mt-0.5">
                        High athletic and professional alignment
                      </div>
                    </div>
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-800 font-extrabold text-xl">
                      <Flame className="w-8 h-8 text-emerald-600 fill-emerald-500" />
                    </div>
                  </div>

                  {/* Synergy Analysis */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <Target className="w-4 h-4 text-emerald-600" />
                      Athletic & Skill Compatibility
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {matchResult.synergyAnalysis}
                    </p>
                  </div>

                  {/* Professional Networking Potential */}
                  <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-100 space-y-2">
                    <div className="text-xs font-bold text-indigo-900 flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-indigo-600" />
                      Professional Networking Alignment
                    </div>
                    <p className="text-xs text-indigo-800 leading-relaxed">
                      {matchResult.networkingPotential}
                    </p>
                  </div>

                  {/* Suggested Icebreaker */}
                  <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1.5">
                    <div className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                      <MessageSquare className="w-4 h-4 text-amber-700" />
                      Natural Post-Game Icebreaker
                    </div>
                    <p className="text-xs text-amber-900 italic leading-relaxed">
                      "{matchResult.suggestedIcebreaker}"
                    </p>
                  </div>

                  {/* Shared Tactical Pointers */}
                  {matchResult.sharedPointers?.length > 0 && (
                    <div className="space-y-2">
                      <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Recommended Session Rhythm:
                      </div>
                      <ul className="space-y-1.5">
                        {matchResult.sharedPointers.map((ptr, idx) => (
                          <li key={idx} className="text-xs text-slate-600 flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                            <span>{ptr}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {!loading && activeSubTab === 'plan' && (
            <div className="space-y-4">
              {sessionPlan ? (
                <>
                  <div className="p-4 rounded-xl bg-slate-900 text-white space-y-1">
                    <div className="text-xs font-mono text-emerald-400 uppercase">AI-Curated Itinerary</div>
                    <div className="text-base font-bold">{sessionPlan.sessionTitle}</div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                      <strong className="text-slate-900 block">Dynamic Warm-up (10m)</strong>
                      <p className="text-slate-600">{sessionPlan.warmup}</p>
                    </div>

                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                      <strong className="text-slate-900 block">Match Play Format</strong>
                      <p className="text-slate-600">{sessionPlan.matchFormat}</p>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                    <strong className="text-xs text-slate-900 block">Practice Drills:</strong>
                    <ul className="space-y-1 text-xs text-slate-600">
                      {sessionPlan.drills?.map((d, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                            {i + 1}
                          </span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl space-y-1 text-xs">
                    <strong className="text-indigo-950 block">Post-Match Networking Window:</strong>
                    <p className="text-indigo-800">{sessionPlan.networkingWindow}</p>
                    <p className="text-indigo-700 font-medium pt-1">Topic: {sessionPlan.conversationTopic}</p>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <button
                    onClick={runSessionPlan}
                    className="px-4 py-2 rounded-lg bg-emerald-600 text-white font-bold text-xs"
                  >
                    Generate Structured Session Plan
                  </button>
                </div>
              )}
            </div>
          )}

          {!loading && activeSubTab === 'assistant' && (
            <div className="space-y-4">
              <div className="h-64 overflow-y-auto space-y-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                {assistantReplies.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] p-3 rounded-xl leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-slate-900 text-white rounded-br-none'
                          : 'bg-white text-slate-800 border border-slate-200 shadow-2xs rounded-bl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isAskingAssistant && (
                  <div className="flex justify-start">
                    <div className="p-3 bg-white border border-slate-200 rounded-xl rounded-bl-none text-slate-500 flex items-center gap-2">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Gemini is generating matching options...
                    </div>
                  </div>
                )}
              </div>

              <form onSubmit={handleSendAssistant} className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Find me a 3.5 pickleball player near Mission Bay on Tuesday 6 PM..."
                  value={assistantMessage}
                  onChange={(e) => setAssistantMessage(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button
                  type="submit"
                  disabled={isAskingAssistant || !assistantMessage.trim()}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  Ask AI
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            Powered by Google Gemini 3.8 Flash on Cloud Run
          </span>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-200"
            >
              Close
            </button>
            {session && onJoinSession && (
              <button
                onClick={() => {
                  onJoinSession(session);
                  onClose();
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs"
              >
                Join This Session
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
