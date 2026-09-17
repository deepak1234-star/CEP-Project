"use client";

import { ExtendedClassificationResult } from "@/lib/wasteDatabase";
import { CheckCircle2, XCircle, Trash2, Sparkles, Info, Clock, Leaf, AlertCircle } from "lucide-react";

interface AnalysisResultCardProps {
  result: any;
}

export default function AnalysisResultCard({ result }: AnalysisResultCardProps) {
  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case "Organic":
        return "bg-emerald-500/10 border-emerald-500/30 text-emerald-400";
      case "Paper":
        return "bg-sky-500/10 border-sky-500/30 text-sky-400";
      case "Plastic":
        return "bg-amber-500/10 border-amber-500/30 text-amber-400";
      case "Metal":
        return "bg-blue-500/10 border-blue-500/30 text-blue-400";
      case "Glass":
        return "bg-purple-500/10 border-purple-500/30 text-purple-400";
      case "E-Waste":
        return "bg-purple-900/40 border-purple-500/50 text-purple-300";
      case "Hazardous":
        return "bg-rose-500/10 border-rose-500/30 text-rose-400";
      default:
        return "bg-cyan-500/10 border-cyan-500/30 text-cyan-400";
    }
  };

  return (
    <div className="rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6 animate-in fade-in duration-300">
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-xs uppercase font-bold tracking-wider text-slate-400">AI Classification Result</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 font-mono">
              Match: {result.confidence}%
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {result.itemName}
          </h2>
        </div>

        <div className="flex items-center space-x-3">
          <span className={`px-4 py-2 rounded-xl text-sm font-bold border ${getCategoryBadgeColor(result.category)}`}>
            {result.category}
          </span>
        </div>
      </div>

      {/* Metrics Row: Decomposition Time, CO2 Saved, Rating */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-center space-y-1">
          <div className="flex items-center justify-center space-x-1 text-slate-400 text-xs font-medium">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>Landfill Time</span>
          </div>
          <p className="text-xs sm:text-sm font-bold text-white">{result.decompositionTime || "Variable"}</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-center space-y-1">
          <div className="flex items-center justify-center space-x-1 text-slate-400 text-xs font-medium">
            <Leaf className="w-3.5 h-3.5 text-emerald-400" />
            <span>CO₂ Saved</span>
          </div>
          <p className="text-xs sm:text-sm font-bold text-emerald-400">{result.co2SavedPerKg || "1.0 kg"}</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-center space-y-1">
          <div className="flex items-center justify-center space-x-1 text-slate-400 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Recyclability</span>
          </div>
          <p className="text-xs sm:text-sm font-bold text-amber-400">{result.recyclabilityRating || "High"}</p>
        </div>
      </div>

      {/* Bin Destination Box */}
      <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-slate-400">
          <Trash2 className="w-4 h-4 text-cyan-400" />
          <span>Recommended Bin Destination</span>
        </div>
        <div className="text-base sm:text-lg font-bold text-white flex items-center space-x-3">
          <span className="w-3.5 h-3.5 rounded-full bg-cyan-400 animate-ping" />
          <span>{result.binType}</span>
        </div>
        <p className="text-slate-300 text-xs sm:text-sm pt-1 leading-relaxed">
          <strong>Recommended Action:</strong> {result.preparationAction}
        </p>
      </div>

      {/* Common Mistake Alert (If applicable) */}
      {result.commonMistake && (
        <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 text-amber-200 flex items-start space-x-3 text-xs sm:text-sm">
          <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-amber-400 block mb-0.5">Common Mistake to Avoid:</span>
            <span>{result.commonMistake}</span>
          </div>
        </div>
      )}

      {/* "What Should I Do?" Guidelines */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center space-x-2 text-white font-bold text-base sm:text-lg">
          <Sparkles className="w-5 h-5 text-cyan-400" />
          <h3>What Should I Do? (Action Guide)</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Do's List */}
          <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 space-y-3">
            <h4 className="text-emerald-400 font-bold text-sm flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>What You SHOULD Do (✅)</span>
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              {result.dos.map((item: string, idx: number) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Don'ts List */}
          <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/20 space-y-3">
            <h4 className="text-rose-400 font-bold text-sm flex items-center space-x-2">
              <XCircle className="w-4 h-4" />
              <span>What You SHOULD NOT Do (❌)</span>
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              {result.donts.map((item: string, idx: number) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Environmental Impact Reason */}
      <div className="p-5 rounded-2xl bg-cyan-950/20 border border-cyan-500/20 flex items-start space-x-3 text-slate-300 text-sm">
        <Info className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-white block mb-1">Why Proper Sorting Matters:</span>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{result.explanation}</p>
        </div>
      </div>
    </div>
  );
}
