"use client";

import { useState } from "react";
import { RESIN_CODES_DATABASE, playSound } from "@/lib/wasteDatabase";
import { ResinCodeInfo } from "@/types/ecosort";
import {
  ShieldAlert,
  ShieldCheck,
  Flame,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  Info,
  Search,
} from "lucide-react";

export default function ResinCodeGuide() {
  const [selectedCode, setSelectedCode] = useState<number | null>(null);
  const [searchFilter, setSearchFilter] = useState("");

  const filteredCodes = RESIN_CODES_DATABASE.filter((item) => {
    if (!searchFilter.trim()) return true;
    const q = searchFilter.toLowerCase();
    return (
      item.code.toString().includes(q) ||
      item.abbreviation.toLowerCase().includes(q) ||
      item.fullName.toLowerCase().includes(q) ||
      item.commonProducts.some((p) => p.toLowerCase().includes(q))
    );
  });

  const activeResin = selectedCode
    ? RESIN_CODES_DATABASE.find((c) => c.code === selectedCode)
    : null;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Info */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Plastic Identification Standards</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Plastic Resin Identification Codes (#1 – #7)
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
          Not all plastics are recyclable or safe for reuse. Check the triangle number stamped on the bottom of containers to know its toxicity, microwave safety, and recycling destination.
        </p>
      </div>

      {/* Search and Quick Filters */}
      <div className="max-w-md mx-auto">
        <div className="relative">
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search code #1-7, PET, PP, microwave, bottle..."
            className="w-full bg-slate-900/90 border border-slate-800 text-white rounded-2xl py-3 pl-10 pr-4 text-xs sm:text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 shadow-xl placeholder-slate-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
        </div>
      </div>

      {/* Grid of 7 Resin Codes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredCodes.map((resin) => {
          const isSelected = selectedCode === resin.code;
          const isSafe = resin.safetyLevel === "Safe";
          const isHazard = resin.safetyLevel === "Avoid / Toxic Hazard";

          return (
            <div
              key={resin.code}
              onClick={() => {
                playSound("click");
                setSelectedCode(isSelected ? null : resin.code);
              }}
              className={`group cursor-pointer rounded-2xl p-5 border transition-all duration-200 relative overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? "bg-slate-800/90 border-cyan-400 shadow-2xl ring-2 ring-cyan-400/40 scale-[1.02]"
                  : "bg-slate-900/80 hover:bg-slate-850 border-slate-800 hover:border-slate-700 shadow-lg"
              }`}
            >
              <div className="space-y-4">
                {/* Header with symbol & safety */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-4xl select-none group-hover:scale-110 transition-transform">
                      {resin.symbol}
                    </span>
                    <div>
                      <h3 className="font-extrabold text-white text-base">
                        #{resin.code} {resin.abbreviation}
                      </h3>
                      <p className="text-xs text-slate-400 truncate max-w-[130px]">
                        {resin.fullName}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${
                      isSafe
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                        : isHazard
                        ? "bg-rose-500/10 border-rose-500/30 text-rose-400"
                        : "bg-amber-500/10 border-amber-500/30 text-amber-400"
                    }`}
                  >
                    {resin.safetyLevel}
                  </span>
                </div>

                {/* Recyclability tag */}
                <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800">
                  <span className="text-slate-400 font-medium">Recyclability:</span>
                  <span
                    className={`font-semibold ${
                      resin.recyclability === "Widely Recycled"
                        ? "text-cyan-400"
                        : resin.recyclability === "Locally Recycled"
                        ? "text-amber-400"
                        : "text-rose-400"
                    }`}
                  >
                    {resin.recyclability}
                  </span>
                </div>

                {/* Common Products */}
                <div className="space-y-1">
                  <span className="text-[11px] uppercase font-semibold text-slate-400 tracking-wider">
                    Common Items:
                  </span>
                  <p className="text-xs text-slate-300 leading-snug">
                    {resin.commonProducts.slice(0, 3).join(", ")}
                  </p>
                </div>
              </div>

              {/* Microwave Badge & Click expand prompt */}
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">
                  {resin.microwaveSafe ? "🔥 Microwave Safe" : "❌ No Microwave"}
                </span>
                <span className="text-cyan-400 font-medium group-hover:underline">
                  {isSelected ? "Hide Details" : "View Specs →"}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Expanded Modal / Detail View */}
      {activeResin && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-cyan-500/30 shadow-2xl space-y-6 animate-in fade-in slide-in-from-top-4 duration-300 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800 relative z-10">
            <div className="flex items-center space-x-4">
              <span className="text-5xl select-none">{activeResin.symbol}</span>
              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  Resin #{activeResin.code}: {activeResin.fullName} ({activeResin.abbreviation})
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm pt-1">
                  {activeResin.description}
                </p>
              </div>
            </div>

            <button
              onClick={() => setSelectedCode(null)}
              className="self-start sm:self-center px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold border border-slate-700 transition-all"
            >
              Close Detail
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400 uppercase font-bold tracking-wide">
                Where It&apos;s Recycled
              </span>
              <p className="text-sm font-bold text-white">{activeResin.recyclability}</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400 uppercase font-bold tracking-wide">
                Health & Safety Rating
              </span>
              <p className="text-sm font-bold text-white">{activeResin.safetyLevel}</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400 uppercase font-bold tracking-wide">
                Microwave & Heat Tolerant
              </span>
              <p className="text-sm font-bold text-white">
                {activeResin.microwaveSafe ? "Yes, food-grade heat safe" : "No, risk of chemical leaching"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h4 className="text-xs uppercase font-bold tracking-wider text-cyan-400">
                Common Products Made With #{activeResin.code}
              </h4>
              <ul className="space-y-1 text-xs sm:text-sm text-slate-300">
                {activeResin.commonProducts.map((prod, i) => (
                  <li key={i} className="flex items-center space-x-2">
                    <span className="text-cyan-400">•</span>
                    <span>{prod}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h4 className="text-xs uppercase font-bold tracking-wider text-emerald-400">
                What It Gets Reborn Into (Recycled Products)
              </h4>
              <ul className="space-y-1 text-xs sm:text-sm text-slate-300">
                {activeResin.recycledInto.map((item, i) => (
                  <li key={i} className="flex items-center space-x-2">
                    <span className="text-emerald-400">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Educational Infobox */}
      <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
        <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm">
          <Info className="w-4 h-4" />
          <span>Quick Safety Rule of Thumb: &quot;4, 5, 1 and 2, all the rest are bad for you!&quot;</span>
        </div>
        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
          Plastics labeled with numbers <strong>#2 (HDPE)</strong>, <strong>#4 (LDPE)</strong>, and <strong>#5 (PP)</strong> are generally considered the safest plastics for human health. Plastics <strong>#3 (PVC)</strong> and <strong>#6 (Polystyrene)</strong> can release hazardous plasticizers and styrene and should never be heated.
        </p>
      </div>
    </div>
  );
}
