import Link from "next/link";
import { SafeSignedIn, SafeSignedOut } from "@/components/SafeAuth";
import CustomUserButton from "@/components/CustomUserButton";
import { ShieldCheck, LogIn, UserPlus, LayoutDashboard, Home, Sparkles } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo with Home Icon (Replacing Recycle Icon) */}
        <Link href="/" className="flex items-center space-x-2.5 sm:space-x-3 group flex-shrink-0" title="Go to Home">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-200">
            <Home className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-white" />
          </div>
          <span className="font-bold text-lg sm:text-xl tracking-tight text-white group-hover:text-cyan-400 transition-colors">
            EcoSort<span className="text-emerald-400">AI</span>
          </span>
        </Link>

        <nav className="flex items-center space-x-1.5 sm:space-x-3">
          {/* EcoSort AI button: Hidden on mobile screens to keep the header uncluttered */}
          <Link
            href="/ecosort"
            className="hidden md:inline-flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 hover:bg-emerald-900/50 transition-all shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>EcoSort AI</span>
          </Link>

          <SafeSignedIn>
            <Link
              href="/dashboard"
              className="inline-flex items-center space-x-1.5 sm:space-x-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium text-slate-200 hover:text-white bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all shadow-sm"
            >
              <LayoutDashboard className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" />
              <span className="hidden sm:inline">Dashboard</span>
            </Link>
            <div className="pl-1.5 sm:pl-2 border-l border-white/10 flex items-center">
              <CustomUserButton afterSignOutUrl="/" />
            </div>
          </SafeSignedIn>

          <SafeSignedOut>
            <Link
              href="/login"
              className="inline-flex items-center space-x-1 sm:space-x-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all"
            >
              <LogIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Sign In</span>
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center space-x-1 sm:space-x-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition-all shadow-md shadow-cyan-500/25 whitespace-nowrap"
            >
              <UserPlus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Get Started</span>
            </Link>
          </SafeSignedOut>
        </nav>
      </div>
    </header>
  );
}
