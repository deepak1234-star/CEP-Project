"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { SignOutButton, UserButton } from "@clerk/nextjs";
import {
  CheckCircle,
  Mail,
  Globe,
  LogOut,
  Camera,
  Sparkles,
  Palette,
  ShieldCheck,
  User,
} from "lucide-react";
import AvatarPickerModal from "./AvatarPickerModal";
import {
  getStoredAvatar,
  CustomAvatarState,
} from "@/lib/avatars";

interface UserProfileCardProps {
  userId: string;
  userFullName: string;
  userEmail: string;
  initialClerkAvatar: string;
  hasGoogleOAuth: boolean;
}

export default function UserProfileCard({
  userId,
  userFullName,
  userEmail,
  initialClerkAvatar,
  hasGoogleOAuth,
}: UserProfileCardProps) {
  const [customAvatar, setCustomAvatar] = useState<CustomAvatarState | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = getStoredAvatar(userId);
    if (stored) {
      setCustomAvatar(stored);
    }

    const handler = (e: Event) => {
      const customEvent = e as CustomEvent<CustomAvatarState | null>;
      setCustomAvatar(customEvent.detail);
    };

    window.addEventListener("ecosort_avatar_changed", handler);
    return () => window.removeEventListener("ecosort_avatar_changed", handler);
  }, [userId]);

  const initialLetter = (userFullName.trim()[0] || "U").toUpperCase();

  // Determine if the current image is the default placeholder or lacking a custom Google photo
  const isDefaultClerkPlaceholder =
    !initialClerkAvatar ||
    initialClerkAvatar.includes("preview.png") ||
    initialClerkAvatar.includes("default");

  return (
    <>
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950 border border-slate-800 p-5 sm:p-8 md:p-10 shadow-2xl">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex flex-col sm:flex-row items-center sm:items-start md:items-center gap-5 sm:gap-6 text-center sm:text-left">
            {/* Interactive User Profile Avatar */}
            <div className="relative flex-shrink-0 group">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="relative block rounded-2xl focus:outline-none focus:ring-4 focus:ring-cyan-500/50 transition-transform active:scale-95"
                title="Click to choose or change your profile picture"
              >
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden ring-4 ring-cyan-500/30 shadow-xl bg-slate-800 flex items-center justify-center relative">
                  {/* Render based on Custom Avatar or Default Clerk */}
                  {customAvatar?.type === "uploaded" && customAvatar.uploadedDataUrl ? (
                    <img
                      src={customAvatar.uploadedDataUrl}
                      alt={userFullName}
                      className="w-full h-full object-cover"
                    />
                  ) : customAvatar?.type === "preset" ? (
                    <div
                      className={`w-full h-full bg-gradient-to-tr ${
                        customAvatar.gradientClass || "from-emerald-500 to-cyan-600"
                      } flex items-center justify-center text-4xl sm:text-5xl shadow-inner select-none`}
                    >
                      {customAvatar.emoji || "🌱"}
                    </div>
                  ) : customAvatar?.type === "gradient" ? (
                    <div
                      className={`w-full h-full bg-gradient-to-tr ${
                        customAvatar.gradientClass || "from-cyan-500 to-blue-600"
                      } flex items-center justify-center text-white font-black text-3xl sm:text-4xl shadow-inner select-none`}
                    >
                      {initialLetter}
                    </div>
                  ) : initialClerkAvatar && !isDefaultClerkPlaceholder ? (
                    <Image
                      src={initialClerkAvatar}
                      alt={userFullName}
                      width={112}
                      height={112}
                      className="w-full h-full object-cover"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-emerald-500 via-cyan-500 to-blue-600 flex items-center justify-center text-white font-black text-3xl sm:text-4xl shadow-inner select-none">
                      {initialLetter}
                    </div>
                  )}

                  {/* Hover / Tap overlay button */}
                  <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[11px] font-semibold gap-1 backdrop-blur-[2px]">
                    <Camera className="w-5 h-5 text-cyan-400" />
                    <span>Change</span>
                  </div>
                </div>

                {/* Status indicator badge */}
                <div
                  className="absolute -bottom-2 -right-2 bg-emerald-500 text-slate-950 p-1.5 rounded-full ring-4 ring-slate-900 shadow-md"
                  title="Session Active & Authenticated"
                >
                  <CheckCircle className="w-4 h-4 stroke-[3]" />
                </div>
              </button>

              {/* Avatar label & quick-change chip */}
              <div className="mt-2 text-center">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center space-x-1 text-[11px] font-medium text-cyan-400 hover:text-cyan-300 transition-colors bg-cyan-950/50 hover:bg-cyan-900/50 px-2 py-0.5 rounded-full border border-cyan-500/30"
                >
                  <Palette className="w-3 h-3" />
                  <span>
                    {customAvatar ? customAvatar.avatarName || "Custom Avatar" : "Choose Avatar"}
                  </span>
                </button>
              </div>
            </div>

            {/* Profile Info */}
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Session Active &amp; Authenticated</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                {userFullName}
              </h1>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4 text-slate-300 text-xs sm:text-sm">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span className="truncate max-w-[240px] sm:max-w-none">{userEmail}</span>
                </div>

                {hasGoogleOAuth && (
                  <div className="flex items-center space-x-1.5 text-xs text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20">
                    <Globe className="w-3.5 h-3.5" />
                    <span>Google OAuth Verified</span>
                  </div>
                )}
              </div>

              {/* Hint badge for users with default initial avatar */}
              {mounted && !customAvatar && (
                <div className="pt-1">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center space-x-1.5 text-xs text-emerald-400 hover:text-emerald-300 transition-colors bg-emerald-950/40 border border-emerald-500/30 px-3 py-1 rounded-xl text-left"
                  >
                    <Sparkles className="w-3.5 h-3.5 flex-shrink-0 animate-pulse text-emerald-400" />
                    <span>Personalize your profile: Pick an eco avatar or upload a picture!</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons & User Menu */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 pt-4 md:pt-0 border-t md:border-t-0 border-slate-800">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-cyan-300 bg-cyan-950/50 hover:bg-cyan-900/60 border border-cyan-500/30 hover:border-cyan-400/50 transition-all shadow-md shadow-cyan-500/10"
            >
              <Camera className="w-4 h-4 text-cyan-400" />
              <span>Choose Avatar</span>
            </button>

            <SignOutButton redirectUrl="/login">
              <button className="inline-flex items-center space-x-2 px-4 sm:px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-slate-200 bg-slate-800 hover:bg-rose-950/40 hover:text-rose-400 border border-slate-700 hover:border-rose-800/60 transition-all shadow-md">
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </SignOutButton>

            <div className="p-1 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center">
              <UserButton
                afterSignOutUrl="/login"
                appearance={{
                  elements: {
                    avatarBox:
                      "w-8 h-8 sm:w-9 sm:h-9 ring-2 ring-cyan-500/40 hover:ring-cyan-400 transition-all",
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Avatar Picker Modal */}
      <AvatarPickerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userId={userId}
        userFullName={userFullName}
        initialClerkAvatar={initialClerkAvatar}
        currentAvatar={customAvatar}
        onAvatarUpdated={(avatar) => setCustomAvatar(avatar)}
      />
    </>
  );
}
