"use client";

import React, { useState, useEffect } from "react";
import { useUser, UserButton } from "@clerk/nextjs";
import { User } from "lucide-react";

interface SafeAuthProps {
  children: React.ReactNode;
}

export function SafeSignedIn({ children }: SafeAuthProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <ClientSignedInContent>{children}</ClientSignedInContent>;
}

function ClientSignedInContent({ children }: SafeAuthProps) {
  try {
    const { isLoaded, isSignedIn } = useUser();
    if (isLoaded && isSignedIn) {
      return <>{children}</>;
    }
  } catch {
    return null;
  }
  return null;
}

export function SafeSignedOut({ children }: SafeAuthProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // During SSR, render default signed-out view for zero flicker
  if (!mounted) {
    return <>{children}</>;
  }

  return <ClientSignedOutContent>{children}</ClientSignedOutContent>;
}

function ClientSignedOutContent({ children }: SafeAuthProps) {
  try {
    const { isLoaded, isSignedIn } = useUser();
    if (!isLoaded || !isSignedIn) {
      return <>{children}</>;
    }
  } catch {
    return <>{children}</>;
  }
  return null;
}

export function SafeUserButton(props: React.ComponentProps<typeof UserButton>) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  try {
    return (
      <UserButton
        {...props}
        appearance={{
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
    );
  } catch {
    return null;
  }
}
