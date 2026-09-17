"use client";

import { useState } from "react";
import { SMART_BIN_GUIDE } from "@/lib/wasteDatabase";
import { Trash2, Check, AlertCircle, Info, Sparkles, BookOpen } from "lucide-react";

export default function SmartBinGuide() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredBins = activeCategory === "all" 
    ? SMART_BIN_GUIDE 
    : SMART_BIN_GUIDE.filter((bin) => bin.category === activeCategory);

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <BookOpen className="w-4 h-4" />
            <span>Educational Visual Guide for Schools & Households</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Smart Bin Color Guide 🗑️
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Mixing waste makes recycling impossible. Learn the exact color codes for every type of waste.
          </p>
        </div>

        {/* Bin Category Filters */}
        <div className="pt-6 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeCategory === "all"
                ? "bg-white text-slate-950 shadow-md"
                : "bg-slate-800 text-slate-400 hover:text-white border border-slate-700"
            }`}
          >
            All Bins
          </button>
          <button
            onClick={() => setActiveCategory("Organic")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeCategory === "Organic"
                ? "bg-emerald-500 text-slate-950 shadow-md"
                : "bg-emerald-950/40 text-emerald-400 border border-emerald-500/30"
            }`}
          >
            🟢 Green Organic
          </button>
          <button
            onClick={() => setActiveCategory("Plastic")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeCategory === "Plastic"
                ? "bg-amber-500 text-slate-950 shadow-md"
                : "bg-amber-950/40 text-amber-400 border border-amber-500/30"
            }`}
          >
            🟡 Yellow/Blue Plastic
          </button>
          <button
            onClick={() => setActiveCategory("Paper")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeCategory === "Paper"
                ? "bg-sky-500 text-slate-950 shadow-md"
                : "bg-sky-950/40 text-sky-400 border border-sky-500/30"
            }`}
          >
            🔵 Blue Paper
          </button>
          <button
            onClick={() => setActiveCategory("E-Waste")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeCategory === "E-Waste"
                ? "bg-purple-500 text-white shadow-md"
                : "bg-purple-950/40 text-purple-300 border border-purple-500/30"
            }`}
          >
            🟣 Special E-Waste
          </button>
          <button
            onClick={() => setActiveCategory("Hazardous")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeCategory === "Hazardous"
                ? "bg-rose-500 text-white shadow-md"
                : "bg-rose-950/40 text-rose-400 border border-rose-500/30"
            }`}
          >
            🔴 Red Hazardous
          </button>
        </div>
      </div>

      {/* Grid of Bins */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredBins.map((bin) => (
          <div
            key={bin.category}
            className={`p-6 sm:p-8 rounded-3xl border ${bin.bgTailwind} ${bin.borderTailwind} shadow-xl space-y-5 transition-transform hover:scale-[1.01]`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div
                  className="w-5 h-5 rounded-full ring-4 ring-white/10 shadow-lg"
                  style={{ backgroundColor: bin.colorHex }}
                />
                <h3 className={`font-extrabold text-lg sm:text-xl ${bin.textTailwind}`}>
                  {bin.binName}
                </h3>
              </div>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              {bin.description}
            </p>

            {/* Examples List */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Common Items for This Bin:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {bin.examples.map((ex, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg bg-slate-950/60 border border-slate-800 text-xs text-slate-200 font-medium"
                  >
                    {ex}
                  </span>
                ))}
              </div>
            </div>

            {/* Sorting Rules */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Sorting & Handling Rules:
              </span>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {bin.sortingRules.map((rule, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-cyan-400 font-bold">•</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
