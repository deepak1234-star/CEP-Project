"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import {
  X,
  Upload,
  Sparkles,
  Check,
  RotateCcw,
  Palette,
  Leaf,
  Camera,
  Image as ImageIcon,
} from "lucide-react";
import {
  ECO_AVATAR_PRESETS,
  GRADIENT_AVATAR_PRESETS,
  AvatarPreset,
  CustomAvatarState,
  saveStoredAvatar,
} from "@/lib/avatars";
import { syncAvatarToCloud } from "@/lib/userSync";

interface AvatarPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  userFullName: string;
  initialClerkAvatar: string;
  currentAvatar: CustomAvatarState | null;
  onAvatarUpdated: (avatar: CustomAvatarState | null) => void;
}

export default function AvatarPickerModal({
  isOpen,
  onClose,
  userId,
  userFullName,
  initialClerkAvatar,
  currentAvatar,
  onAvatarUpdated,
}: AvatarPickerModalProps) {
  const [activeTab, setActiveTab] = useState<"eco" | "gradient" | "upload">("eco");
  const [selectedPresetId, setSelectedPresetId] = useState<string | null>(
    currentAvatar?.presetId || null
  );
  const [uploadedImage, setUploadedImage] = useState<string | null>(
    currentAvatar?.type === "uploaded" ? currentAvatar.uploadedDataUrl || null : null
  );
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const initialLetter = (userFullName.trim()[0] || "U").toUpperCase();

  const handleSelectPreset = (preset: AvatarPreset) => {
    setSelectedPresetId(preset.id);
    const newAvatar: CustomAvatarState = {
      type: preset.category === "eco" ? "preset" : "gradient",
      presetId: preset.id,
      gradientClass: preset.bgGradient,
      emoji: preset.emoji,
      avatarName: preset.name,
    };
    saveStoredAvatar(userId, newAvatar);
    syncAvatarToCloud(newAvatar);
    onAvatarUpdated(newAvatar);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Please select an image smaller than 5MB");
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        // Compress image using canvas
        const img = new window.Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const maxDim = 256;
          let width = img.width;
          let height = img.height;
          if (width > height) {
            if (width > maxDim) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            }
          } else {
            if (height > maxDim) {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.85);

          setUploadedImage(compressedDataUrl);
          const newAvatar: CustomAvatarState = {
            type: "uploaded",
            uploadedDataUrl: compressedDataUrl,
            avatarName: "Uploaded Photo",
          };
          saveStoredAvatar(userId, newAvatar);
          syncAvatarToCloud(newAvatar);
          onAvatarUpdated(newAvatar);
          setIsUploading(false);
        };
        img.src = dataUrl;
      }
    };
    reader.readAsDataURL(file);
  };

  const handleResetToDefault = () => {
    saveStoredAvatar(userId, null);
    syncAvatarToCloud(null);
    setSelectedPresetId(null);
    setUploadedImage(null);
    onAvatarUpdated(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in-up">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 text-slate-950 shadow-md">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white leading-tight">Choose Profile Picture</h2>
              <p className="text-xs text-slate-400">
                Personalize your avatar for EcoSort AI
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-800 bg-slate-950/50 p-2 gap-1 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab("eco")}
            className={`flex-1 min-w-[120px] flex items-center justify-center space-x-2 py-2 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === "eco"
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-sm"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
            }`}
          >
            <Leaf className="w-4 h-4" />
            <span>Eco Avatars</span>
          </button>
          <button
            onClick={() => setActiveTab("gradient")}
            className={`flex-1 min-w-[120px] flex items-center justify-center space-x-2 py-2 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === "gradient"
                ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 shadow-sm"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>Vibrant Gradients</span>
          </button>
          <button
            onClick={() => setActiveTab("upload")}
            className={`flex-1 min-w-[120px] flex items-center justify-center space-x-2 py-2 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === "upload"
                ? "bg-blue-500/20 text-blue-400 border border-blue-500/30 shadow-sm"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Upload Photo</span>
          </button>
        </div>

        {/* Tab Body Contents */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          {/* Tab 1: Eco Avatars */}
          {activeTab === "eco" && (
            <div className="space-y-3">
              <p className="text-xs text-slate-400">
                Pick a nature-inspired eco character to represent your green journey:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {ECO_AVATAR_PRESETS.map((preset) => {
                  const isSelected = selectedPresetId === preset.id;
                  return (
                    <button
                      key={preset.id}
                      onClick={() => handleSelectPreset(preset)}
                      className={`group relative p-3 rounded-2xl border text-left transition-all flex flex-col items-center sm:items-start gap-2.5 ${
                        isSelected
                          ? "bg-emerald-950/40 border-emerald-500 ring-2 ring-emerald-500/40 shadow-lg shadow-emerald-500/10"
                          : "bg-slate-800/60 border-slate-700/80 hover:bg-slate-800 hover:border-slate-600"
                      }`}
                    >
                      <div
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${preset.bgGradient} flex items-center justify-center text-2xl shadow-md group-hover:scale-105 transition-transform flex-shrink-0`}
                      >
                        {preset.emoji}
                      </div>
                      <div className="w-full text-center sm:text-left">
                        <div className="font-bold text-xs sm:text-sm text-white truncate flex items-center justify-between">
                          <span>{preset.name}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />}
                        </div>
                        <p className="text-[10px] text-slate-400 line-clamp-1">
                          {preset.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tab 2: Vibrant Gradients */}
          {activeTab === "gradient" && (
            <div className="space-y-3">
              <p className="text-xs text-slate-400">
                Choose a sleek modern gradient featuring your initial ({initialLetter}):
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {GRADIENT_AVATAR_PRESETS.map((preset) => {
                  const isSelected = selectedPresetId === preset.id;
                  return (
                    <button
                      key={preset.id}
                      onClick={() => handleSelectPreset(preset)}
                      className={`group relative p-3 rounded-2xl border text-left transition-all flex flex-col items-center sm:items-start gap-2.5 ${
                        isSelected
                          ? "bg-cyan-950/40 border-cyan-500 ring-2 ring-cyan-500/40 shadow-lg shadow-cyan-500/10"
                          : "bg-slate-800/60 border-slate-700/80 hover:bg-slate-800 hover:border-slate-600"
                      }`}
                    >
                      <div
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${preset.bgGradient} flex items-center justify-center text-white font-black text-xl shadow-md group-hover:scale-105 transition-transform flex-shrink-0 select-none`}
                      >
                        {initialLetter}
                      </div>
                      <div className="w-full text-center sm:text-left">
                        <div className="font-bold text-xs sm:text-sm text-white truncate flex items-center justify-between">
                          <span>{preset.name}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />}
                        </div>
                        <p className="text-[10px] text-slate-400 line-clamp-1">
                          {preset.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tab 3: Upload Custom Photo */}
          {activeTab === "upload" && (
            <div className="space-y-4 text-center py-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />

              {uploadedImage ? (
                <div className="flex flex-col items-center space-y-3">
                  <div className="relative w-28 h-28 rounded-2xl overflow-hidden ring-4 ring-cyan-500/40 shadow-xl bg-slate-800">
                    <img
                      src={uploadedImage}
                      alt="Uploaded avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                    <Check className="w-4 h-4" /> Active Custom Photo
                  </p>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all"
                  >
                    Replace With Another Photo
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="p-8 border-2 border-dashed border-slate-700 hover:border-cyan-500/60 rounded-3xl cursor-pointer hover:bg-slate-800/40 transition-all flex flex-col items-center space-y-3"
                >
                  <div className="p-4 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    <Upload className="w-8 h-8 animate-bounce" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm sm:text-base">
                      Click to upload profile photo
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Supports JPG, PNG, WEBP from your phone or PC (Max 5MB)
                    </p>
                  </div>
                  <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    Browse Device
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 sm:px-6 py-4 border-t border-slate-800 bg-slate-900/95">
          <button
            onClick={handleResetToDefault}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-1.5 text-xs text-slate-400 hover:text-rose-400 transition-colors px-3 py-2 rounded-xl hover:bg-slate-800"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Google Account Default</span>
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-md shadow-cyan-500/20 transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
