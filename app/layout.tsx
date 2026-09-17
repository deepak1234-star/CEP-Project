import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Production Next.js Auth with Clerk & Google OAuth",
  description: "Secure, persistent Google OAuth authentication powered by Clerk & Next.js App Router.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
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
          socialButtonsBlockButton: "bg-slate-800 border-slate-700 text-white hover:bg-slate-700/80 transition-all text-sm font-medium",
          socialButtonsBlockButtonText: "text-white font-medium",
          formButtonPrimary: "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold transition-all shadow-md shadow-cyan-500/20",
          footerActionLink: "text-cyan-400 hover:text-cyan-300 font-medium",
          formFieldLabel: "text-slate-300 font-medium text-sm",
          formFieldInput: "bg-slate-800/90 border-slate-700 text-white rounded-lg focus:ring-2 focus:ring-cyan-500",
          dividerLine: "bg-slate-800",
          dividerText: "text-slate-500 text-xs uppercase tracking-wider",
        },
      }}
    >
      <html lang="en" className="dark">
        <body className="bg-slate-950 text-slate-100 min-h-screen flex flex-col bg-grid-pattern antialiased">
          <div className="fixed inset-0 gradient-glow pointer-events-none" />
          <Navbar />
          <main className="flex-1 relative z-10">{children}</main>
          <footer className="border-t border-white/5 py-8 text-center text-slate-500 text-sm relative z-10">
            <div className="max-w-7xl mx-auto px-4">
              <p>© {new Date().getFullYear()} AuthGuard Application. Built with Next.js App Router, TypeScript & Clerk Authentication.</p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
