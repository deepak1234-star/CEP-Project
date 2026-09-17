"use client";

import { Leaf, Award, Recycle, ShieldCheck, Zap } from "lucide-react";

interface EcoStatsProps {
  scanCount: number;
}

export default function EcoStats({ scanCount }: EcoStatsProps) {
  const co2SavedKg = (scanCount * 0.45).toFixed(1);
  const ecoPoints = scanCount * 25;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center space-x-4 shadow-lg">
        <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
          <Recycle className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Items Classified</p>
          <p className="text-2xl font-extrabold text-white">{scanCount}</p>
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center space-x-4 shadow-lg">
        <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <Leaf className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Estimated CO₂ Saved</p>
          <p className="text-2xl font-extrabold text-emerald-400">{co2SavedKg} kg</p>
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center space-x-4 shadow-lg">
        <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <Award className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Eco Recycling Score</p>
          <p className="text-2xl font-extrabold text-amber-400">{ecoPoints} pts</p>
        </div>
      </div>
    </div>
  );
}
