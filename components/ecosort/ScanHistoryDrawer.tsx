"use client";

import { useState } from "react";
import { ClassificationResult, WasteCategory } from "@/types/ecosort";
import { playSound } from "@/lib/wasteDatabase";
import {
  History,
  Trash2,
  Download,
  Filter,
  ArrowRight,
  Sparkles,
  Clock,
  CheckCircle2,
} from "lucide-react";

interface ScanHistoryDrawerProps {
  scanHistory: ClassificationResult[];
  onSelectResult: (result: ClassificationResult) => void;
  onClearHistory: () => void;
}

export default function ScanHistoryDrawer({
  scanHistory,
  onSelectResult,
  onClearHistory,
}: ScanHistoryDrawerProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories: string[] = [
    "All",
    "Plastic",
    "Organic",
    "Paper",
    "Metal",
    "Glass",
    "E-Waste",
    "Hazardous",
  ];

  const filteredHistory = scanHistory.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
  });

  const handleExportCSV = () => {
    playSound("click");
    if (scanHistory.length === 0) return;

    const headers = [
      "Timestamp",
      "Item Name",
      "Category",
      "Bin Type",
      "Confidence (%)",
      "Recyclability",
      "Decomposition Time",
      "CO2 Saved",
    ];

    const rows = scanHistory.map((item) => [
      item.createdAt,
      `"${item.itemName.replace(/"/g, '""')}"`,
      item.category,
      `"${item.binType.replace(/"/g, '""')}"`,
      item.confidence,
      item.recyclabilityRating || "High",
      item.decompositionTime || "N/A",
      item.co2SavedPerKg || "1.0 kg",
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `EcoSort_Scan_Report_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getBadgeStyle = (category: string) => {
    switch (category) {
      case "Organic":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
      case "Paper":
        return "bg-sky-500/10 text-sky-400 border-sky-500/30";
      case "Plastic":
        return "bg-amber-500/10 text-amber-400 border-amber-500/30";
      case "Metal":
        return "bg-blue-500/10 text-blue-400 border-blue-500/30";
      case "Glass":
        return "bg-purple-500/10 text-purple-400 border-purple-500/30";
      case "E-Waste":
        return "bg-purple-900/40 text-purple-300 border-purple-500/50";
      case "Hazardous":
        return "bg-rose-500/10 text-rose-400 border-rose-500/30";
      default:
        return "bg-cyan-500/10 text-cyan-400 border-cyan-500/30";
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-white flex items-center space-x-2">
            <History className="w-5 h-5 text-cyan-400" />
            <span>Recent Scans History</span>
          </h3>
          <p className="text-xs text-slate-400">
            {scanHistory.length} total items classified across your sessions
          </p>
        </div>

        {scanHistory.length > 0 && (
          <div className="flex items-center space-x-2">
            <button
              onClick={handleExportCSV}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold border border-slate-700 transition-all"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={() => {
                if (confirm("Clear all scanned item history?")) {
                  playSound("click");
                  onClearHistory();
                }
              }}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-rose-950/50 hover:text-rose-400 text-slate-400 text-xs font-semibold border border-slate-700 hover:border-rose-800 transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          </div>
        )}
      </div>

      {/* Category Pills Filter */}
      {scanHistory.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                playSound("click");
                setSelectedCategory(cat);
              }}
              className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? "bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20"
                  : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Items List */}
      {filteredHistory.length > 0 ? (
        <div className="space-y-3">
          {filteredHistory.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                playSound("click");
                onSelectResult(item);
              }}
              className="group cursor-pointer p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-cyan-500/40 shadow-lg transition-all flex items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span
                    className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-md border ${getBadgeStyle(
                      item.category
                    )}`}
                  >
                    {item.category}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">
                    {item.confidence}% Match
                  </span>
                </div>
                <h4 className="font-bold text-white text-sm group-hover:text-cyan-400 transition-colors">
                  {item.itemName}
                </h4>
                <p className="text-xs text-slate-400 truncate max-w-sm sm:max-w-md">
                  {item.binType}
                </p>
              </div>

              <div className="flex items-center space-x-3 text-right flex-shrink-0">
                <div className="hidden sm:block text-xs text-slate-400">
                  <p className="text-emerald-400 font-semibold">{item.co2SavedPerKg || "1.0 kg CO₂"}</p>
                  <p className="text-[11px] text-slate-500">
                    {new Date(item.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <div className="p-2 rounded-xl bg-slate-800 text-slate-400 group-hover:text-cyan-400 group-hover:bg-slate-700 transition-all">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-10 rounded-2xl bg-slate-900/40 border border-slate-800/80 text-center space-y-3">
          <Clock className="w-8 h-8 text-slate-600 mx-auto" />
          <p className="text-sm font-semibold text-slate-300">
            {scanHistory.length === 0
              ? "No scan history recorded yet."
              : `No items classified under ${selectedCategory}.`}
          </p>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            Scan waste items or choose an instant preset to build your recycling log.
          </p>
        </div>
      )}
    </div>
  );
}
