import React from 'react';
import {
  Target,
  Sparkles,
  ShieldCheck,
  Clock,
  Users,
  Server,
  Database,
  Lock,
  Cpu,
  ArrowRight,
  Layers,
  Activity
} from 'lucide-react';

interface ProblemArchitectureViewProps {
  onStartMatching: () => void;
  onExploreRoadmap: () => void;
}

export const ProblemArchitectureView: React.FC<ProblemArchitectureViewProps> = ({
  onStartMatching,
  onExploreRoadmap
}) => {
  return (
    <div id="problem-architecture-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Executive Hero */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
          <Target className="w-3.5 h-3.5" />
          The Core Problem Statement
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight max-w-4xl">
          Urban professionals and students in high-density tech hubs lack a frictionless way to find, coordinate, and play outdoor sports with local partners who share their exact availability and skill level, make networking.
        </h1>

        <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
          High-density tech hubs are concentrated with ambitious software engineers, founders, graduate students, and researchers who spend 10+ hours a day in front of screens. While outdoor sports are their preferred outlet for mental decompression and physical stamina, coordination remains broken.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={onStartMatching}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all"
          >
            <Sparkles className="w-4 h-4" />
            Launch AI Matchmaker
          </button>
          <button
            onClick={onExploreRoadmap}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm border border-slate-700 transition-all flex items-center gap-2"
          >
            <Layers className="w-4 h-4" />
            Explore Product Roadmap
          </button>
        </div>
      </div>

      {/* The 4 Friction Dimensions */}
      <div className="space-y-4">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            The 4 Core Friction Dimensions in Tech Hubs
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Why existing tools (WhatsApp group chats, generic meetup apps, Facebook groups) consistently fail.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Schedule Fragmentation</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Engineers have on-call shifts, sprint deadlines, and daily standups. Rigid seasonal leagues require fixed 8-week commitments. Players need hyper-specific 60-90 minute micro-windows (7:00 AM pre-standup, 12:30 PM lunch rally, sunset).
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Skill Asymmetry</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              In tennis, pickleball, and basketball, a mismatch of even 0.5 NTRP rating breaks the quality of the session. Beginners feel intimidated; advanced hitters can't execute competitive baseline drills. Parity verification is non-negotiable.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Stiff Networking Fatigue</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Traditional networking mixers with alcohol and loud venues are socially draining and transactional. Sports camaraderie releases endorphins, creates mutual respect, and produces authentic professional relationships.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Facility & Court Chaos</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Finding which outdoor courts have operational LED lights after 7:00 PM, fast turnover, or reservation requirements is a guessing game. Players lose 45 minutes circling parks without playing.
            </p>
          </div>
        </div>
      </div>

      {/* End-to-End System Architecture */}
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10 space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Server className="w-6 h-6 text-emerald-600" />
            Full-Stack End-to-End Technical Architecture
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Deployed on Google Cloud Run with Firebase Authentication, Cloud Firestore, and Server-Side Gemini API in AI Studio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Layer 1: Client & Auth */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 shadow-sm">
            <div className="text-xs font-mono font-bold text-emerald-700 uppercase bg-emerald-50 px-2 py-0.5 rounded w-fit border border-emerald-200">
              Layer 1: Identity & UI
            </div>
            <h3 className="font-bold text-slate-900 text-base">Firebase Authentication</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Google Identity & Email credentials with instant demo personas. Stores user verification, sports skill taxonomy, tech company affiliation, and availability slots.
            </p>
            <ul className="text-[11px] text-slate-500 space-y-1 pt-2 border-t border-slate-100">
              <li>• Google OAuth popup authentication</li>
              <li>• Client-side token acquisition & GSI compatibility</li>
              <li>• Instant demo switcher for evaluation</li>
            </ul>
          </div>

          {/* Layer 2: Real-time Persistence */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 shadow-sm">
            <div className="text-xs font-mono font-bold text-indigo-700 uppercase bg-indigo-50 px-2 py-0.5 rounded w-fit border border-indigo-200">
              Layer 2: Real-Time Data
            </div>
            <h3 className="font-bold text-slate-900 text-base">Cloud Firestore Database</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Zero-latency document database powering live session bookings, subcollection RSVPs, and product roadmap community consensus. Hardened with Zero-Trust security rules.
            </p>
            <ul className="text-[11px] text-slate-500 space-y-1 pt-2 border-t border-slate-100">
              <li>• Collections: <code className="text-slate-700">/users</code>, <code className="text-slate-700">/sessions</code>, <code className="text-slate-700">/roadmaps</code></li>
              <li>• Atomic RSVP writes in <code className="text-slate-700">/sessions/{'{id}'}/rsvps</code></li>
              <li>• Validated through <code className="text-slate-700">firestore.rules</code></li>
            </ul>
          </div>

          {/* Layer 3: Server & Gemini API */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 shadow-sm">
            <div className="text-xs font-mono font-bold text-purple-700 uppercase bg-purple-50 px-2 py-0.5 rounded w-fit border border-purple-200">
              Layer 3: AI Intelligence
            </div>
            <h3 className="font-bold text-slate-900 text-base">Gemini 3.8 Flash on Cloud Run</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Express server-side proxy handling secret Gemini API keys safely away from client devtools. Evaluates partner compatibility, session plans, and court lighting.
            </p>
            <ul className="text-[11px] text-slate-500 space-y-1 pt-2 border-t border-slate-100">
              <li>• Modern <code className="text-slate-700">@google/genai</code> TypeScript SDK</li>
              <li>• Endpoints: <code className="text-slate-700">/api/ai/match</code>, <code className="text-slate-700">/api/ai/session-plan</code></li>
              <li>• Structured JSON Schema output guarantees</li>
            </ul>
          </div>
        </div>

        {/* Workflow Pipeline Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            End-to-End Matchmaking Pipeline:
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <div className="font-bold text-slate-900">1. Define Window</div>
              <div className="text-slate-500 text-[11px]">Select sport, skill rating (e.g. 4.0), and timeslot (e.g. 6:30 PM sunset).</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <div className="font-bold text-slate-900">2. Gemini Match</div>
              <div className="text-slate-500 text-[11px]">AI evaluates skill parity, tech overlap, and generates conversation icebreakers.</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <div className="font-bold text-slate-900">3. Court & Drill Plan</div>
              <div className="text-slate-500 text-[11px]">AI suggests lit public courts and builds warm-up drills + game format.</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
              <div className="font-bold text-slate-900">4. Play & Network</div>
              <div className="text-slate-500 text-[11px]">Play the match, discuss projects between sets, validate ratings post-game.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
