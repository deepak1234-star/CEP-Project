import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Recycle, Chrome, Lock, CheckCircle2, ArrowRight, Zap, Sparkles, BookOpen, Trash2 } from "lucide-react";

export default function Home() {
  return (
    <div className="relative overflow-hidden py-12 sm:py-20 lg:py-28 space-y-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs sm:text-sm font-semibold">
            <Recycle className="w-4 h-4 text-emerald-400 animate-spin" />
            <span>♻️ EcoSort AI Waste Assistant & Recycling System</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
            AI-Powered Waste <br />
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Classification & Recycling
            </span>
          </h1>

          <p className="text-slate-400 text-lg sm:text-xl leading-relaxed">
            Stop mixing plastic, paper, food waste, e-waste, and hazardous batteries. Upload a photo or select an item to get instant AI classification, confidence score, bin category & step-by-step action guide.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/ecosort"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-8 py-4 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-xl shadow-emerald-500/20 transition-all hover:scale-[1.02]"
            >
              <Sparkles className="w-5 h-5 text-slate-950" />
              <span>Launch EcoSort AI Scanner</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>

            <SignedOut>
              <Link
                href="/login"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-8 py-4 rounded-xl font-semibold text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-all"
              >
                <Chrome className="w-5 h-5 text-cyan-400" />
                <span>Continue with Google</span>
              </Link>
            </SignedOut>

            <SignedIn>
              <Link
                href="/dashboard"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-8 py-4 rounded-xl font-semibold text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-all"
              >
                <span>Go to User Dashboard</span>
              </Link>
            </SignedIn>
          </div>
        </div>

        {/* 7 Waste Categories Showcase */}
        <div className="mt-20 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">7 Waste Classification Categories</h2>
            <p className="text-slate-400 text-sm">Automated identification for every material type</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-center space-y-2">
              <div className="text-2xl">🟢</div>
              <h3 className="font-bold text-white text-xs sm:text-sm">Organic</h3>
              <p className="text-slate-400 text-xs">Food scraps</p>
            </div>
            <div className="p-4 rounded-2xl bg-sky-950/30 border border-sky-500/30 text-center space-y-2">
              <div className="text-2xl">🔵</div>
              <h3 className="font-bold text-white text-xs sm:text-sm">Paper</h3>
              <p className="text-slate-400 text-xs">Newspapers</p>
            </div>
            <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 text-center space-y-2">
              <div className="text-2xl">🟡</div>
              <h3 className="font-bold text-white text-xs sm:text-sm">Plastic</h3>
              <p className="text-slate-400 text-xs">Bottles & tubs</p>
            </div>
            <div className="p-4 rounded-2xl bg-blue-950/30 border border-blue-500/30 text-center space-y-2">
              <div className="text-2xl">⚙️</div>
              <h3 className="font-bold text-white text-xs sm:text-sm">Metal</h3>
              <p className="text-slate-400 text-xs">Aluminum cans</p>
            </div>
            <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/30 text-center space-y-2">
              <div className="text-2xl">🟣</div>
              <h3 className="font-bold text-white text-xs sm:text-sm">Glass</h3>
              <p className="text-slate-400 text-xs">Jars & bottles</p>
            </div>
            <div className="p-4 rounded-2xl bg-purple-900/40 border border-purple-500/40 text-center space-y-2">
              <div className="text-2xl">🔴</div>
              <h3 className="font-bold text-white text-xs sm:text-sm">E-Waste</h3>
              <p className="text-slate-400 text-xs">Phones & cables</p>
            </div>
            <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/30 text-center space-y-2">
              <div className="text-2xl">⚠️</div>
              <h3 className="font-bold text-white text-xs sm:text-sm">Hazardous</h3>
              <p className="text-slate-400 text-xs">Batteries & oil</p>
            </div>
          </div>
        </div>

        {/* Feature Cards Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">1. Image Upload & AI Vision</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Upload photographs of your waste item to receive instant category classification, bin recommendation & AI confidence scores (e.g., 94%).
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">2. "What Should I Do?" Guide</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Get plain-language instructions on what to do (✅ Keep separate, send to authorized e-waste facilities) and what NOT to do (❌ Don't mix with household trash).
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">3. Smart Bin Visual Guide</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Simple visual color-coded guide (GREEN → Organic, BLUE → Dry/Recyclable, SPECIAL → E-Waste, HAZARDOUS → Batteries) designed for schools and households.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
