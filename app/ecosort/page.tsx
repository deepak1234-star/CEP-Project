"use client";

import { useState } from "react";
import WasteScanner from "@/components/ecosort/WasteScanner";
import AnalysisResultCard from "@/components/ecosort/AnalysisResultCard";
import SmartBinGuide from "@/components/ecosort/SmartBinGuide";
import EcoStats from "@/components/ecosort/EcoStats";
import EcoQuiz from "@/components/ecosort/EcoQuiz";
import { ClassificationResult } from "@/types/ecosort";
import { Sparkles, Trash2, BookOpen, Leaf, HelpCircle } from "lucide-react";

export default function EcoSortPage() {
  const [activeTab, setActiveTab] = useState<"scanner" | "binGuide" | "quiz">("scanner");
  const [currentResult, setCurrentResult] = useState<ClassificationResult | null>(null);
  const [scanHistory, setScanHistory] = useState<ClassificationResult[]>([]);

  const handleScanResult = (result: ClassificationResult) => {
    setCurrentResult(result);
    setScanHistory((prev) => [result, ...prev]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Top Banner Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs sm:text-sm font-semibold">
          <Leaf className="w-4 h-4 text-emerald-400" />
          <span>♻️ EcoSort AI Waste Classification System</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Classify Waste & Protect The Environment with <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Artificial Intelligence
          </span>
        </h1>

        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Upload a photograph or search any item to get instant AI category classification, confidence score, bin destination & recycling action guide.
        </p>
      </div>

      {/* Stats Counter Bar */}
      <EcoStats scanCount={scanHistory.length} />

      {/* Main Tab Navigation */}
      <div className="flex justify-center border-b border-slate-800">
        <div className="flex flex-wrap justify-center gap-2 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActiveTab("scanner")}
            className={`inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === "scanner"
                ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>AI Waste Scanner</span>
          </button>

          <button
            onClick={() => setActiveTab("binGuide")}
            className={`inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === "binGuide"
                ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Smart Bin Color Guide</span>
          </button>

          <button
            onClick={() => setActiveTab("quiz")}
            className={`inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === "quiz"
                ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Recycling Quiz</span>
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "scanner" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Waste Scanner Uploader */}
          <div className="lg:col-span-6 space-y-6">
            <WasteScanner onScanResult={handleScanResult} />
          </div>

          {/* Right Column: AI Result Output */}
          <div className="lg:col-span-6 space-y-6">
            {currentResult ? (
              <AnalysisResultCard result={currentResult} />
            ) : (
              <div className="h-full min-h-[400px] p-8 rounded-3xl bg-slate-900/40 border border-slate-800/80 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <Trash2 className="w-8 h-8" />
                </div>
                <div className="space-y-1 max-w-sm">
                  <h3 className="font-bold text-white text-lg">No Item Scanned Yet</h3>
                  <p className="text-slate-400 text-xs sm:text-sm">
                    Search an item name, upload a photo, or pick an instant AI preset on the left to view category, bin type, confidence score & recycling action guide.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "binGuide" && <SmartBinGuide />}

      {activeTab === "quiz" && (
        <div className="max-w-2xl mx-auto">
          <EcoQuiz />
        </div>
      )}
    </div>
  );
}
