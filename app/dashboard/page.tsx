import { currentUser, auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  ShieldCheck,
  User,
  Calendar,
  Sparkles,
  Recycle,
  Globe,
  ArrowRight,
} from "lucide-react";
import UserProfileCard from "@/components/dashboard/UserProfileCard";

export default async function DashboardPage() {
  const { userId } = await auth();
  const user = await currentUser();

  // Guard against unauthenticated access
  if (!userId || !user) {
    redirect("/login");
  }

  // Extract user details securely from Clerk user object
  const userFullName =
    user.fullName ||
    `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
    "Authenticated User";

  const userEmail =
    user.primaryEmailAddress?.emailAddress || "No primary email connected";

  const userAvatar = user.imageUrl || "https://img.clerk.com/preview.png";

  const createdAtDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Recently";

  const lastSignInDate = user.lastSignInAt
    ? new Date(user.lastSignInAt).toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "Active Now";

  const hasGoogleOAuth = user.externalAccounts?.some(
    (acc) => acc.provider === "google"
  ) ?? false;

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6 sm:space-y-8">
      {/* Interactive User Profile Card with Avatar Picker */}
      <UserProfileCard
        userId={userId}
        userFullName={userFullName}
        userEmail={userEmail}
        initialClerkAvatar={userAvatar}
        hasGoogleOAuth={hasGoogleOAuth}
      />

      {/* Quick Access to EcoSort AI Scanner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-cyan-950/40 border border-emerald-500/30 p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Waste Classification Ready</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Classify Waste &amp; Earn Eco Points
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl">
            Scan recyclables, check resin codes #1-7, practice with the quiz, and track carbon savings.
          </p>
        </div>

        <Link
          href="/ecosort"
          className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all flex-shrink-0"
        >
          <Recycle className="w-5 h-5 text-slate-950" />
          <span>Launch EcoSort AI Scanner</span>
          <ArrowRight className="w-4 h-4 ml-1" />
        </Link>
      </div>

      {/* Detail Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Identity Profile */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <User className="w-5 h-5" />
              </div>
              <h2 className="font-bold text-white text-lg">Identity Profile</h2>
            </div>
            <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2 py-1 rounded border border-cyan-800/50">
              Verified
            </span>
          </div>

          <div className="space-y-3 text-sm divide-y divide-slate-800/60 pt-2">
            <div className="flex justify-between py-2">
              <span className="text-slate-400">Full Name</span>
              <span className="font-medium text-slate-200">{userFullName}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-slate-400">Account Type</span>
              <span className="font-medium text-slate-200">Authenticated Member</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-slate-400">Authentication</span>
              <span className="font-medium text-emerald-400">
                {hasGoogleOAuth ? "Google Single Sign-On" : "Clerk Managed Auth"}
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: Security & OAuth Status */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h2 className="font-bold text-white text-lg">OAuth &amp; Security</h2>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2 py-1 rounded border border-emerald-800/50">
              Active
            </span>
          </div>

          <div className="space-y-3 text-sm divide-y divide-slate-800/60 pt-2">
            <div className="flex justify-between py-2">
              <span className="text-slate-400">Auth Provider</span>
              <span className="font-medium text-slate-200 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-blue-400" />
                {hasGoogleOAuth ? "Google OAuth 2.0" : "Clerk Managed Auth"}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-slate-400">Session Storage</span>
              <span className="font-medium text-emerald-400">HTTP-Only JWT</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-slate-400">Route Protection</span>
              <span className="font-medium text-cyan-400">Edge Middleware</span>
            </div>
          </div>
        </div>

        {/* Card 3: Account Activity */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
                <Calendar className="w-5 h-5" />
              </div>
              <h2 className="font-bold text-white text-lg">Activity &amp; Logs</h2>
            </div>
            <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2 py-1 rounded">
              Live
            </span>
          </div>

          <div className="space-y-3 text-sm divide-y divide-slate-800/60 pt-2">
            <div className="flex justify-between py-2">
              <span className="text-slate-400">Member Since</span>
              <span className="font-medium text-slate-200">{createdAtDate}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-slate-400">Last Sign-In</span>
              <span className="font-medium text-slate-200">{lastSignInDate}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-slate-400">Status</span>
              <span className="font-medium text-emerald-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                Authenticated
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
