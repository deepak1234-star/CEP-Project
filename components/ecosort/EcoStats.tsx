"use client";

import { Leaf, Award, Recycle, Star } from "lucide-react";

interface EcoStatsProps {
  scanCount: number;
}

export default function EcoStats({ scanCount }: EcoStatsProps) {
  const co2SavedKg = (scanCount * 0.45).toFixed(1);
  // Consistent with EcoAchievements: 15 pts per scan
  const ecoPoints = scanCount * 15;

  const getRank = (pts: number) => {
    if (pts >= 300) return { label: "Zero-Waste Champion", color: "text-emerald-400" };
    if (pts >= 150) return { label: "Sustainability Master", color: "text-cyan-400" };
    if (pts >= 50)  return { label: "Green Guardian",       color: "text-blue-400" };
    return           { label: "Eco Apprentice",             color: "text-slate-400" };
  };
  const rank = getRank(ecoPoints);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center space-x-4 shadow-lg hover:border-slate-700 transition-colors">
        <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
          <Recycle className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Items Classified</p>
          <p className="text-2xl font-extrabold text-white">{scanCount}</p>
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center space-x-4 shadow-lg hover:border-slate-700 transition-colors">
        <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <Leaf className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Estimated CO₂ Saved</p>
          <p className="text-2xl font-extrabold text-emerald-400">{co2SavedKg} kg</p>
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center space-x-4 shadow-lg hover:border-slate-700 transition-colors">
        <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <Award className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Eco Recycling Score</p>
          <p className="text-2xl font-extrabold text-amber-400">{ecoPoints} pts</p>
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center space-x-4 shadow-lg hover:border-slate-700 transition-colors">
        <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
          <Star className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Current Rank</p>
          <p className={`text-sm font-extrabold leading-tight ${rank.color}`}>{rank.label}</p>
        </div>
      </div>
    </div>
  );
}
