import React from "react";

interface AuthSkeletonProps {
  title?: string;
  subtitle?: string;
  isSignUp?: boolean;
}

export default function AuthSkeleton({
  title = "Welcome Back",
  subtitle = "Securing session and loading credentials...",
  isSignUp = false,
}: AuthSkeletonProps) {
  return (
    <div className="w-full max-w-md bg-slate-900/90 border border-slate-800/80 shadow-2xl p-6 sm:p-8 rounded-2xl backdrop-blur-xl animate-pulse space-y-6">
      {/* Header Skeleton */}
      <div className="text-center space-y-2">
        <div className="h-6 w-36 bg-slate-800 rounded-lg mx-auto" />
        <div className="h-4 w-56 bg-slate-800/60 rounded-md mx-auto" />
      </div>

      {/* Social Button (Google) Skeleton */}
      <div className="h-12 w-full bg-slate-800/80 border border-slate-700/60 rounded-xl flex items-center justify-center space-x-3">
        <div className="w-5 h-5 rounded-full bg-slate-700" />
        <div className="h-4 w-32 bg-slate-700/80 rounded" />
      </div>

      {/* Divider */}
      <div className="flex items-center space-x-3 my-4">
        <div className="h-px bg-slate-800 flex-1" />
        <div className="h-3 w-8 bg-slate-800 rounded" />
        <div className="h-px bg-slate-800 flex-1" />
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        <div className="space-y-1.5">
          <div className="h-3 w-24 bg-slate-800 rounded" />
          <div className="h-10 w-full bg-slate-950/80 border border-slate-800 rounded-xl" />
        </div>

        <div className="space-y-1.5">
          <div className="h-3 w-20 bg-slate-800 rounded" />
          <div className="h-10 w-full bg-slate-950/80 border border-slate-800 rounded-xl" />
        </div>

        {isSignUp && (
          <div className="space-y-1.5">
            <div className="h-3 w-28 bg-slate-800 rounded" />
            <div className="h-10 w-full bg-slate-950/80 border border-slate-800 rounded-xl" />
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="h-11 w-full bg-gradient-to-r from-cyan-500/40 to-blue-600/40 rounded-xl" />

      {/* Loading Status Indicator */}
      <div className="flex items-center justify-center space-x-2 pt-2">
        <div className="w-3.5 h-3.5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs text-slate-400">Loading secure sign-in...</span>
      </div>
    </div>
  );
}
