import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Recycle, Chrome, Lock, CheckCircle2, ArrowRight, Zap, Sparkles, BookOpen, Trash2 } from "lucide-react";

export default function Home() {
  return (
    <div className="relative overflow-hidden py-12 sm:py-20 lg:py-28 space-y-20">
      {/* Decorative floating orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-24 left-[8%] w-72 h-72 rounded-full bg-emerald-500/5 blur-3xl animate-float" />
        <div className="absolute top-40 right-[10%] w-56 h-56 rounded-full bg-cyan-500/8 blur-3xl animate-float-slow" />
        <div className="absolute bottom-40 left-[20%] w-48 h-48 rounded-full bg-blue-500/5 blur-3xl animate-float" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-6 relative">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs sm:text-sm font-semibold">
            <Recycle className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>♻️ EcoSort AI Waste Assistant &amp; Recycling System</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
            AI-Powered Waste <br />
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Classification &amp; Recycling
            </span>
          </h1>

          <p className="text-slate-400 text-lg sm:text-xl leading-relaxed">
            Stop mixing plastic, paper, food waste, e-waste, and hazardous batteries. Upload a photo or select an item to get instant AI classification, confidence score, bin category &amp; step-by-step action guide.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/ecosort"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-8 py-4 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all"
            >
              <Sparkles className="w-5 h-5 text-slate-950" />
              <span>Launch EcoSort AI Scanner</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>

            <SignedOut>
              <Link
                href="/login"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-8 py-4 rounded-xl font-semibold text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 hover:-translate-y-0.5 active:translate-y-0 transition-all"
              >
                <Chrome className="w-5 h-5 text-cyan-400" />
                <span>Continue with Google</span>
              </Link>
            </SignedOut>

            <SignedIn>
              <Link
                href="/dashboard"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-8 py-4 rounded-xl font-semibold text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 hover:-translate-y-0.5 active:translate-y-0 transition-all"
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
            {[
              { emoji: "🟢", label: "Organic", sub: "Food scraps", bg: "bg-emerald-950/30 border-emerald-500/30" },
              { emoji: "🔵", label: "Paper",   sub: "Newspapers",  bg: "bg-sky-950/30 border-sky-500/30" },
              { emoji: "🟡", label: "Plastic", sub: "Bottles & tubs", bg: "bg-amber-950/30 border-amber-500/30" },
              { emoji: "⚙️", label: "Metal",   sub: "Aluminum cans", bg: "bg-blue-950/30 border-blue-500/30" },
              { emoji: "🟣", label: "Glass",   sub: "Jars & bottles", bg: "bg-purple-950/30 border-purple-500/30" },
              { emoji: "🔴", label: "E-Waste", sub: "Phones & cables", bg: "bg-purple-900/40 border-purple-500/40" },
              { emoji: "⚠️", label: "Hazardous", sub: "Batteries & oil", bg: "bg-rose-950/30 border-rose-500/30" },
            ].map((cat) => (
              <div
                key={cat.label}
                className={`p-4 rounded-2xl border text-center space-y-2 hover:-translate-y-1 hover:scale-105 transition-all duration-200 ${cat.bg}`}
              >
                <div className="text-2xl">{cat.emoji}</div>
                <h3 className="font-bold text-white text-xs sm:text-sm">{cat.label}</h3>
                <p className="text-slate-400 text-xs">{cat.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Cards Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <Sparkles className="w-6 h-6" />,
              iconBg: "bg-cyan-500/10 border-cyan-500/20 text-cyan-400",
              title: "1. Live Webcam AI Scanner",
              desc: "Scan items in real time with automated targeting reticle HUD, laser sweep animation, or upload photos for instant AI material classification.",
            },
            {
              icon: <CheckCircle2 className="w-6 h-6" />,
              iconBg: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
              title: "2. Voice Guide & Action Steps",
              desc: "Listen to audible text-to-speech disposal instructions alongside plain-English DOs, DON'Ts, and landfill decomposition lifespan metrics.",
            },
            {
              icon: <BookOpen className="w-6 h-6" />,
              iconBg: "bg-blue-500/10 border-blue-500/20 text-blue-400",
              title: "3. Plastic Resin Codes (#1-7)",
              desc: "Identify plastic numbers ♳ through ♹ with toxicity levels, microwave safety ratings, common household items, and recycling destinations.",
            },
            {
              icon: <Zap className="w-6 h-6" />,
              iconBg: "bg-amber-500/10 border-amber-500/20 text-amber-400",
              title: "4. Gamified Badges & Points",
              desc: "Earn Eco Points, level up your environmental impact rank, unlock 8 sustainability badges, and export your personal scan log as CSV.",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="group p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm space-y-3 hover:-translate-y-1.5 hover:border-slate-700 hover:shadow-xl hover:shadow-black/20 transition-all duration-200"
            >
              <div className={`w-12 h-12 rounded-xl border flex items-center justify-center group-hover:scale-110 transition-transform duration-200 ${card.iconBg}`}>
                {card.icon}
              </div>
              <h3 className="text-base font-bold text-white">{card.title}</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
