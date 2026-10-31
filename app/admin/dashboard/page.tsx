import React from "react";
import Link from "next/link";
import { getCurrentUserAdminStatus } from "@/lib/adminAuth";
import { getAdminMetrics, getRecentActivities } from "@/lib/db/activityService";
import AdminMetricCards from "@/components/admin/AdminMetricCards";
import AdminDistribution from "@/components/admin/AdminDistribution";
import ActivityTable from "@/components/admin/ActivityTable";
import {
  ShieldAlert,
  ShieldCheck,
  ArrowLeft,
  Sparkles,
  LayoutDashboard,
  ExternalLink,
  Lock,
  UserCheck,
} from "lucide-react";

export const metadata = {
  title: "Admin Mission Control | EcoSort AI",
  description: "Executive Administrator Dashboard for EcoSort AI Waste Management Platform",
};

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const adminStatus = await getCurrentUserAdminStatus();

  // If user is not authorized as an Administrator
  if (!adminStatus.isAdmin) {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full rounded-3xl bg-slate-900/90 border border-rose-500/30 p-8 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 mx-auto flex items-center justify-center">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-extrabold text-white">Administrator Access Required</h1>
            <p className="text-xs text-slate-400 leading-relaxed">
              This mission control dashboard is strictly restricted to EcoSort AI Super Administrators.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/10 text-left space-y-2 font-mono text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Current Clerk ID:</span>
              <span className="text-slate-200 truncate max-w-[170px]">{adminStatus.userId || "Not Signed In"}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Account Email:</span>
              <span className="text-slate-200 truncate max-w-[170px]">{adminStatus.email || "N/A"}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Admin Clearance:</span>
              <span className="text-rose-400 font-bold">DENIED ❌</span>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <Link
              href="/dashboard"
              className="w-full inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white text-xs font-semibold shadow-lg transition"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Return to User Dashboard</span>
            </Link>

            <Link
              href="/"
              className="w-full inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // Load Admin Data (with graceful fallbacks)
  const [metrics, activities] = await Promise.all([
    getAdminMetrics(),
    getRecentActivities({ limit: 100 }),
  ]);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      {/* Admin Header Banner */}
      <div className="border-b border-white/10 bg-slate-900/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2.5 mb-1.5">
                <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin Mission Control</span>
                </span>
                <span className="text-xs text-slate-500 font-mono">v2.4 Live</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                EcoSort AI Executive Administrator
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Real-time user engagement, AI vision classifications, carbon avoidance metrics, and municipal bin routing.
              </p>
            </div>

            {/* Quick Navigation links */}
            <div className="flex items-center space-x-2.5">
              <Link
                href="/ecosort"
                className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 hover:bg-emerald-900/50 transition shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                <span>Test AI Scanner</span>
              </Link>

              <Link
                href="/dashboard"
                className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700/80 border border-white/10 transition"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-cyan-400" />
                <span>My User Profile</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Body Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-6">
        {/* Metric Cards */}
        <AdminMetricCards metrics={metrics} />

        {/* Category & Bin Routing Breakdown */}
        <AdminDistribution
          categoryBreakdown={metrics.categoryBreakdown}
          binColorBreakdown={metrics.binColorBreakdown}
        />

        {/* Real-time Activity Table */}
        <ActivityTable initialActivities={activities} />
      </div>
    </main>
  );
}

