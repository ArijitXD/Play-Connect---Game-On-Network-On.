import React, { useState } from 'react';
import { CourtFacility, SportType } from '../types';
import { CURATED_COURTS } from '../lib/mockData';
import {
  MapPin,
  Sparkles,
  Sun,
  Moon,
  Clock,
  Navigation,
  ShieldCheck,
  CheckCircle2,
  Loader2,
  Search
} from 'lucide-react';

export const CourtFinder: React.FC = () => {
  const [courts, setCourts] = useState<CourtFacility[]>(CURATED_COURTS);
  const [selectedSport, setSelectedSport] = useState<string>('All');
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [advisorCity, setAdvisorCity] = useState('San Francisco');
  const [advisorSport, setAdvisorSport] = useState<SportType>('Tennis');
  const [advisorTime, setAdvisorTime] = useState('Weekday 6:30 PM');
  const [isConsulting, setIsConsulting] = useState(false);
  const [aiRecommendations, setAiRecommendations] = useState<any | null>(null);

  const sportsList = ['All', 'Tennis', 'Pickleball', 'Basketball', 'Running'];
  const citiesList = ['All', 'San Francisco', 'Seattle', 'Austin'];

  const filteredCourts = courts.filter((c) => {
    const matchesSport = selectedSport === 'All' || c.sport === selectedSport;
    const matchesCity = selectedCity === 'All' || c.city === selectedCity;
    return matchesSport && matchesCity;
  });

  const handleAskAdvisor = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsConsulting(true);
    try {
      const res = await fetch('/api/ai/court-recommendation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          city: advisorCity,
          sport: advisorSport,
          preferredTime: advisorTime
        })
      });
      const data = await res.json();
      setAiRecommendations(data);
    } catch (e) {
      console.error('Court advisor failed:', e);
      setAiRecommendations({
        topFacilities: [
          {
            name: `${advisorCity} Recreation Complex`,
            type: 'Municipal Sports Park',
            lighting: 'Lit until 10:00 PM',
            courtQuality: 'High-grade championship surface',
            busyTimes: '5:30 PM - 7:30 PM',
            tips: 'Arrive 15 mins before scheduled hour.'
          }
        ],
        timingAdvice: 'Best court availability is early morning 7:00 AM or after 8:15 PM.'
      });
    } finally {
      setIsConsulting(false);
    }
  };

  return (
    <div id="court-finder-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
          <MapPin className="w-3.5 h-3.5" />
          Outdoor Hubs & Lighting Directory
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Tech Hub Outdoor Courts & Facilities
        </h2>
        <p className="mt-2 text-sm text-slate-300 max-w-2xl leading-relaxed">
          High-density tech hubs feature hidden athletic gems. Explore lit evening courts, scenic waterfront loops, and public courts with active pickup turnover.
        </p>
      </div>

      {/* Gemini AI Court Advisor Card */}
      <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2 text-emerald-900 font-bold text-base">
          <Sparkles className="w-5 h-5 text-emerald-600" />
          <span>Gemini Court & Lighting Advisor</span>
        </div>
        <p className="text-xs text-slate-600">
          Not sure which courts have lights or low congestion tonight? Let Gemini analyze optimal venues in any neighborhood.
        </p>

        <form onSubmit={handleAskAdvisor} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">City / Region</label>
            <input
              type="text"
              value={advisorCity}
              onChange={(e) => setAdvisorCity(e.target.value)}
              className="w-full p-2 bg-white text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">Sport</label>
            <select
              value={advisorSport}
              onChange={(e) => setAdvisorSport(e.target.value as SportType)}
              className="w-full p-2 bg-white text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500"
            >
              <option value="Tennis">Tennis</option>
              <option value="Pickleball">Pickleball</option>
              <option value="Basketball">Basketball</option>
              <option value="Running">Running</option>
              <option value="Beach Volleyball">Beach Volleyball</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">Time Slot</label>
            <input
              type="text"
              value={advisorTime}
              onChange={(e) => setAdvisorTime(e.target.value)}
              className="w-full p-2 bg-white text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              disabled={isConsulting}
              className="w-full py-2 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all disabled:opacity-50"
            >
              {isConsulting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
              Get Court Advice
            </button>
          </div>
        </form>

        {aiRecommendations && (
          <div className="mt-4 p-4 bg-white border border-emerald-200 rounded-xl space-y-3">
            <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Gemini Court Intelligence for {advisorCity} ({advisorSport})
            </div>

            {aiRecommendations.timingAdvice && (
              <div className="text-xs text-slate-700 bg-emerald-50 p-2.5 rounded-lg border border-emerald-100">
                <strong>Congestion Advice:</strong> {aiRecommendations.timingAdvice}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {aiRecommendations.topFacilities?.map((f: any, idx: number) => (
                <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1">
                  <div className="font-bold text-slate-900">{f.name}</div>
                  <div className="text-[11px] text-slate-500">{f.type}</div>
                  <div className="text-slate-600"><strong>Lighting:</strong> {f.lighting}</div>
                  <div className="text-slate-600"><strong>Court Quality:</strong> {f.courtQuality}</div>
                  <div className="text-slate-600"><strong>Peak Times:</strong> {f.busyTimes}</div>
                  <div className="text-emerald-700 text-[11px] italic">Tip: {f.tips}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <span className="font-semibold text-slate-500">Filter:</span>
          {sportsList.map((s) => (
            <button
              key={s}
              onClick={() => setSelectedSport(s)}
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                selectedSport === s
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="text-xs text-slate-500">
          Showing {filteredCourts.length} curated venues
        </div>
      </div>

      {/* Curated Courts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourts.map((court) => (
          <div
            key={court.id}
            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-900 text-white">
                  {court.sport}
                </span>
                <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-emerald-600" />
                  {court.city}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 leading-snug">
                {court.name}
              </h3>

              <div className="text-xs text-slate-600 flex items-start gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
                <span>{court.address}</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl space-y-1.5 text-xs text-slate-600 border border-slate-100">
                <div className="flex items-center gap-1.5">
                  <Moon className="w-3.5 h-3.5 text-indigo-500" />
                  <span><strong>Lights:</strong> {court.lighting}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-600" />
                  <span><strong>Best Times:</strong> {court.bestTimes}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
                  <span><strong>Surface:</strong> {court.surface} ({court.courtCount} courts)</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {court.features.map((feat, i) => (
                  <span
                    key={i}
                    className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md font-medium"
                  >
                    {feat}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 text-right">
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(court.name + ' ' + court.address)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800"
              >
                <span>Open in Maps</span>
                <Navigation className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
