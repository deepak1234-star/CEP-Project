"use client";

import React from "react";
import { Users, Scan, Leaf, Award, Database, CheckCircle2, CloudLightning } from "lucide-react";
import { AdminMetricsOverview } from "@/lib/db/activityService";

interface Props {
  metrics: AdminMetricsOverview;
}

export default function AdminMetricCards({ metrics }: Props) {
  const cards = [
    {
      title: "Total Registered Users",
      value: metrics.totalUsers.toLocaleString(),
      subtext: "Verified Clerk community members",
      icon: Users,
      gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
      borderColor: "border-cyan-500/30",
      iconColor: "text-cyan-400",
      accentBg: "bg-cyan-500/10",
    },
    {
      title: "Total AI Waste Scans",
      value: metrics.totalScans.toLocaleString(),
      subtext: "Gemini Vision & Agent classifications",
      icon: Scan,
      gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
      borderColor: "border-emerald-500/30",
      iconColor: "text-emerald-400",
      accentBg: "bg-emerald-500/10",
    },
    {
      title: "CO₂ Diverted from Landfill",
      value: `${metrics.totalCo2SavedKg.toFixed(1)} kg`,
      subtext: "Total greenhouse emissions avoided",
      icon: Leaf,
      gradient: "from-green-500/20 via-emerald-500/10 to-transparent",
      borderColor: "border-green-500/30",
      iconColor: "text-green-400",
      accentBg: "bg-green-500/10",
    },
    {
      title: "Total EcoPoints Awarded",
      value: metrics.totalEcoPoints.toLocaleString(),
      subtext: "50 pts per scan • 15 pts per chat",
      icon: Award,
      gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
      borderColor: "border-amber-500/30",
      iconColor: "text-amber-400",
      accentBg: "bg-amber-500/10",
    },
  ];

  return (
    <div className="space-y-4">
      {/* Database Connection Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-slate-900/60 border border-white/10 text-xs">
        <div className="flex items-center space-x-2">
          <Database className="w-4 h-4 text-slate-400" />
          <span className="text-slate-300 font-medium">Database Storage Engine:</span>
          {metrics.mongoConnected ? (
            <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>MongoDB Atlas Connected &amp; Synced</span>
            </span>
          ) : (
            <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-medium">
              <CloudLightning className="w-3.5 h-3.5 text-cyan-400" />
              <span>Clerk Backend Direct Sync (Mongoose Ready)</span>
            </span>
          )}
        </div>

        <div className="text-slate-400 text-[11px]">
          <span>Role: </span>
          <span className="text-emerald-400 font-semibold uppercase tracking-wider">Super Administrator</span>
        </div>
      </div>

      {/* 4 Overview Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${card.gradient} bg-slate-900/80 border ${card.borderColor} p-5 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400">{card.title}</span>
                <div className={`p-2.5 rounded-xl ${card.accentBg} ${card.iconColor}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <div className="mt-4">
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {card.value}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">{card.subtext}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

