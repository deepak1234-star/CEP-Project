"use client";

import { ClerkProvider } from "@clerk/nextjs";
import React from "react";

interface ClerkProviderWrapperProps {
  children: React.ReactNode;
  publishableKey?: string;
}

export default function ClerkProviderWrapper({
  children,
  publishableKey,
}: ClerkProviderWrapperProps) {
  const key =
    publishableKey ||
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ||
    "pk_test_bW9yYWwtcGFuZ29saW4tODcuY2xlcmsuYWNjb3VudHMuZGV2JA";

  // If valid publishable key is present, wrap with ClerkProvider
  if (key && key.startsWith("pk_")) {
    return (
      <ClerkProvider
        publishableKey={key}
        appearance={{
          variables: {
            colorPrimary: "#0284c7",
            colorBackground: "#0f172a",
            colorText: "#f8fafc",
            colorTextSecondary: "#94a3b8",
            colorInputBackground: "#1e293b",
            colorInputText: "#f8fafc",
          },
          elements: {
            card: "bg-slate-900 border border-slate-800 shadow-2xl rounded-2xl",
            headerTitle: "text-white font-bold text-xl",
            headerSubtitle: "text-slate-400 text-sm",
            socialButtonsBlockButton:
              "bg-slate-800 border-slate-700 text-white hover:bg-slate-700/80 transition-all text-sm font-medium",
            socialButtonsBlockButtonText: "text-white font-medium",
            formButtonPrimary:
              "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold transition-all shadow-md shadow-cyan-500/20",
            footerActionLink: "text-cyan-400 hover:text-cyan-300 font-medium",
            formFieldLabel: "text-slate-300 font-medium text-sm",
            formFieldInput:
              "bg-slate-950 border border-slate-800 text-white rounded-lg focus:ring-2 focus:ring-cyan-500",
            dividerLine: "bg-slate-800",
            dividerText: "text-slate-500 text-xs uppercase tracking-wider",
          },
        }}
      >
        {children}
      </ClerkProvider>
    );
  }

  // Fallback: render children directly so app never crashes
  return <>{children}</>;
}
