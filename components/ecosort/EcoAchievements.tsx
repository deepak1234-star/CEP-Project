"use client";

import { useState, useEffect } from "react";
import { ECO_BADGES_LIST, playSound } from "@/lib/wasteDatabase";
import { ClassificationResult, EcoBadge } from "@/types/ecosort";
import {
  Trophy,
  Award,
  Sparkles,
  CheckCircle2,
  Lock,
  Flame,
  Star,
  Zap,
  ArrowRight,
  Share2,
} from "lucide-react";

interface EcoAchievementsProps {
  scanHistory: ClassificationResult[];
  quizCompleted?: boolean;
}

export default function EcoAchievements({
  scanHistory,
  quizCompleted = false,
}: EcoAchievementsProps) {
  const [unlockedBadges, setUnlockedBadges] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  // Evaluate unlocked badges based on actual scan history & user actions
  useEffect(() => {
    const unlocked: string[] = [];
    const scanCount = scanHistory.length;

    // First scan
    if (scanCount >= 1) unlocked.push("first_scan");
    // 5+ scans
    if (scanCount >= 5) unlocked.push("scanner_pro");
    // 10+ scans
    if (scanCount >= 10) unlocked.push("eco_champion");

    // Category specific
    const hasEwaste = scanHistory.some(
      (item) => item.category === "E-Waste" || item.category === "Hazardous"
    );
    if (hasEwaste) unlocked.push("ewaste_guardian");

    const compostCount = scanHistory.filter(
      (item) => item.category === "Organic"
    ).length;
    if (compostCount >= 2) unlocked.push("compost_master");

    const plasticCount = scanHistory.filter(
      (item) => item.category === "Plastic"
    ).length;
    if (plasticCount >= 3) unlocked.push("plastic_patrol");

    // Quiz completed
    if (quizCompleted) unlocked.push("quiz_champ");

    setUnlockedBadges(unlocked);
  }, [scanHistory, quizCompleted]);

  // Points calculation
  const scanPoints = scanHistory.length * 15;
  const badgePoints = unlockedBadges.length * 50;
  const totalEcoPoints = scanPoints + badgePoints;

  const getRankTitle = (points: number) => {
    if (points >= 300) return { title: "🌟 Zero-Waste Champion", level: 4, next: 500 };
    if (points >= 150) return { title: "🌿 Sustainability Master", level: 3, next: 300 };
    if (points >= 50) return { title: "🛡️ Green Guardian", level: 2, next: 150 };
    return { title: "🌱 Eco Apprentice", level: 1, next: 50 };
  };

  const currentRank = getRankTitle(totalEcoPoints);
  const progressPercent = Math.min(
    100,
    Math.round((totalEcoPoints / currentRank.next) * 100)
  );

  const handleShareAchievements = () => {
    playSound("click");
    const shareText = `🏆 My EcoSort AI Status:
Rank: ${currentRank.title}
Eco Points: ${totalEcoPoints} pts
Badges Unlocked: ${unlockedBadges.length}/${ECO_BADGES_LIST.length}
Items Classified: ${scanHistory.length}
Protecting the planet one scan at a time! ♻️`;

    navigator.clipboard.writeText(shareText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Banner: Rank & Points Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/80 border border-emerald-500/30 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <Trophy className="w-3.5 h-3.5" />
              <span>Eco Impact Level {currentRank.level}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {currentRank.title}
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              Earn Eco Points by classifying waste items, taking the quiz, and sorting responsibly.
            </p>
          </div>

          <div className="flex items-center space-x-4 self-start sm:self-center">
            <div className="text-right">
              <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                Total Eco Points
              </span>
              <p className="text-3xl sm:text-4xl font-black text-emerald-400">
                {totalEcoPoints} <span className="text-sm font-semibold text-emerald-500">pts</span>
              </p>
            </div>

            <button
              onClick={handleShareAchievements}
              className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center space-x-2 shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
            >
              <Share2 className="w-4 h-4" />
              <span>{copied ? "Copied!" : "Share Status"}</span>
            </button>
          </div>
        </div>

        {/* Progress Bar to Next Level */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 space-y-2 relative z-10">
          <div className="flex justify-between text-xs text-slate-300">
            <span>Next Rank: {currentRank.next} pts</span>
            <span className="font-bold text-emerald-400">{progressPercent}%</span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white flex items-center space-x-2">
              <Award className="w-5 h-5 text-amber-400" />
              <span>Eco Achievements Badges</span>
            </h3>
            <p className="text-xs text-slate-400">
              Unlocked {unlockedBadges.length} of {ECO_BADGES_LIST.length} badges
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ECO_BADGES_LIST.map((badge) => {
            const isUnlocked = unlockedBadges.includes(badge.id);

            return (
              <div
                key={badge.id}
                className={`p-5 rounded-2xl border transition-all duration-200 relative overflow-hidden flex flex-col justify-between ${
                  isUnlocked
                    ? "bg-slate-900/90 border-emerald-500/40 shadow-xl shadow-emerald-500/5 ring-1 ring-emerald-500/20"
                    : "bg-slate-900/40 border-slate-800/60 opacity-60 hover:opacity-80"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl select-none">{badge.icon}</span>
                    {isUnlocked ? (
                      <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>UNLOCKED</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 text-[10px] font-medium">
                        <Lock className="w-3 h-3" />
                        <span>LOCKED</span>
                      </span>
                    )}
                  </div>

                  <div>
                    <h4 className="font-bold text-white text-sm">{badge.title}</h4>
                    <p className="text-xs text-slate-400 pt-1 leading-snug">
                      {badge.description}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                  <span>+50 Eco Pts</span>
                  <span className={isUnlocked ? "text-emerald-400 font-bold" : "text-slate-500"}>
                    {isUnlocked ? "Completed" : `Req: ${badge.requiredCount}`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
