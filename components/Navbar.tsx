import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ShieldCheck, LogIn, UserPlus, LayoutDashboard, Recycle, Sparkles } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-200">
            <Recycle className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-white group-hover:text-cyan-400 transition-colors">
            EcoSort<span className="text-emerald-400">AI</span>
          </span>
        </Link>

        <nav className="flex items-center space-x-2 sm:space-x-4">
          <Link
            href="/ecosort"
            className="inline-flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 hover:bg-emerald-900/50 transition-all shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>EcoSort AI</span>
          </Link>

          <SignedIn>
            <Link
              href="/dashboard"
              className="inline-flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium text-slate-200 hover:text-white bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all shadow-sm"
            >
              <LayoutDashboard className="w-4 h-4 text-cyan-400" />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>
            <div className="pl-2 border-l border-white/10 flex items-center">
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-9 h-9 ring-2 ring-cyan-500/40 hover:ring-cyan-400 transition-all",
                  },
                }}
              />
            </div>
          </SignedIn>

          <SignedOut>
            <Link
              href="/login"
              className="inline-flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In</span>
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition-all shadow-md shadow-cyan-500/25"
            >
              <UserPlus className="w-4 h-4" />
              <span>Get Started</span>
            </Link>
          </SignedOut>
        </nav>
      </div>
    </header>
  );
}
