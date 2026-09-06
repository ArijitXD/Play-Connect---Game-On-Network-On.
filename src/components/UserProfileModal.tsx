import React, { useState } from 'react';
import { UserProfile, SportType, SkillLevel, AvailabilitySlot } from '../types';
import { X, User, ShieldCheck, Clock, Target, CheckCircle2, Loader2, Sparkles } from 'lucide-react';

interface UserProfileModalProps {
  currentUser: UserProfile;
  onClose: () => void;
  onSave: (updated: UserProfile) => Promise<void>;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  currentUser,
  onClose,
  onSave
}) => {
  const [displayName, setDisplayName] = useState(currentUser.displayName);
  const [role, setRole] = useState(currentUser.role);
  const [companyOrSchool, setCompanyOrSchool] = useState(currentUser.companyOrSchool);
  const [hubCity, setHubCity] = useState(currentUser.hubCity);
  const [bio, setBio] = useState(currentUser.bio);
  const [networkingGoals, setNetworkingGoals] = useState(currentUser.networkingGoals);
  const [sports, setSports] = useState<SportType[]>(currentUser.sports);
  const [skillRatings, setSkillRatings] = useState<Record<string, SkillLevel>>(currentUser.skillRatings || {});
  const [availability, setAvailability] = useState<AvailabilitySlot[]>(currentUser.availability || []);
  const [isSaving, setIsSaving] = useState(false);

  const availableSports: SportType[] = [
    'Tennis',
    'Pickleball',
    'Basketball',
    'Running',
    'Beach Volleyball',
    'Bouldering',
    'Cycling',
    'Soccer'
  ];

  const skillOptions: SkillLevel[] = [
    'Beginner (2.0 - 2.5)',
    'Intermediate (3.0 - 3.5)',
    'Advanced (4.0 - 4.5)',
    'Expert (5.0+)'
  ];

  const timeSlots: AvailabilitySlot[] = [
    'Early Morning (6:30 - 8:00 AM)',
    'Lunch Rally (12:00 - 1:30 PM)',
    'Post-Work / Sunset (5:30 - 7:30 PM)',
    'Late Evening Lit Courts (7:30 - 9:30 PM)',
    'Weekend Morning (8:00 - 11:00 AM)',
    'Weekend Afternoon (2:00 - 5:00 PM)'
  ];

  const toggleSport = (sport: SportType) => {
    if (sports.includes(sport)) {
      setSports(sports.filter((s) => s !== sport));
    } else {
      setSports([...sports, sport]);
      if (!skillRatings[sport]) {
        setSkillRatings({ ...skillRatings, [sport]: 'Intermediate (3.0 - 3.5)' });
      }
    }
  };

  const toggleAvailability = (slot: AvailabilitySlot) => {
    if (availability.includes(slot)) {
      setAvailability(availability.filter((a) => a !== slot));
    } else {
      setAvailability([...availability, slot]);
    }
  };

  const handleRatingChange = (sport: string, rating: SkillLevel) => {
    setSkillRatings({ ...skillRatings, [sport]: rating });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const updated: UserProfile = {
      ...currentUser,
      displayName,
      role,
      companyOrSchool,
      hubCity,
      bio,
      networkingGoals,
      sports,
      skillRatings,
      availability
    };

    try {
      await onSave(updated);
      onClose();
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl my-8">
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <img
              src={currentUser.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
              alt={currentUser.displayName}
              className="w-12 h-12 rounded-xl object-cover border-2 border-emerald-400"
              referrerPolicy="no-referrer"
            />
            <div>
              <h3 className="text-lg font-bold text-white">Your Sports & Networking Profile</h3>
              <p className="text-xs text-slate-400">
                Precision matching depends on accurate skill ratings and availability windows.
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto text-xs">
          {/* Identity & Work */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-emerald-600" />
              Professional & Tech Background
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full p-2 bg-white rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Tech Hub & Neighborhood</label>
                <input
                  type="text"
                  required
                  value={hubCity}
                  onChange={(e) => setHubCity(e.target.value)}
                  className="w-full p-2 bg-white rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Role / Specialization</label>
                <input
                  type="text"
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full p-2 bg-white rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Company / University</label>
                <input
                  type="text"
                  required
                  value={companyOrSchool}
                  onChange={(e) => setCompanyOrSchool(e.target.value)}
                  className="w-full p-2 bg-white rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Networking Focus / Goals</label>
              <input
                type="text"
                value={networkingGoals}
                onChange={(e) => setNetworkingGoals(e.target.value)}
                placeholder="e.g. Chat about distributed training, meet seed founders, brainstorm ideas"
                className="w-full p-2 bg-white rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Sports & Skill Ratings */}
          <div className="space-y-3 pt-2 border-t border-slate-200">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Sports & NTRP / Skill Ratings
            </h4>

            <div>
              <label className="block text-slate-600 mb-2">Select the sports you play:</label>
              <div className="flex flex-wrap gap-2">
                {availableSports.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => toggleSport(s)}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all text-xs ${
                      sports.includes(s)
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Individual ratings for selected sports */}
            <div className="space-y-2 pt-2">
              {sports.map((s) => (
                <div key={s} className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-3">
                  <span className="font-bold text-slate-800">{s} Rating:</span>
                  <select
                    value={skillRatings[s] || 'Intermediate (3.0 - 3.5)'}
                    onChange={(e) => handleRatingChange(s, e.target.value as SkillLevel)}
                    className="p-1.5 bg-white border border-slate-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-emerald-500 text-slate-700"
                  >
                    {skillOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>

          {/* Availability Slots */}
          <div className="space-y-3 pt-2 border-t border-slate-200">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-600" />
              Exact Availability Windows
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {timeSlots.map((slot) => {
                const isSelected = availability.includes(slot);
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => toggleAvailability(slot)}
                    className={`p-2.5 rounded-xl text-left border transition-all text-xs flex items-center justify-between ${
                      isSelected
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>{slot}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Actions */}
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
              disabled={isSaving}
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-2 shadow-xs disabled:opacity-50"
            >
              {isSaving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
