"use client";

import { useState, useEffect } from "react";
import WasteScanner from "@/components/ecosort/WasteScanner";
import AnalysisResultCard from "@/components/ecosort/AnalysisResultCard";
import SmartBinGuide from "@/components/ecosort/SmartBinGuide";
import EcoStats from "@/components/ecosort/EcoStats";
import EcoQuiz from "@/components/ecosort/EcoQuiz";
import ResinCodeGuide from "@/components/ecosort/ResinCodeGuide";
import EcoAchievements from "@/components/ecosort/EcoAchievements";
import ScanHistoryDrawer from "@/components/ecosort/ScanHistoryDrawer";
import { ClassificationResult } from "@/types/ecosort";
import { playSound } from "@/lib/wasteDatabase";
import {
  Sparkles,
  Trash2,
  BookOpen,
  Leaf,
  HelpCircle,
  History,
  Award,
  Layers,
  ArrowRight,
} from "lucide-react";

export default function EcoSortPage() {
  const [activeTab, setActiveTab] = useState<
    "scanner" | "resin" | "history" | "binGuide" | "achievements" | "quiz"
  >("scanner");
  const [currentResult, setCurrentResult] = useState<ClassificationResult | null>(null);
  const [scanHistory, setScanHistory] = useState<ClassificationResult[]>([]);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);

  // Load persistent scan history from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("ecosort_scan_history");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setScanHistory(parsed);
          if (parsed.length > 0) {
            setCurrentResult(parsed[0]);
          }
        }
      }
    } catch (e) {
      console.warn("Failed to load local scan history:", e);
    }
  }, []);

  // Save scan history to localStorage
  const saveScanHistory = (newList: ClassificationResult[]) => {
    setScanHistory(newList);
    try {
      localStorage.setItem("ecosort_scan_history", JSON.stringify(newList));
    } catch (e) {
      console.warn("Failed to persist scan history:", e);
    }
  };

  const handleScanResult = (result: ClassificationResult) => {
    setCurrentResult(result);
    const updated = [result, ...scanHistory.filter((i) => i.id !== result.id)].slice(0, 50);
    saveScanHistory(updated);
  };

  const handleClearHistory = () => {
    saveScanHistory([]);
    setCurrentResult(null);
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
          Classify Waste & Protect The Planet with <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Artificial Intelligence
          </span>
        </h1>

        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Use live webcam capture, photo upload, or keyword inquiry to get instant neural material detection, resin code identification, bin destination & step-by-step recycling instructions.
        </p>
      </div>

      {/* Global Impact & Stats Counter Bar */}
      <EcoStats scanCount={scanHistory.length} />

      {/* Main Tab Navigation */}
      <div className="flex justify-center">
        <div className="flex flex-wrap justify-center gap-2 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => {
              playSound("click");
              setActiveTab("scanner");
            }}
            className={`inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === "scanner"
                ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>AI Scanner</span>
          </button>

          <button
            onClick={() => {
              playSound("click");
              setActiveTab("resin");
            }}
            className={`inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === "resin"
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Resin Codes (#1-7)</span>
          </button>

          <button
            onClick={() => {
              playSound("click");
              setActiveTab("history");
            }}
            className={`inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all relative ${
              activeTab === "history"
                ? "bg-gradient-to-r from-teal-500 to-emerald-600 text-white shadow-lg shadow-teal-500/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <History className="w-4 h-4" />
            <span>History</span>
            {scanHistory.length > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full bg-slate-800 text-[10px] text-cyan-300 border border-cyan-500/30 font-mono">
                {scanHistory.length}
              </span>
            )}
          </button>

          <button
            onClick={() => {
              playSound("click");
              setActiveTab("binGuide");
            }}
            className={`inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === "binGuide"
                ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Bin Guide</span>
          </button>

          <button
            onClick={() => {
              playSound("click");
              setActiveTab("achievements");
            }}
            className={`inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === "achievements"
                ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Eco Badges</span>
          </button>

          <button
            onClick={() => {
              playSound("click");
              setActiveTab("quiz");
            }}
            className={`inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === "quiz"
                ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Quiz</span>
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "scanner" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Waste Scanner Uploader & Webcam */}
          <div className="lg:col-span-6 space-y-6">
            <WasteScanner onScanResult={handleScanResult} />
          </div>

          {/* Right Column: AI Result Output */}
          <div className="lg:col-span-6 space-y-6">
            {currentResult ? (
              <AnalysisResultCard
                result={currentResult}
                onViewResinGuide={() => setActiveTab("resin")}
              />
            ) : (
              <div className="h-full min-h-[400px] p-8 rounded-3xl bg-slate-900/40 border border-slate-800/80 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <Trash2 className="w-8 h-8" />
                </div>
                <div className="space-y-1 max-w-sm">
                  <h3 className="font-bold text-white text-lg">No Item Scanned Yet</h3>
                  <p className="text-slate-400 text-xs sm:text-sm">
                    Turn on the live webcam, drop a photo, or choose an instant AI preset on the left to see category, bin color, resin code & voice disposal guide.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "resin" && <ResinCodeGuide />}

      {activeTab === "history" && (
        <div className="max-w-4xl mx-auto">
          <ScanHistoryDrawer
            scanHistory={scanHistory}
            onSelectResult={(item) => {
              setCurrentResult(item);
              setActiveTab("scanner");
            }}
            onClearHistory={handleClearHistory}
          />
        </div>
      )}

      {activeTab === "binGuide" && <SmartBinGuide />}

      {activeTab === "achievements" && (
        <div className="max-w-5xl mx-auto">
          <EcoAchievements
            scanHistory={scanHistory}
            quizCompleted={quizCompleted}
          />
        </div>
      )}

      {activeTab === "quiz" && (
        <div className="max-w-2xl mx-auto">
          <EcoQuiz onQuizComplete={() => setQuizCompleted(true)} />
        </div>
      )}
    </div>
  );
}
