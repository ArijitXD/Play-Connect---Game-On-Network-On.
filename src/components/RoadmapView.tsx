import React, { useState } from 'react';
import { RoadmapItem } from '../types';
import {
  Layers,
  CheckCircle2,
  Clock,
  ThumbsUp,
  Sparkles,
  Cpu,
  Calendar,
  Building2,
  Radio,
  Send,
  Filter
} from 'lucide-react';

interface RoadmapViewProps {
  items: RoadmapItem[];
  onVote: (itemId: string) => void;
  currentUserId: string;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({
  items,
  onVote,
  currentUserId
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const categories = [
    'All',
    'Matching & Sync',
    'AI Intelligence',
    'Community & Networking',
    'Hardware & Facilities'
  ];

  const filteredItems = selectedCategory === 'All'
    ? items
    : items.filter((item) => item.category === selectedCategory);

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;
    setFeedbackSubmitted(true);
    setFeedbackText('');
    setTimeout(() => setFeedbackSubmitted(false), 4000);
  };

  const getStatusBadge = (status: RoadmapItem['status']) => {
    switch (status) {
      case 'Live in App':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Live in App
          </span>
        );
      case 'In Progress':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Clock className="w-3.5 h-3.5" />
            In Progress
          </span>
        );
      case 'Next Up':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <Calendar className="w-3.5 h-3.5" />
            Next Up
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-700/50 text-slate-300 border border-slate-600">
            Planned
          </span>
        );
    }
  };

  return (
    <div id="roadmap-view-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Title & Vision Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
          <Layers className="w-3.5 h-3.5" />
          End-to-End Product Architecture
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Product Roadmap: From Frictionless Matching to Urban Sports OS
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
          Solving the core problem statement requires a progressive journey: starting with instant partner discovery and Gemini AI compatibility scoring, moving to verified skill consensus and campus/corporate ladders, and culminating in real-time smart municipal court IoT.
        </p>

        {/* Phase Timeline Tracker Bar */}
        <div className="mt-6 pt-6 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
          <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40">
            <div className="text-[11px] font-bold text-emerald-400">PHASE 1</div>
            <div className="text-xs font-semibold text-white truncate">Core Engine</div>
            <div className="text-[10px] text-emerald-300">Shipped</div>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40">
            <div className="text-[11px] font-bold text-emerald-400">PHASE 2</div>
            <div className="text-xs font-semibold text-white truncate">Gemini AI Intel</div>
            <div className="text-[10px] text-emerald-300">Shipped</div>
          </div>
          <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/40">
            <div className="text-[11px] font-bold text-amber-400">PHASE 3</div>
            <div className="text-xs font-semibold text-white truncate">Verified NTRP</div>
            <div className="text-[10px] text-amber-300">Q2 2026</div>
          </div>
          <div className="p-2.5 rounded-xl bg-indigo-950/40 border border-indigo-500/40">
            <div className="text-[11px] font-bold text-indigo-400">PHASE 4</div>
            <div className="text-xs font-semibold text-white truncate">Tech Ladders</div>
            <div className="text-[10px] text-indigo-300">Q3 2026</div>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700 col-span-2 sm:col-span-1">
            <div className="text-[11px] font-bold text-slate-400">PHASE 5</div>
            <div className="text-xs font-semibold text-slate-300 truncate">Smart Courts</div>
            <div className="text-[10px] text-slate-400">Q4 2026</div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-1.5 flex-wrap">
          <Filter className="w-4 h-4 text-slate-500 mr-1" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="text-xs text-slate-500 font-medium">
          Showing {filteredItems.length} roadmap milestones
        </div>
      </div>

      {/* Roadmap Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredItems.map((item) => {
          const hasVoted = item.upvotedBy.includes(currentUserId);
          return (
            <div
              key={item.id}
              id={`roadmap-item-${item.id}`}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold font-mono uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                    {item.phase}
                  </span>
                  {getStatusBadge(item.status)}
                </div>

                <h3 className="text-lg font-bold text-slate-900 leading-snug">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>

                {/* Deliverables Checklist */}
                <div className="pt-2">
                  <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Key Deliverables:
                  </div>
                  <ul className="space-y-1.5">
                    {item.deliverables.map((deliv, idx) => (
                      <li key={idx} className="text-xs text-slate-600 flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span>{deliv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="text-xs text-slate-500 flex items-center gap-2">
                  <span className="font-semibold text-slate-700">{item.targetQuarter}</span>
                  <span>•</span>
                  <span>{item.category}</span>
                </div>

                <button
                  id={`btn-vote-${item.id}`}
                  onClick={() => onVote(item.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    hasVoted
                      ? 'bg-emerald-500 text-white shadow-sm'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                  title="Upvote this feature"
                >
                  <ThumbsUp className={`w-3.5 h-3.5 ${hasVoted ? 'fill-white' : ''}`} />
                  <span>{item.votes} votes</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Community Feature Proposal Box */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8">
        <div className="max-w-2xl">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            Have a Tech Hub Feature Request?
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            Let our product and engineering team know what sports courts, corporate ladder integrations, or matching criteria your company/campus needs.
          </p>

          <form onSubmit={handleFeedbackSubmit} className="mt-4 flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              id="input-roadmap-feedback"
              placeholder="e.g. Integrate Slack bot for SoMa tennis alerts or add Austin disc golf..."
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              className="flex-1 px-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
            />
            <button
              type="submit"
              id="btn-submit-roadmap-feedback"
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <Send className="w-4 h-4" />
              Submit
            </button>
          </form>

          {feedbackSubmitted && (
            <div className="mt-3 text-xs text-emerald-700 font-semibold flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 p-2.5 rounded-lg">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Thank you! Your feedback has been queued for our upcoming product iteration.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
