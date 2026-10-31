"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  Camera,
  Bot,
  Recycle,
  Leaf,
  Clock,
  Award,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  Shield,
  Activity,
} from "lucide-react";
import { ActivityRecord, UserEcoStats } from "@/lib/clerkActivity";

interface UserActivityTimelineProps {
  initialEcoStats?: UserEcoStats | null;
  initialActivities?: ActivityRecord[];
}

export default function UserActivityTimeline({
  initialEcoStats,
  initialActivities = [],
}: UserActivityTimelineProps) {
  const [stats, setStats] = useState<UserEcoStats>(
    initialEcoStats || {
      totalScans: 0,
      ecoPoints: 0,
      totalCo2SavedKg: 0,
      agentChats: 0,
      level: "Eco Beginner 🐣 (Level 1)",
      lastActive: "Active Now",
    }
  );
  const [activities, setActivities] = useState<ActivityRecord[]>(initialActivities);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // 1. Read local scans from browser storage (for offline or pre-sync scans)
    let localScans: any[] = [];
    try {
      const saved = localStorage.getItem("ecosort_scan_history");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          localScans = parsed;
          // If initial stats are empty, seed immediately from local storage
          setStats((prev) => {
            if (prev.totalScans === 0 && localScans.length > 0) {
              const co2 = +(localScans.length * 0.45).toFixed(2);
              const points = localScans.length * 50;
              return {
                ...prev,
                totalScans: localScans.length,
                ecoPoints: points,
                totalCo2SavedKg: co2,
                level:
                  points >= 500
                    ? "Zero-Waste Hero 🛡️ (Level 4)"
                    : points >= 250
                    ? "Master Recycler 🌿 (Level 3)"
                    : points >= 100
                    ? "Eco Enthusiast 🌱 (Level 2)"
                    : "Eco Beginner 🐣 (Level 1)",
              };
            }
            return prev;
          });
        }
      }
    } catch (e) {
      console.warn("Could not read local scan history:", e);
    }

    // 2. Sync with Clerk backend & fetch authoritative cloud stats
    setIsLoading(true);

    const syncPromise =
      localScans.length > 0
        ? fetch("/api/user/sync", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ batchScans: localScans }),
          })
        : fetch("/api/user/sync");

    syncPromise
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          if (data.ecoStats && (data.ecoStats.totalScans > 0 || localScans.length === 0)) {
            setStats(data.ecoStats);
          }
          if (Array.isArray(data.activities) && data.activities.length > 0) {
            setActivities(data.activities);
          } else if (localScans.length > 0) {
            // Fallback: generate activities from local scans if activities array is empty
            const generated = localScans.map((s, idx) => ({
              id: s.id || `act-local-${idx}`,
              type: "scan" as const,
              title: `Scanned ${s.itemName || "Waste Item"}`,
              category: s.category || "General",
              binColor: s.binColor || "blue",
              points: 50,
              timestamp: s.createdAt || new Date().toISOString(),
              co2Saved: s.co2SavedPerKg || "0.5 kg CO₂",
              note: s.preparationAction || "Classified with Google Gemini AI",
            }));
            setActivities(generated);
          }
        }
      })
      .catch((err) => console.warn("Failed to load user activities from Clerk:", err))
      .finally(() => setIsLoading(false));
  }, []);

  const getBinColorBadge = (color?: string) => {
    const c = (color || "blue").toLowerCase();
    if (c === "green") return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
    if (c === "yellow") return "bg-amber-500/10 text-amber-300 border-amber-500/30";
    if (c === "red") return "bg-rose-500/10 text-rose-400 border-rose-500/30";
    if (c === "purple") return "bg-purple-500/10 text-purple-400 border-purple-500/30";
    return "bg-blue-500/10 text-blue-400 border-blue-500/30";
  };

  return (
    <div className="space-y-6">
      {/* 4 Stat Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat 1: Total Scans */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl relative overflow-hidden group hover:border-emerald-500/40 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Total Scans
            </span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Camera className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">
            {stats.totalScans}
          </div>
          <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-emerald-400" />
            <span>AI Visual Classifications</span>
          </p>
        </div>

        {/* Stat 2: EcoPoints */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl relative overflow-hidden group hover:border-cyan-500/40 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              EcoPoints
            </span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-cyan-300">
            {stats.ecoPoints} <span className="text-sm font-bold text-slate-400">pts</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-cyan-400" />
            <span>+50 pts per verified scan</span>
          </p>
        </div>

        {/* Stat 3: CO2 Saved */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl relative overflow-hidden group hover:border-teal-500/40 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              CO₂ Avoided
            </span>
            <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
              <Leaf className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-teal-300">
            {stats.totalCo2SavedKg} <span className="text-sm font-bold text-slate-400">kg</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Cumulative landfill diversion
          </p>
        </div>

        {/* Stat 4: Eco Rank */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl relative overflow-hidden group hover:border-amber-500/40 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Eco Level
            </span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Shield className="w-4 h-4" />
            </div>
          </div>
          <div className="text-sm sm:text-base font-bold text-amber-200 truncate">
            {stats.level}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Clerk Cloud Synchronized
          </p>
        </div>
      </div>

      {/* Real Activity Timeline Log */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              <Activity className="w-3.5 h-3.5" />
              <span>Real-Time Activity Feed</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              User Activity &amp; Scan History
            </h3>
            <p className="text-xs text-slate-400">
              All scans, classifications, and AI inquiries are synced to your Clerk user account in real time.
            </p>
          </div>

          <Link
            href="/ecosort"
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-bold text-xs transition shadow-md self-start sm:self-auto"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Scan New Item</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Activity List */}
        {activities.length > 0 ? (
          <div className="divide-y divide-white/5 space-y-3">
            {activities.map((act) => (
              <div
                key={act.id}
                className="pt-3 first:pt-0 flex items-start justify-between gap-4 group"
              >
                <div className="flex items-start space-x-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 border ${
                      act.type === "scan"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
                    }`}
                  >
                    {act.type === "scan" ? (
                      <Recycle className="w-4 h-4" />
                    ) : (
                      <Bot className="w-4 h-4" />
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 flex-wrap">
                      <h4 className="text-sm font-semibold text-white group-hover:text-emerald-300 transition">
                        {act.title}
                      </h4>
                      {act.category && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 font-medium">
                          {act.category}
                        </span>
                      )}
                      {act.binColor && (
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full border font-mono uppercase ${getBinColorBadge(
                            act.binColor
                          )}`}
                        >
                          {act.binColor} Bin
                        </span>
                      )}
                    </div>
                    {act.note && (
                      <p className="text-xs text-slate-400 line-clamp-1">{act.note}</p>
                    )}
                    <div className="flex items-center space-x-2 text-[11px] text-slate-500">
                      <Clock className="w-3 h-3" />
                      <span>{new Date(act.timestamp).toLocaleString()}</span>
                      {act.co2Saved && (
                        <>
                          <span>•</span>
                          <span className="text-emerald-400 font-medium">
                            Saved {act.co2Saved}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
                    +{act.points} pts
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto text-emerald-400">
              <Recycle className="w-7 h-7 animate-pulse" />
            </div>
            <div className="space-y-1 max-w-sm mx-auto">
              <h4 className="text-base font-bold text-white">No Activity Logged Yet</h4>
              <p className="text-xs text-slate-400">
                Start by scanning your first plastic bottle, aluminum can, or food item to begin earning EcoPoints and saving carbon!
              </p>
            </div>
            <Link
              href="/ecosort"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg transition"
            >
              <Camera className="w-4 h-4" />
              <span>Launch AI Camera Scanner</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

