"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { SignOutButton } from "@clerk/nextjs";
import CustomUserButton from "@/components/CustomUserButton";
import {
  CheckCircle,
  Mail,
  Globe,
  LogOut,
  Camera,
  Sparkles,
  Palette,
  Edit3,
  Calendar,
  Heart,
  FileText,
  Award,
} from "lucide-react";
import AvatarPickerModal from "./AvatarPickerModal";
import EditProfileModal from "./EditProfileModal";
import {
  getStoredAvatar,
  saveStoredAvatar,
  CustomAvatarState,
} from "@/lib/avatars";
import {
  getStoredProfile,
  saveStoredProfile,
  calculateProfileCompletion,
  PROFILE_CHANGED_EVENT,
} from "@/lib/userProfile";
import { UserProfileDetails, ABOUT_CHECKBOX_OPTIONS } from "@/types/profile";
import { fetchUserCloudData } from "@/lib/userSync";

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
  const [userProfile, setUserProfile] = useState<UserProfileDetails | null>(null);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // 1. Load avatar from local or cloud
    const storedAvatar = getStoredAvatar(userId);
    if (storedAvatar) {
      setCustomAvatar(storedAvatar);
    }

    // 2. Load extended profile from local storage
    const storedProfile = getStoredProfile(userId);
    if (storedProfile) {
      setUserProfile(storedProfile);
    }

    // 3. Fetch any updated cloud metadata
    fetchUserCloudData().then((cloud) => {
      if (cloud) {
        if (cloud.customAvatar && !storedAvatar) {
          setCustomAvatar(cloud.customAvatar);
          saveStoredAvatar(userId, cloud.customAvatar);
        }
        if (cloud.profileDetails) {
          setUserProfile(cloud.profileDetails);
          saveStoredProfile(userId, cloud.profileDetails);
        }
      }
    });

    // Listen for avatar updates
    const avatarHandler = (e: Event) => {
      const customEvent = e as CustomEvent<CustomAvatarState | null>;
      setCustomAvatar(customEvent.detail);
    };

    // Listen for profile updates
    const profileHandler = (e: Event) => {
      const customEvent = e as CustomEvent<UserProfileDetails>;
      setUserProfile(customEvent.detail);
    };

    window.addEventListener("ecosort_avatar_changed", avatarHandler);
    window.addEventListener(PROFILE_CHANGED_EVENT, profileHandler);

    return () => {
      window.removeEventListener("ecosort_avatar_changed", avatarHandler);
      window.removeEventListener(PROFILE_CHANGED_EVENT, profileHandler);
    };
  }, [userId]);

  const displayName = userProfile?.fullName || userFullName;
  const initialLetter = (displayName.trim()[0] || "U").toUpperCase();

  // Determine if the current image is the default placeholder
  const isDefaultClerkPlaceholder =
    !initialClerkAvatar ||
    initialClerkAvatar.includes("preview.png") ||
    initialClerkAvatar.includes("default");

  const hasAvatar = Boolean(
    customAvatar || (initialClerkAvatar && !isDefaultClerkPlaceholder)
  );

  // Calculate profile completion percentage
  const completionStats = calculateProfileCompletion({
    fullName: displayName,
    email: userEmail,
    hasAvatar,
    profile: userProfile,
  });

  return (
    <>
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950 border border-slate-800 p-5 sm:p-8 md:p-10 shadow-2xl space-y-6">
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-10 -top-10 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6 text-center sm:text-left flex-1">
            {/* Interactive User Profile Avatar */}
            <div className="relative flex-shrink-0 group">
              <button
                type="button"
                onClick={() => setIsAvatarModalOpen(true)}
                className="relative block rounded-2xl focus:outline-none focus:ring-4 focus:ring-cyan-500/50 transition-transform active:scale-95"
                title="Click to choose or change your profile picture"
              >
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden ring-4 ring-cyan-500/30 shadow-xl bg-slate-800 flex items-center justify-center relative">
                  {customAvatar?.type === "uploaded" && customAvatar.uploadedDataUrl ? (
                    <img
                      src={customAvatar.uploadedDataUrl}
                      alt={displayName}
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
                      alt={displayName}
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
                  onClick={() => setIsAvatarModalOpen(true)}
                  className="inline-flex items-center space-x-1 text-[11px] font-medium text-cyan-400 hover:text-cyan-300 transition-colors bg-cyan-950/50 hover:bg-cyan-900/50 px-2 py-0.5 rounded-full border border-cyan-500/30"
                >
                  <Palette className="w-3 h-3" />
                  <span>
                    {customAvatar ? customAvatar.avatarName || "Custom Avatar" : "Choose Avatar"}
                  </span>
                </button>
              </div>
            </div>

            {/* Profile Info & Attributes */}
            <div className="space-y-3 flex-1">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Session Active &amp; Authenticated</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                {displayName}
              </h1>

              {/* Email & Google OAuth badge */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 text-slate-300 text-xs sm:text-sm">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span className="truncate max-w-[240px] sm:max-w-none">{userEmail}</span>
                </div>

                {hasGoogleOAuth && (
                  <div className="flex items-center space-x-1.5 text-xs text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/20">
                    <Globe className="w-3 h-3" />
                    <span>Google OAuth Verified</span>
                  </div>
                )}

                {userProfile?.gender && (
                  <div className="flex items-center space-x-1 text-xs text-pink-300 bg-pink-500/10 px-2.5 py-0.5 rounded-full border border-pink-500/20">
                    <Heart className="w-3 h-3 text-pink-400" />
                    <span>{userProfile.gender}</span>
                  </div>
                )}

                {userProfile?.dob && (
                  <div className="flex items-center space-x-1 text-xs text-emerald-300 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                    <Calendar className="w-3 h-3 text-emerald-400" />
                    <span>DOB: {new Date(userProfile.dob).toLocaleDateString()}</span>
                  </div>
                )}
              </div>

              {/* Bio summary block if entered */}
              {userProfile?.bio && (
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs sm:text-sm text-slate-300 italic max-w-2xl">
                  &ldquo;{userProfile.bio}&rdquo;
                </div>
              )}

              {/* Self / Eco Habits pills if checked */}
              {userProfile?.aboutCheckboxes && userProfile.aboutCheckboxes.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {userProfile.aboutCheckboxes.map((optId) => {
                    const match = ABOUT_CHECKBOX_OPTIONS.find((o) => o.id === optId);
                    if (!match) return null;
                    return (
                      <span
                        key={optId}
                        className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-lg text-[11px] font-medium bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 shadow-sm"
                      >
                        <span>{match.emoji}</span>
                        <span>{match.label.slice(0, 32)}...</span>
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons Group */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-2.5 pt-4 md:pt-0 border-t md:border-t-0 border-slate-800">
            {/* Edit Profile Button */}
            <button
              onClick={() => setIsEditProfileModalOpen(true)}
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 transition-all shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/30 hover:-translate-y-0.5 active:translate-y-0"
              title="Edit Profile, Gender, DOB, Bio and Preferences"
            >
              <Edit3 className="w-4 h-4 text-slate-950" />
              <span>Edit Profile</span>
            </button>

            <button
              onClick={() => setIsAvatarModalOpen(true)}
              className="inline-flex items-center space-x-2 px-3.5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-cyan-300 bg-cyan-950/50 hover:bg-cyan-900/60 border border-cyan-500/30 hover:border-cyan-400/50 transition-all shadow-md shadow-cyan-500/10"
            >
              <Camera className="w-4 h-4 text-cyan-400" />
              <span>Choose Avatar</span>
            </button>

            <SignOutButton redirectUrl="/login">
              <button className="inline-flex items-center space-x-2 px-3.5 sm:px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-slate-200 bg-slate-800 hover:bg-rose-950/40 hover:text-rose-400 border border-slate-700 hover:border-rose-800/60 transition-all shadow-md">
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </SignOutButton>

            <div className="p-1 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center">
              <CustomUserButton afterSignOutUrl="/login" />
            </div>
          </div>
        </div>

        {/* Prominent Profile Completion Progress Widget */}
        <div className="relative z-10 pt-4 border-t border-slate-800/80">
          <button
            type="button"
            onClick={() => setIsEditProfileModalOpen(true)}
            className="w-full text-left group p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-slate-800/90 hover:border-cyan-500/40 transition-all shadow-lg hover:shadow-cyan-500/10"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2.5">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span className="font-bold text-sm sm:text-base text-white">
                  Profile Completion
                </span>
                <span className="text-xs text-slate-400 hidden sm:inline">
                  (Gender, DOB, Bio &amp; Eco Habits)
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <span
                  className={`text-xs sm:text-sm font-extrabold px-3 py-1 rounded-full border shadow-sm ${
                    completionStats.percentage === 100
                      ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-400"
                      : completionStats.percentage >= 70
                      ? "bg-cyan-500/15 border-cyan-500/40 text-cyan-400"
                      : "bg-amber-500/15 border-amber-500/40 text-amber-400"
                  }`}
                >
                  {completionStats.percentage}%{" "}
                  {completionStats.percentage === 100 ? "🎉 Completed!" : "Completed"}
                </span>
                <span className="text-xs text-cyan-400 group-hover:translate-x-0.5 transition-transform font-medium">
                  Edit →
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
              <div
                className={`h-full rounded-full transition-all duration-700 ease-out ${
                  completionStats.percentage === 100
                    ? "bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 shadow-md shadow-emerald-500/40"
                    : completionStats.percentage >= 70
                    ? "bg-gradient-to-r from-cyan-500 to-blue-500"
                    : "bg-gradient-to-r from-amber-500 to-orange-500"
                }`}
                style={{ width: `${completionStats.percentage}%` }}
              />
            </div>

            {/* Subtitle / checklist overview */}
            <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
              <span>
                {completionStats.percentage === 100
                  ? "Outstanding! Your profile is 100% complete and verified."
                  : `Complete your ${completionStats.items
                      .filter((i) => !i.completed)
                      .map((i) => i.label)
                      .slice(0, 3)
                      .join(", ")} to reach 100%.`}
              </span>
              <span className="text-cyan-400 group-hover:text-cyan-300 font-medium">
                Click to update details
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Avatar Picker Modal */}
      <AvatarPickerModal
        isOpen={isAvatarModalOpen}
        onClose={() => setIsAvatarModalOpen(false)}
        userId={userId}
        userFullName={displayName}
        initialClerkAvatar={initialClerkAvatar}
        currentAvatar={customAvatar}
        onAvatarUpdated={(avatar) => setCustomAvatar(avatar)}
      />

      {/* Edit Profile Modal (Gender, DOB, Bio, Checkboxes, & 100% completion) */}
      <EditProfileModal
        isOpen={isEditProfileModalOpen}
        onClose={() => setIsEditProfileModalOpen(false)}
        userId={userId}
        initialFullName={displayName}
        userEmail={userEmail}
        hasAvatar={hasAvatar}
        currentProfile={userProfile}
        onProfileSaved={(updated) => setUserProfile(updated)}
      />
    </>
  );
}
