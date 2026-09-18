import type { Metadata } from "next";
import ClerkProviderWrapper from "@/components/ClerkProviderWrapper";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "EcoSort AI - Waste Classification & Recycling Assistant",
  description: "AI-Powered waste classification, confidence score, bin category guide & Clerk Google OAuth authentication.",
  keywords: "waste classification, recycling, AI, EcoSort, sustainability, eco-friendly",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProviderWrapper>
      <html lang="en" className="dark">
        <body className="bg-slate-950 text-slate-100 min-h-screen flex flex-col bg-grid-pattern antialiased">
          <div className="fixed inset-0 gradient-glow pointer-events-none" />
          <Navbar />
          <main className="flex-1 relative z-10">{children}</main>
          <footer className="border-t border-white/5 py-10 text-center text-slate-500 text-sm relative z-10">
            <div className="max-w-7xl mx-auto px-4 space-y-3">
              <div className="flex items-center justify-center space-x-2 text-slate-400">
                <span className="text-emerald-400 font-bold text-base">EcoSort</span>
                <span className="text-cyan-400 font-bold text-base">AI</span>
              </div>
              <p className="text-xs text-slate-500">
                © {new Date().getFullYear()} EcoSort AI — Built with Next.js App Router, TypeScript &amp; Clerk Authentication.
              </p>
              <p className="text-xs text-slate-600">
                ♻️ Classify responsibly. Protect the planet one scan at a time.
              </p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProviderWrapper>
  );
}
