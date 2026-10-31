"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  Download,
  ExternalLink,
  RefreshCw,
  Sparkles,
  Info,
  Calendar,
  User,
  CheckCircle,
  FileSpreadsheet,
} from "lucide-react";

export interface ActivityItem {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  userAvatar?: string;
  itemName: string;
  category: string;
  binType: string;
  binColor: "green" | "blue" | "yellow" | "purple" | "red";
  co2SavedKg: number;
  confidence: number;
  source: string;
  createdAt: string;
}

interface Props {
  initialActivities: ActivityItem[];
}

export default function ActivityTable({ initialActivities }: Props) {
  const [activities, setActivities] = useState<ActivityItem[]>(initialActivities);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBin, setSelectedBin] = useState("all");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<ActivityItem | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const binPillClasses: Record<string, string> = {
    green: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    blue: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    yellow: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    purple: "bg-purple-500/15 text-purple-400 border-purple-500/30",
    red: "bg-rose-500/15 text-rose-400 border-rose-500/30",
  };

  // Filter activities
  const filteredActivities = useMemo(() => {
    return activities.filter((act) => {
      const matchesCategory =
        selectedCategory === "all" ||
        act.category.toLowerCase() === selectedCategory.toLowerCase();

      const matchesBin =
        selectedBin === "all" || act.binColor.toLowerCase() === selectedBin.toLowerCase();

      const query = search.trim().toLowerCase();
      const matchesSearch =
        !query ||
        act.itemName.toLowerCase().includes(query) ||
        act.userEmail.toLowerCase().includes(query) ||
        act.userName.toLowerCase().includes(query) ||
        act.userId.toLowerCase().includes(query);

      return matchesCategory && matchesBin && matchesSearch;
    });
  }, [activities, search, selectedCategory, selectedBin]);

  const totalPages = Math.max(1, Math.ceil(filteredActivities.length / pageSize));
  const paginatedActivities = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredActivities.slice(start, start + pageSize);
  }, [filteredActivities, currentPage, pageSize]);

  // Refresh data from API
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch("/api/activity?all=true&limit=100");
      const data = await res.json();
      if (data.success && Array.isArray(data.activities)) {
        setActivities(data.activities);
      }
    } catch (err) {
      console.error("Failed to refresh activities:", err);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (filteredActivities.length === 0) return;

    const headers = [
      "Activity ID",
      "Timestamp",
      "User ID",
      "User Name",
      "User Email",
      "Item Name",
      "Category",
      "Bin Type",
      "Bin Color",
      "CO2 Saved (kg)",
      "Confidence (%)",
      "Source",
    ];

    const rows = filteredActivities.map((a) => [
      `"${a.id}"`,
      `"${new Date(a.createdAt).toLocaleString()}"`,
      `"${a.userId}"`,
      `"${a.userName.replace(/"/g, '""')}"`,
      `"${a.userEmail}"`,
      `"${a.itemName.replace(/"/g, '""')}"`,
      `"${a.category}"`,
      `"${a.binType}"`,
      `"${a.binColor}"`,
      a.co2SavedKg,
      a.confidence,
      `"${a.source}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ecosort_admin_scans_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export to JSON
  const handleExportJSON = () => {
    if (filteredActivities.length === 0) return;
    const jsonStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(filteredActivities, null, 2));
    const link = document.createElement("a");
    link.setAttribute("href", jsonStr);
    link.setAttribute("download", `ecosort_admin_scans_${Date.now()}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="rounded-2xl bg-slate-900/80 border border-white/10 shadow-2xl overflow-hidden">
      {/* Table Header & Toolbar */}
      <div className="p-4 sm:p-5 border-b border-white/10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <span>All User AI Scan Records</span>
              <span className="text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-mono">
                {filteredActivities.length} items
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Real-time audit log of user scans classified with Google Gemini AI
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700/80 border border-white/10 transition"
              title="Refresh scan logs"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-emerald-400" : ""}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-emerald-300 hover:text-white bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/30 transition shadow-sm"
              title="Download as CSV spreadsheet"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={handleExportJSON}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-cyan-300 hover:text-white bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-500/30 transition shadow-sm"
              title="Download as JSON"
            >
              <Download className="w-3.5 h-3.5" />
              <span>JSON</span>
            </button>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
            <input
              type="text"
              placeholder="Search by item, user email, or ID..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-950/80 border border-white/10 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-1.5 bg-slate-950/80 border border-white/10 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-emerald-500 transition appearance-none cursor-pointer"
            >
              <option value="all">All Categories</option>
              <option value="plastic">Plastic</option>
              <option value="paper">Paper &amp; Cardboard</option>
              <option value="metal">Metal</option>
              <option value="glass">Glass</option>
              <option value="organic">Organic / Food</option>
              <option value="e-waste">E-Waste</option>
              <option value="hazardous">Hazardous</option>
              <option value="textile">Textile</option>
            </select>
          </div>

          {/* Bin Color Filter */}
          <div className="relative">
            <select
              value={selectedBin}
              onChange={(e) => {
                setSelectedBin(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-1.5 bg-slate-950/80 border border-white/10 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-emerald-500 transition appearance-none cursor-pointer"
            >
              <option value="all">All Bin Colors</option>
              <option value="green">Green (Compost)</option>
              <option value="blue">Blue (Recyclables)</option>
              <option value="yellow">Yellow (Plastics)</option>
              <option value="purple">Purple (Glass)</option>
              <option value="red">Red (Hazardous)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950/70 border-b border-white/10 text-slate-400 uppercase tracking-wider font-mono text-[10px]">
            <tr>
              <th className="py-3 px-4">Date / Time</th>
              <th className="py-3 px-4">User</th>
              <th className="py-3 px-4">Classified Waste Item</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Bin Target</th>
              <th className="py-3 px-4 text-right">CO₂ Saved</th>
              <th className="py-3 px-4 text-center">AI Confidence</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {paginatedActivities.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-slate-400">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Search className="w-8 h-8 text-slate-600" />
                    <p className="text-sm font-medium">No matching scan activities found</p>
                    <p className="text-xs text-slate-500">
                      Try clearing search filters or perform an AI waste scan on the scanner page.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedActivities.map((act) => (
                <tr
                  key={act.id}
                  className="hover:bg-white/[0.02] transition-colors group cursor-pointer"
                  onClick={() => setSelectedActivity(act)}
                >
                  {/* Timestamp */}
                  <td className="py-3 px-4 text-slate-400 whitespace-nowrap font-mono text-[11px]">
                    {new Date(act.createdAt).toLocaleString(undefined, {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>

                  {/* User */}
                  <td className="py-3 px-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {act.userAvatar ? (
                        <img
                          src={act.userAvatar}
                          alt={act.userName}
                          className="w-6 h-6 rounded-full border border-white/10 shrink-0"
                        />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-slate-300 text-[10px] shrink-0">
                          <User className="w-3.5 h-3.5" />
                        </div>
                      )}
                      <div className="truncate max-w-[140px]">
                        <div className="text-white font-medium truncate">{act.userName}</div>
                        <div className="text-[10px] text-slate-400 truncate">{act.userEmail}</div>
                      </div>
                    </div>
                  </td>

                  {/* Item Name */}
                  <td className="py-3 px-4">
                    <div className="font-semibold text-white group-hover:text-emerald-300 transition-colors">
                      {act.itemName}
                    </div>
                    <div className="text-[10px] text-slate-500 capitalize">{act.source.replace("_", " ")}</div>
                  </td>

                  {/* Category */}
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className="inline-block px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-white/10 text-[11px]">
                      {act.category}
                    </span>
                  </td>

                  {/* Bin Target */}
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full border text-[11px] font-medium capitalize ${
                        binPillClasses[act.binColor] || binPillClasses.blue
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      <span>{act.binColor} Bin</span>
                    </span>
                  </td>

                  {/* CO2 Saved */}
                  <td className="py-3 px-4 text-right whitespace-nowrap font-mono text-emerald-400 font-bold">
                    +{act.co2SavedKg.toFixed(2)} kg
                  </td>

                  {/* AI Confidence */}
                  <td className="py-3 px-4 text-center whitespace-nowrap">
                    <span className="font-mono text-cyan-400 font-semibold">{act.confidence}%</span>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 text-center whitespace-nowrap">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedActivity(act);
                      }}
                      className="p-1 text-slate-400 hover:text-white rounded hover:bg-white/10 transition"
                      title="Inspect record"
                    >
                      <Info className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className="p-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
          <div>
            Page <span className="text-white font-medium">{currentPage}</span> of{" "}
            <span className="text-white font-medium">{totalPages}</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 hover:text-white transition"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 hover:text-white transition"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {selectedActivity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-slate-900 border border-white/15 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h4 className="text-base font-bold text-white">{selectedActivity.itemName}</h4>
                <p className="text-xs text-slate-400">Classified by Google Gemini AI</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold uppercase border ${
                  binPillClasses[selectedActivity.binColor]
                }`}
              >
                {selectedActivity.binColor} Bin
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-950/60 rounded-xl border border-white/5">
                <span className="text-slate-400 block mb-1">User</span>
                <span className="text-white font-medium block">{selectedActivity.userName}</span>
                <span className="text-slate-500 font-mono text-[10px] block">{selectedActivity.userEmail}</span>
              </div>
              <div className="p-3 bg-slate-950/60 rounded-xl border border-white/5">
                <span className="text-slate-400 block mb-1">Environmental Impact</span>
                <span className="text-emerald-400 font-bold text-sm block">
                  +{selectedActivity.co2SavedKg} kg CO₂ Saved
                </span>
                <span className="text-cyan-400 font-mono text-[10px] block">
                  Confidence: {selectedActivity.confidence}%
                </span>
              </div>
              <div className="p-3 bg-slate-950/60 rounded-xl border border-white/5">
                <span className="text-slate-400 block mb-1">Category &amp; Bin Type</span>
                <span className="text-white font-medium block">{selectedActivity.category}</span>
                <span className="text-slate-400 text-[10px] block">{selectedActivity.binType}</span>
              </div>
              <div className="p-3 bg-slate-950/60 rounded-xl border border-white/5">
                <span className="text-slate-400 block mb-1">Timestamp</span>
                <span className="text-white font-medium block">
                  {new Date(selectedActivity.createdAt).toLocaleString()}
                </span>
                <span className="text-slate-500 font-mono text-[10px] block">
                  ID: {selectedActivity.id.slice(0, 16)}...
                </span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedActivity(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium rounded-xl transition"
              >
                Close Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

