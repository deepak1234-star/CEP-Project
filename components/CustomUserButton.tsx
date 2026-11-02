"use client";

import { useState, useEffect } from "react";
import { useUser, UserButton } from "@clerk/nextjs";
import { User } from "lucide-react";
import { getStoredAvatar, CustomAvatarState } from "@/lib/avatars";

type CustomUserButtonProps = React.ComponentProps<typeof UserButton> & {
  sizeClass?: string;
};

export default function CustomUserButton({
  sizeClass = "w-8 h-8 sm:w-9 sm:h-9",
  ...props
}: CustomUserButtonProps) {
  const { user, isLoaded, isSignedIn } = useUser();
  const [customAvatar, setCustomAvatar] = useState<CustomAvatarState | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const userId = user?.id || "user";
    // Check local storage first
    const stored = getStoredAvatar(userId);
    if (stored) {
      setCustomAvatar(stored);
    } else if (user?.unsafeMetadata?.customAvatar) {
      // Fallback to cloud metadata
      setCustomAvatar(user.unsafeMetadata.customAvatar as CustomAvatarState);
    }

    const handler = (e: Event) => {
      const customEvent = e as CustomEvent<CustomAvatarState | null>;
      setCustomAvatar(customEvent.detail);
    };

    window.addEventListener("wasteiq_avatar_changed", handler);
    return () => {
      window.removeEventListener("wasteiq_avatar_changed", handler);
    };
  }, [user]);

  if (!mounted || !isLoaded || !isSignedIn) {
    return null;
  }

  const initialLetter = (
    user?.fullName?.[0] ||
    user?.firstName?.[0] ||
    "U"
  ).toUpperCase();

  const popoverAppearance = {
    elements: {
      userButtonPopoverCard: "bg-slate-900 border border-slate-800 shadow-2xl rounded-2xl",
      userButtonPopoverActionButton: "!text-white hover:!text-cyan-300 hover:!bg-slate-800/80 transition-colors py-2.5 px-3 rounded-xl",
      userButtonPopoverActionButtonText: "!text-white !font-semibold text-sm",
      userButtonPopoverActionButtonIcon: "!text-cyan-400 w-4 h-4",
      userButtonPopoverCustomItemButton: "!text-white hover:!text-cyan-300 hover:!bg-slate-800/80 transition-colors py-2.5 px-3 rounded-xl",
      userButtonPopoverCustomItemButtonText: "!text-white !font-semibold text-sm",
      userButtonPopoverCustomItemButtonIcon: "!text-cyan-400 w-4 h-4",
      userButtonPopoverFooter: "bg-slate-950 border-t border-slate-800 !text-slate-400",
      userPreviewMainIdentifier: "!text-white font-bold text-sm",
      userPreviewSecondaryIdentifier: "!text-slate-400 text-xs",
    },
  };

  // If a custom avatar is active, render it underneath a transparent Clerk UserButton trigger
  if (customAvatar) {
    return (
      <div
        className={`relative ${sizeClass} rounded-xl overflow-hidden ring-2 ring-cyan-500/40 hover:ring-cyan-400 transition-all shadow-md group cursor-pointer flex-shrink-0`}
        title={customAvatar.avatarName || "Your Profile"}
      >
        {/* Custom Visual Layer */}
        {customAvatar.type === "uploaded" && customAvatar.uploadedDataUrl ? (
          <img
            src={customAvatar.uploadedDataUrl}
            alt="Profile Avatar"
            className="w-full h-full object-cover pointer-events-none"
          />
        ) : customAvatar.type === "preset" ? (
          <div
            className={`w-full h-full bg-gradient-to-tr ${
              customAvatar.gradientClass || "from-emerald-500 to-cyan-600"
            } flex items-center justify-center text-sm sm:text-base select-none pointer-events-none`}
          >
            {customAvatar.emoji || "🌱"}
          </div>
        ) : customAvatar.type === "gradient" ? (
          <div
            className={`w-full h-full bg-gradient-to-tr ${
              customAvatar.gradientClass || "from-cyan-500 to-blue-600"
            } flex items-center justify-center text-white font-black text-xs sm:text-sm select-none pointer-events-none`}
          >
            {initialLetter}
          </div>
        ) : null}

        {/* Transparent Clerk UserButton overlay so clicking opens Clerk account menu */}
        <div className="absolute inset-0 opacity-0 z-10 w-full h-full cursor-pointer flex items-center justify-center [&_.cl-userButtonTrigger]:w-full [&_.cl-userButtonTrigger]:h-full [&_.cl-userButtonAvatarBox]:w-full [&_.cl-userButtonAvatarBox]:h-full">
          <UserButton
            {...props}
            appearance={{
              ...popoverAppearance,
              elements: {
                ...popoverAppearance.elements,
                rootBox: "w-full h-full",
                userButtonTrigger: "w-full h-full p-0 m-0",
                avatarBox: "w-full h-full rounded-none",
              },
            }}
          >
            <UserButton.MenuItems>
              <UserButton.Link
                label="Visit Profile"
                href="/dashboard"
                labelIcon={<User className="w-4 h-4 text-cyan-400" />}
              />
              <UserButton.Action label="manageAccount" />
              <UserButton.Action label="signOut" />
            </UserButton.MenuItems>
          </UserButton>
        </div>
      </div>
    );
  }

  // Default Clerk UserButton
  return (
    <div className={`relative ${sizeClass} flex-shrink-0 flex items-center justify-center`}>
      <UserButton
        {...props}
        appearance={{
          ...popoverAppearance,
          elements: {
            ...popoverAppearance.elements,
            avatarBox: `${sizeClass} ring-2 ring-cyan-500/40 hover:ring-cyan-400 transition-all`,
          },
        }}
      >
        <UserButton.MenuItems>
          <UserButton.Link
            label="Visit Profile"
            href="/dashboard"
            labelIcon={<User className="w-4 h-4 text-cyan-400" />}
          />
          <UserButton.Action label="manageAccount" />
          <UserButton.Action label="signOut" />
        </UserButton.MenuItems>
      </UserButton>
    </div>
  );
}
