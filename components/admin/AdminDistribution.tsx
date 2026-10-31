"use client";

import React from "react";
import { PieChart, Trash2, Layers } from "lucide-react";

interface Props {
  categoryBreakdown: Record<string, number>;
  binColorBreakdown: Record<string, number>;
}

export default function AdminDistribution({ categoryBreakdown, binColorBreakdown }: Props) {
  const totalCategoryScans = Object.values(categoryBreakdown).reduce((a, b) => a + b, 0) || 1;
  const totalBinScans = Object.values(binColorBreakdown).reduce((a, b) => a + b, 0) || 1;

  const binMetadata: Record<string, { label: string; bg: string; border: string; text: string }> = {
    green: {
      label: "Green (Compost / Organics)",
      bg: "bg-emerald-500",
      border: "border-emerald-500/40",
      text: "text-emerald-400",
    },
    blue: {
      label: "Blue (Paper / Dry Recyclables)",
      bg: "bg-blue-500",
      border: "border-blue-500/40",
      text: "text-blue-400",
    },
    yellow: {
      label: "Yellow (Plastics & Light Metals)",
      bg: "bg-amber-400",
      border: "border-amber-500/40",
      text: "text-amber-300",
    },
    purple: {
      label: "Purple (Glass & Bottles)",
      bg: "bg-purple-500",
      border: "border-purple-500/40",
      text: "text-purple-400",
    },
    red: {
      label: "Red (E-Waste & Hazardous)",
      bg: "bg-rose-500",
      border: "border-rose-500/40",
      text: "text-rose-400",
    },
  };

  const categories = Object.entries(categoryBreakdown).sort((a, b) => b[1] - a[1]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Category Breakdown */}
      <div className="rounded-2xl bg-slate-900/80 border border-white/10 p-5 shadow-xl">
        <div className="flex items-center space-x-2 text-white font-bold text-sm mb-4">
          <Layers className="w-4 h-4 text-emerald-400" />
          <span>Waste Classification by Material</span>
        </div>

        {categories.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-500">
            No waste items scanned yet. Scans will populate material proportions here automatically.
          </div>
        ) : (
          <div className="space-y-3">
            {categories.map(([category, count]) => {
              const percentage = Math.round((count / totalCategoryScans) * 100);
              return (
                <div key={category} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-medium capitalize">{category}</span>
                    <span className="text-slate-400 font-mono">
                      {count} items ({percentage}%)
                    </span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(percentage, 4)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Bin Color Breakdown */}
      <div className="rounded-2xl bg-slate-900/80 border border-white/10 p-5 shadow-xl">
        <div className="flex items-center space-x-2 text-white font-bold text-sm mb-4">
          <Trash2 className="w-4 h-4 text-cyan-400" />
          <span>Municipal Bin Routing Distribution</span>
        </div>

        <div className="space-y-3">
          {["green", "blue", "yellow", "purple", "red"].map((binKey) => {
            const count = binColorBreakdown[binKey] || 0;
            const percentage = totalBinScans > 0 ? Math.round((count / totalBinScans) * 100) : 0;
            const meta = binMetadata[binKey];

            return (
              <div key={binKey} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className={`${meta.text} font-medium flex items-center space-x-1.5`}>
                    <span className={`w-2 h-2 rounded-full ${meta.bg}`} />
                    <span>{meta.label}</span>
                  </span>
                  <span className="text-slate-400 font-mono">
                    {count} ({percentage}%)
                  </span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${meta.bg} rounded-full transition-all duration-500`}
                    style={{ width: `${Math.max(percentage, count > 0 ? 4 : 0)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

