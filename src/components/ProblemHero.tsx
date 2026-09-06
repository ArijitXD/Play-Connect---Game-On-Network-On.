import React from 'react';
import { motion } from 'motion/react';
import { Target, Users, Clock, Sparkles, MapPin, Activity, ArrowRight, ShieldCheck } from 'lucide-react';

interface ProblemHeroProps {
  onExploreClick: () => void;
  onAiMatchClick: () => void;
  onRoadmapClick: () => void;
}

export const ProblemHero: React.FC<ProblemHeroProps> = ({
  onExploreClick,
  onAiMatchClick,
  onRoadmapClick
}) => {
  return (
    <section id="problem-hero" className="w-full bg-slate-900 text-white border-b border-slate-800 relative overflow-hidden">
      {/* Subtle geometric ambient court lines */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-1/2 left-0 right-0 h-px bg-emerald-400" />
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-emerald-400" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 border border-emerald-400 rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          The Core Problem Statement & Solution Architecture
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-5">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Urban sports partners matching your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                exact skill, availability, and tech ambition.
              </span>
            </h1>

            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 text-slate-300 text-base leading-relaxed">
              <strong className="text-white block mb-1">The Problem:</strong>
              Urban professionals and students in high-density tech hubs (SF Bay Area, Seattle, NYC, Austin) lack a frictionless way to find, coordinate, and play outdoor sports with local partners who share their exact availability and skill level, making organic professional networking awkward or nonexistent.
            </div>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Engineers, founders, and university researchers want 7:00 AM baseline rallies before standup or 6:30 PM sunset pickleball with peers of equal competitive caliber. We replace endless WhatsApp groups and stiff mixers with an authenticated, Gemini AI-powered sports coordination pipeline.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                id="btn-hero-explore-sessions"
                onClick={onExploreClick}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold text-sm transition-all shadow-md hover:shadow-emerald-500/20"
              >
                <Activity className="w-4 h-4" />
                Find Active Pickups
              </button>

              <button
                id="btn-hero-ai-match"
                onClick={onAiMatchClick}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-emerald-500/30 font-semibold text-sm transition-all"
              >
                <Sparkles className="w-4 h-4" />
                Run AI Matchmaker
              </button>

              <button
                id="btn-hero-roadmap"
                onClick={onRoadmapClick}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-transparent hover:bg-slate-800/60 text-slate-300 hover:text-white text-sm font-medium transition-all"
              >
                View Product Roadmap
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Metrics / Problem Breakdown Panel */}
          <div className="lg:col-span-4 bg-slate-800/60 border border-slate-700/60 rounded-2xl p-6 space-y-4">
            <h2 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
              <Target className="w-4 h-4" />
              High-Density Hub Friction Points
            </h2>

            <div className="space-y-3 text-sm">
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-700/50">
                <div className="flex items-center gap-2 text-white font-medium mb-1">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  Time Fragmentation
                </div>
                <p className="text-xs text-slate-400">
                  Sprint release cycles & unpredictable meetings break fixed recreational leagues. Players need 60-90 min modular slots.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-700/50">
                <div className="flex items-center gap-2 text-white font-medium mb-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Skill Parity Disconnect
                </div>
                <p className="text-xs text-slate-400">
                  A 4.5 tennis player rallying with a 2.0 beginner is frustrating for both. We sync exact verified NTRP & game pace.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-700/50">
                <div className="flex items-center gap-2 text-white font-medium mb-1">
                  <Users className="w-4 h-4 text-emerald-400" />
                  Natural Networking Bridge
                </div>
                <p className="text-xs text-slate-400">
                  Break down siloed tech campuses. Connect Anthropic, Google, Stripe, YC founders & university researchers over outdoor play.
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-700/50 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                SF • Seattle • NYC • Austin
              </span>
              <span className="font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded">
                Gemini 3.8 Flash
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
