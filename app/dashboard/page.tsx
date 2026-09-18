import { currentUser, auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { SignOutButton, UserButton } from "@clerk/nextjs";
import {
  ShieldCheck,
  Mail,
  User,
  Calendar,
  LogOut,
  Sparkles,
  CheckCircle,
  Recycle,
  Globe,
  ArrowRight,
  Leaf,
} from "lucide-react";

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

  const userAvatar =
    user.imageUrl ||
    "https://img.clerk.com/preview.png";

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

  const hasGoogleOAuth = user.externalAccounts.some(
    (acc) => acc.provider === "google"
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Top Banner Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950 border border-slate-800 p-6 sm:p-10 shadow-2xl">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex flex-col sm:flex-row items-center sm:items-start md:items-center gap-6 text-center sm:text-left">
            {/* User Profile Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden ring-4 ring-cyan-500/30 shadow-xl bg-slate-800">
                <Image
                  src={userAvatar}
                  alt={userFullName}
                  width={112}
                  height={112}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-slate-950 p-1.5 rounded-full ring-4 ring-slate-900" title="Authenticated Session Active">
                <CheckCircle className="w-4 h-4 stroke-[3]" />
              </div>
            </div>

            {/* Profile Info */}
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Session Active & Authenticated</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                {userFullName}
              </h1>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-slate-300 text-sm">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-cyan-400" />
                  <span>{userEmail}</span>
                </div>
                {hasGoogleOAuth && (
                  <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
                    <Globe className="w-3.5 h-3.5" />
                    <span>Google OAuth Verified</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons & User Menu */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 pt-4 md:pt-0 border-t md:border-t-0 border-slate-800">
            <SignOutButton redirectUrl="/login">
              <button className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-slate-200 bg-slate-800 hover:bg-rose-950/40 hover:text-rose-400 border border-slate-700 hover:border-rose-800/60 transition-all shadow-md">
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </SignOutButton>

            <div className="p-1 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center">
              <UserButton
                afterSignOutUrl="/login"
                appearance={{
                  elements: {
                    avatarBox: "w-9 h-9 ring-2 ring-cyan-500/40 hover:ring-cyan-400 transition-all",
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* EcoSort AI Launcher Card */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-950/50 via-slate-900 to-cyan-950/50 border border-emerald-500/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 text-center md:text-left">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold">
            <Leaf className="w-3.5 h-3.5" />
            <span>AI Waste Classification Feature</span>
          </div>
          <h2 className="text-2xl font-bold text-white">♻️ EcoSort AI Waste Assistant</h2>
          <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
            Use real-time live webcam or photo upload to classify waste, check plastic resin codes (#1-7), listen to voice disposal guides, and unlock sustainability badges.
          </p>
        </div>

        <Link
          href="/ecosort"
          className="inline-flex items-center space-x-3 px-8 py-3.5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-xl shadow-emerald-500/20 transition-all hover:scale-[1.03] flex-shrink-0"
        >
          <Sparkles className="w-5 h-5 text-slate-950" />
          <span>Launch EcoSort AI</span>
          <ArrowRight className="w-4 h-4 ml-1" />
        </Link>
      </div>

      {/* Main Grid Stats & Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: User Identity Details */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <User className="w-5 h-5" />
              </div>
              <h2 className="font-bold text-white text-lg">Identity Details</h2>
            </div>
            <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2 py-1 rounded border border-cyan-800/50">Verified</span>
          </div>

          <div className="space-y-3 text-sm divide-y divide-slate-800/60 pt-2">
            <div className="flex justify-between py-2">
              <span className="text-slate-400">Full Name</span>
              <span className="font-medium text-slate-200">{userFullName}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-slate-400">Email Address</span>
              <span className="font-medium text-slate-200 truncate max-w-[200px]" title={userEmail}>
                {userEmail}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-slate-400">User ID</span>
              <span className="font-mono text-xs text-slate-400 truncate max-w-[140px]" title={userId}>
                {userId}
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
              <h2 className="font-bold text-white text-lg">OAuth & Security</h2>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2 py-1 rounded border border-emerald-800/50">Active</span>
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
              <h2 className="font-bold text-white text-lg">Activity & Logs</h2>
            </div>
            <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2 py-1 rounded">Live</span>
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
