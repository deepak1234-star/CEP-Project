"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  User,
  Calendar,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  FileText,
  Save,
  ShieldCheck,
  Heart,
  Award,
} from "lucide-react";
import {
  UserProfileDetails,
  GenderOption,
  ABOUT_CHECKBOX_OPTIONS,
} from "@/types/profile";
import {
  calculateProfileCompletion,
  saveStoredProfile,
} from "@/lib/userProfile";
import { syncProfileToCloud } from "@/lib/userSync";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  initialFullName: string;
  userEmail: string;
  hasAvatar: boolean;
  currentProfile: UserProfileDetails | null;
  onProfileSaved: (updated: UserProfileDetails) => void;
}

export default function EditProfileModal({
  isOpen,
  onClose,
  userId,
  initialFullName,
  userEmail,
  hasAvatar,
  currentProfile,
  onProfileSaved,
}: EditProfileModalProps) {
  const [fullName, setFullName] = useState(
    currentProfile?.fullName || initialFullName || ""
  );
  const [gender, setGender] = useState<GenderOption>(
    currentProfile?.gender || ""
  );
  const [dob, setDob] = useState(currentProfile?.dob || "");
  const [bio, setBio] = useState(currentProfile?.bio || "");
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>(
    currentProfile?.aboutCheckboxes || []
  );

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Synchronize state when modal opens or currentProfile changes
  useEffect(() => {
    if (isOpen) {
      setFullName(currentProfile?.fullName || initialFullName || "");
      setGender(currentProfile?.gender || "");
      setDob(currentProfile?.dob || "");
      setBio(currentProfile?.bio || "");
      setSelectedCheckboxes(currentProfile?.aboutCheckboxes || []);
      setSaveSuccess(false);
    }
  }, [isOpen, currentProfile, initialFullName]);

  if (!isOpen) return null;

  // Real-time calculation of profile completion percentage based on current form inputs
  const liveStats = calculateProfileCompletion({
    fullName,
    email: userEmail,
    hasAvatar,
    profile: {
      fullName,
      gender,
      dob,
      bio,
      aboutCheckboxes: selectedCheckboxes,
    },
  });

  const toggleCheckbox = (id: string) => {
    setSelectedCheckboxes((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const updatedProfile: UserProfileDetails = {
      fullName: fullName.trim(),
      gender,
      dob,
      bio: bio.trim(),
      aboutCheckboxes: selectedCheckboxes,
      updatedAt: new Date().toISOString(),
    };

    // Save locally
    saveStoredProfile(userId, updatedProfile);

    // Sync to Clerk cloud
    await syncProfileToCloud(updatedProfile);

    onProfileSaved(updatedProfile);
    setIsSaving(false);
    setSaveSuccess(true);

    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl flex flex-col text-slate-100">
        {/* Modal Top Header */}
        <div className="sticky top-0 z-20 bg-slate-900/95 backdrop-blur-md px-6 py-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500/20 to-emerald-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Edit Profile
              </h2>
              <p className="text-xs text-slate-400">
                Personalize your account, identity, and environmental habits
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Profile Completion Meter Banner */}
        <div className="p-6 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/30 border-b border-slate-800">
          <div className="flex items-center justify-between gap-4 mb-2">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span className="text-xs sm:text-sm font-semibold text-slate-200">
                Profile Completeness
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span
                className={`text-xs sm:text-sm font-extrabold px-3 py-1 rounded-full border ${
                  liveStats.percentage === 100
                    ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-400"
                    : liveStats.percentage >= 70
                    ? "bg-cyan-500/15 border-cyan-500/40 text-cyan-400"
                    : "bg-amber-500/15 border-amber-500/40 text-amber-400"
                }`}
              >
                {liveStats.percentage}% Completed
              </span>
            </div>
          </div>

          {/* Animated Progress Bar */}
          <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5">
            <div
              className={`h-full rounded-full transition-all duration-500 ease-out ${
                liveStats.percentage === 100
                  ? "bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 shadow-lg shadow-emerald-500/30"
                  : liveStats.percentage >= 70
                  ? "bg-gradient-to-r from-cyan-500 to-blue-500"
                  : "bg-gradient-to-r from-amber-500 to-orange-500"
              }`}
              style={{ width: `${liveStats.percentage}%` }}
            />
          </div>

          {/* Field Checklist Pills */}
          <div className="mt-3 flex flex-wrap gap-1.5 sm:gap-2">
            {liveStats.items.map((item) => (
              <span
                key={item.id}
                className={`text-[11px] px-2 py-0.5 rounded-md flex items-center space-x-1 border ${
                  item.completed
                    ? "bg-emerald-950/40 border-emerald-500/30 text-emerald-300"
                    : "bg-slate-800/60 border-slate-700/60 text-slate-400"
                }`}
              >
                <span>{item.completed ? "✓" : "○"}</span>
                <span>{item.label}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSave} className="p-6 space-y-6 flex-1">
          {/* Full Name & Gender Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center space-x-1.5">
                <User className="w-3.5 h-3.5 text-cyan-400" />
                <span>Full Name</span>
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your name"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                required
              />
            </div>

            {/* Gender */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center space-x-1.5">
                <Heart className="w-3.5 h-3.5 text-pink-400" />
                <span>Gender</span>
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as GenderOption)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
              >
                <option value="" disabled className="bg-slate-900 text-slate-400">
                  Select Gender
                </option>
                <option value="Male" className="bg-slate-900 text-white">
                  Male
                </option>
                <option value="Female" className="bg-slate-900 text-white">
                  Female
                </option>
                <option value="Non-binary" className="bg-slate-900 text-white">
                  Non-binary
                </option>
                <option value="Prefer not to say" className="bg-slate-900 text-white">
                  Prefer not to say
                </option>
                <option value="Other" className="bg-slate-900 text-white">
                  Other
                </option>
              </select>
            </div>
          </div>

          {/* Date of Birth & Email (Readonly) Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Date of Birth (DOB) */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center space-x-1.5">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                <span>Date of Birth (DOB)</span>
              </label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all [color-scheme:dark]"
              />
            </div>

            {/* Account Email (Verified) */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Connected Email</span>
              </label>
              <input
                type="email"
                value={userEmail}
                disabled
                className="w-full bg-slate-950/50 border border-slate-800/60 rounded-xl px-3.5 py-2.5 text-sm text-slate-400 cursor-not-allowed select-none"
              />
            </div>
          </div>

          {/* Bio Textarea */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center space-x-1.5">
                <FileText className="w-3.5 h-3.5 text-cyan-400" />
                <span>Bio &amp; Recycling Philosophy</span>
              </label>
              <span className="text-[11px] text-slate-500">
                {bio.length} characters (10+ recommended)
              </span>
            </div>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell about yourself, your background, or what motivates you to recycle and protect the planet..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all resize-none"
            />
          </div>

          {/* About Yourself Checkboxes */}
          <div className="space-y-3 pt-2">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center space-x-1.5">
                <Award className="w-4 h-4" />
                <span>Tell About Yourself: Eco Habits &amp; Lifestyle</span>
              </label>
              <p className="text-xs text-slate-400 mt-0.5">
                Check all that describe your habits or interests to personalize your WasteIQ experience:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {ABOUT_CHECKBOX_OPTIONS.map((opt) => {
                const isChecked = selectedCheckboxes.includes(opt.id);
                return (
                  <label
                    key={opt.id}
                    onClick={() => toggleCheckbox(opt.id)}
                    className={`cursor-pointer rounded-xl p-3 border text-xs sm:text-sm flex items-start space-x-3 transition-all select-none ${
                      isChecked
                        ? "bg-emerald-950/40 border-emerald-500/50 text-white shadow-sm shadow-emerald-500/10 ring-1 ring-emerald-500/20"
                        : "bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900/80"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}} // handled by parent label click
                      className="mt-0.5 rounded border-slate-700 text-emerald-500 focus:ring-emerald-500 bg-slate-900 w-4 h-4 cursor-pointer"
                    />
                    <div className="space-y-0.5 leading-tight flex-1">
                      <div className="flex items-center space-x-1.5">
                        <span>{opt.emoji}</span>
                        <span className="font-medium text-slate-200">
                          {opt.label}
                        </span>
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Success banner */}
          {saveSuccess && (
            <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-sm flex items-center space-x-2 animate-fadeIn">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
              <span>
                Profile updated successfully! Completeness is now{" "}
                <strong>{liveStats.percentage}%</strong>.
              </span>
            </div>
          )}

          {/* Modal Footer Actions */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>Saving Changes...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Profile ({liveStats.percentage}%)</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
