"use client";

import React, { useState, useEffect } from "react";
import { useUser, UserButton } from "@clerk/nextjs";

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
    return <UserButton {...props} />;
  } catch {
    return null;
  }
}
