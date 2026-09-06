import React, { useState } from 'react';
import { SportsSession, UserProfile, SportType, SkillLevel } from '../types';
import { X, Sparkles, PlusCircle, Loader2, Calendar, MapPin, Users, Zap } from 'lucide-react';

interface CreateSessionModalProps {
  currentUser: UserProfile;
  onClose: () => void;
  onCreate: (session: SportsSession) => Promise<void>;
}

export const CreateSessionModal: React.FC<CreateSessionModalProps> = ({
  currentUser,
  onClose,
  onCreate
}) => {
  const [sport, setSport] = useState<SportType>('Tennis');
  const [title, setTitle] = useState('');
  const [dateTime, setDateTime] = useState('Tomorrow • 6:30 PM - 8:00 PM');
  const [locationName, setLocationName] = useState('Dolores Park Tennis Courts');
  const [address, setAddress] = useState('19th & Dolores St, San Francisco, CA');
  const [city, setCity] = useState(currentUser.hubCity.split(' ')[0] || 'San Francisco');
  const [skillLevel, setSkillLevel] = useState<SkillLevel | 'All Levels Welcome'>('Intermediate (3.0 - 3.5)');
  const [maxParticipants, setMaxParticipants] = useState<number>(2);
  const [networkingFocus, setNetworkingFocus] = useState('Tech Founders & Engineering Leadership');
  const [description, setDescription] = useState('');
  const [courtDetails, setCourtDetails] = useState('Lit public courts, arrive 10m early.');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAutoPlanning, setIsAutoPlanning] = useState(false);

  const sportsOptions: SportType[] = [
    'Tennis',
    'Pickleball',
    'Basketball',
    'Running',
    'Beach Volleyball',
    'Bouldering',
    'Cycling',
    'Soccer'
  ];

  const skillOptions: Array<SkillLevel | 'All Levels Welcome'> = [
    'All Levels Welcome',
    'Beginner (2.0 - 2.5)',
    'Intermediate (3.0 - 3.5)',
    'Advanced (4.0 - 4.5)',
    'Expert (5.0+)'
  ];

  const handleAiAutoPlan = async () => {
    setIsAutoPlanning(true);
    try {
      const res = await fetch('/api/ai/session-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sport,
          skillLevel,
          participantCount: maxParticipants,
          locationName,
          networkingFocus
        })
      });
      const data = await res.json();
      if (data.sessionTitle) setTitle(data.sessionTitle);
      if (data.warmup && data.drills) {
        setDescription(
          `Warmup: ${data.warmup}\n\nDrills & Format: ${data.drills.join(' • ')}\n\nPost-match: ${data.networkingWindow} (Topic: ${data.conversationTopic})`
        );
      }
    } catch (e) {
      console.error('AI session plan failed:', e);
      setTitle(`${sport} Rally & Tech Networking`);
      setDescription(`Fast-paced ${sport} session for ${skillLevel} players. 90-minute structured play followed by informal tech chat.`);
    } finally {
      setIsAutoPlanning(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !locationName.trim()) return;

    setIsSubmitting(true);
    const newSession: SportsSession = {
      id: `session-${Date.now()}`,
      creatorId: currentUser.uid,
      creatorName: currentUser.displayName,
      creatorRole: currentUser.role,
      creatorCompany: currentUser.companyOrSchool,
      creatorPhoto: currentUser.photoURL,
      sport,
      title: title.trim(),
      description: description.trim() || `Outdoor ${sport} session with tech peers.`,
      skillLevel,
      dateTime,
      locationName,
      address,
      city,
      maxParticipants: Number(maxParticipants),
      participants: [
        {
          uid: currentUser.uid,
          displayName: currentUser.displayName,
          role: currentUser.role,
          company: currentUser.companyOrSchool
        }
      ],
      networkingFocus,
      courtDetails,
      status: 'Open',
      createdAt: new Date().toISOString()
    };

    try {
      await onCreate(newSession);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl my-8">
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Host an Outdoor Sports Pickup</h3>
              <p className="text-xs text-slate-400">
                Coordinate exact availability, NTRP ratings, and tech networking in your city.
              </p>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
          {/* AI Auto-Plan Banner */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 flex items-center justify-between gap-3">
            <div>
              <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                Gemini Practice & Itinerary Planner
              </div>
              <div className="text-emerald-700 text-[11px] mt-0.5">
                Auto-generate structured drills, match format, and icebreakers based on your selections.
              </div>
            </div>
            <button
              type="button"
              id="btn-ai-auto-plan"
              onClick={handleAiAutoPlan}
              disabled={isAutoPlanning}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs flex-shrink-0"
            >
              {isAutoPlanning ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
              AI Auto-Plan
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Sport</label>
              <select
                value={sport}
                onChange={(e) => setSport(e.target.value as SportType)}
                className="w-full p-2 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-emerald-500"
              >
                {sportsOptions.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Required Skill Level</label>
              <select
                value={skillLevel}
                onChange={(e) => setSkillLevel(e.target.value as any)}
                className="w-full p-2 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-emerald-500"
              >
                {skillOptions.map((sk) => (
                  <option key={sk} value={sk}>
                    {sk}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Session Title</label>
            <input
              type="text"
              required
              placeholder="e.g. 4.0 Baseline Singles Rally + AI Systems Chat"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Date & Time Slot</label>
              <input
                type="text"
                required
                placeholder="e.g. Tomorrow • 6:30 PM - 8:00 PM"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                className="w-full p-2 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Tech Hub City</label>
              <input
                type="text"
                required
                placeholder="e.g. San Francisco"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full p-2 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Court / Facility Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Dolores Park Tennis Courts"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                className="w-full p-2 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Max Players (Spots)</label>
              <input
                type="number"
                min={2}
                max={12}
                value={maxParticipants}
                onChange={(e) => setMaxParticipants(parseInt(e.target.value) || 2)}
                className="w-full p-2 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Networking / Tech Conversation Focus</label>
            <input
              type="text"
              placeholder="e.g. GPU Infrastructure, LLM Evaluation, Seed Funding"
              value={networkingFocus}
              onChange={(e) => setNetworkingFocus(e.target.value)}
              className="w-full p-2 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Session Description & Drills</label>
            <textarea
              rows={3}
              placeholder="Describe warmup, drill format, or post-match coffee plans..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Court Lighting & Reservation Details</label>
            <input
              type="text"
              placeholder="e.g. Reserved court #2, lit till 10 PM"
              value={courtDetails}
              onChange={(e) => setCourtDetails(e.target.value)}
              className="w-full p-2 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              id="btn-submit-session"
              disabled={isSubmitting}
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-2 shadow-xs disabled:opacity-50"
            >
              {isSubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              Publish Session
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
