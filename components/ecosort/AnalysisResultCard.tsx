"use client";

import { useState, useEffect } from "react";
import { ClassificationResult } from "@/types/ecosort";
import {
  CheckCircle2,
  XCircle,
  Trash2,
  Sparkles,
  Info,
  Clock,
  Leaf,
  AlertCircle,
  Volume2,
  VolumeX,
  Copy,
  Check,
  Share2,
  ExternalLink,
} from "lucide-react";
import { playSound } from "@/lib/wasteDatabase";

interface AnalysisResultCardProps {
  result: ClassificationResult;
  onViewResinGuide?: () => void;
}

export default function AnalysisResultCard({
  result,
  onViewResinGuide,
}: AnalysisResultCardProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copied, setCopied] = useState(false);

  // Stop speech when component unmounts or result changes
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [result]);

  const handleVoiceReadout = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      alert("Text-to-speech is not supported on this browser.");
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    playSound("chime");

    const textToSpeak = `Classification result for ${result.itemName}. Recommended bin: ${result.binType}. Action: ${result.preparationAction}. ${result.explanation}`;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleCopySummary = () => {
    playSound("click");
    const summaryText = `♻️ EcoSort AI Result:
Item: ${result.itemName} (${result.category})
Bin Destination: ${result.binType}
Action: ${result.preparationAction}
Landfill Lifespan: ${result.decompositionTime || "N/A"}
CO2 Offset: ${result.co2SavedPerKg || "N/A"}
Recyclability: ${result.recyclabilityRating || "High"}
Source: EcoSort AI Waste Assistant`;

    navigator.clipboard.writeText(summaryText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

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

  const getResinSymbol = (code?: number) => {
    switch (code) {
      case 1: return "♳";
      case 2: return "♴";
      case 3: return "♵";
      case 4: return "♶";
      case 5: return "♷";
      case 6: return "♸";
      case 7: return "♹";
      default: return "♻️";
    }
  };

  return (
    <div className="rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6 backdrop-blur-xl animate-fade-in-up relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Camera capture tip banner */}
      {result.classificationNote && (
        <div className="flex items-start space-x-2.5 px-4 py-3 rounded-xl bg-sky-950/40 border border-sky-500/30 text-sky-300 text-xs">
          <Info className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
          <span>{result.classificationNote}</span>
        </div>
      )}

      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800 relative z-10">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
              AI Classification Result
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {result.itemName}
          </h2>
          {/* Confidence progress bar */}
          <div className="flex items-center space-x-3 pt-1">
            <div className="flex-1 h-1.5 rounded-full bg-slate-800 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  result.confidence >= 85
                    ? "bg-gradient-to-r from-emerald-500 to-green-400"
                    : result.confidence >= 65
                    ? "bg-gradient-to-r from-amber-500 to-yellow-400"
                    : "bg-gradient-to-r from-rose-500 to-red-400"
                }`}
                style={{ width: `${result.confidence}%` }}
              />
            </div>
            <span
              className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full border ${
                result.confidence >= 85
                  ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400"
                  : result.confidence >= 65
                  ? "bg-amber-500/15 border-amber-500/30 text-amber-400"
                  : "bg-rose-500/15 border-rose-500/30 text-rose-400"
              }`}
            >
              {result.confidence}% match
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Voice Assistant Button */}
          <button
            onClick={handleVoiceReadout}
            title={isSpeaking ? "Stop Voice Guide" : "Listen to Disposal Guide"}
            className={`inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              isSpeaking
                ? "bg-rose-500 text-white animate-pulse"
                : "bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700"
            }`}
          >
            {isSpeaking ? (
              <>
                <VolumeX className="w-4 h-4" />
                <span>Stop</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-cyan-400" />
                <span>Voice Guide</span>
              </>
            )}
          </button>

          {/* Copy Summary Button */}
          <button
            onClick={handleCopySummary}
            title="Copy Disposal Summary"
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700 transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>

          {/* Category Badge */}
          <span
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold border ${getCategoryBadgeColor(
              result.category
            )}`}
          >
            {result.category}
          </span>
        </div>
      </div>

      {/* Resin Code Callout (if available) */}
      {result.resinCode && (
        <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 flex items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <span className="text-3xl select-none">{getResinSymbol(result.resinCode)}</span>
            <div>
              <p className="text-xs font-bold text-cyan-400 uppercase tracking-wide">
                Plastic Resin Code #{result.resinCode} Identified
              </p>
              <p className="text-xs text-slate-300">
                {result.resinName || `Resin Identification Code #${result.resinCode}`}
              </p>
            </div>
          </div>
          {onViewResinGuide && (
            <button
              onClick={onViewResinGuide}
              className="inline-flex items-center space-x-1 text-xs font-bold text-cyan-400 hover:text-cyan-300 underline underline-offset-2 flex-shrink-0"
            >
              <span>Resin Guide</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          )}
        </div>
      )}

      {/* Metrics Row: Decomposition Time, CO2 Saved, Rating */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-center space-y-1">
          <div className="flex items-center justify-center space-x-1 text-slate-400 text-xs font-medium">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>Landfill Time</span>
          </div>
          <p className="text-xs sm:text-sm font-bold text-white">
            {result.decompositionTime || "Variable"}
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-center space-y-1">
          <div className="flex items-center justify-center space-x-1 text-slate-400 text-xs font-medium">
            <Leaf className="w-3.5 h-3.5 text-emerald-400" />
            <span>CO₂ Saved</span>
          </div>
          <p className="text-xs sm:text-sm font-bold text-emerald-400">
            {result.co2SavedPerKg || "1.0 kg"}
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-center space-y-1">
          <div className="flex items-center justify-center space-x-1 text-slate-400 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Recyclability</span>
          </div>
          <p className="text-xs sm:text-sm font-bold text-amber-400">
            {result.recyclabilityRating || "High"}
          </p>
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
            <strong className="font-semibold text-amber-300">Common Recycling Pitfall: </strong>
            <span>{result.commonMistake}</span>
          </div>
        </div>
      )}

      {/* DOs and DON'Ts Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* DOs */}
        <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 space-y-3">
          <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
            <CheckCircle2 className="w-4 h-4" />
            <span>DO</span>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
            {result.dos.map((item, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* DONTs */}
        <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/20 space-y-3">
          <div className="flex items-center space-x-2 text-rose-400 font-bold text-sm">
            <XCircle className="w-4 h-4" />
            <span>DON&apos;T</span>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
            {result.donts.map((item, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="text-rose-400 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Educational Explanation */}
      <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-1">
        <div className="flex items-center space-x-2 text-xs font-semibold text-cyan-400 uppercase tracking-wide">
          <Info className="w-4 h-4" />
          <span>Why This Matters (Environmental Impact)</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {result.explanation}
        </p>
      </div>
    </div>
  );
}
