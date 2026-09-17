import type { Metadata } from "next";
import ClerkProviderWrapper from "@/components/ClerkProviderWrapper";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "EcoSort AI - Waste Classification & Recycling Assistant",
  description: "AI-Powered waste classification, confidence score, bin category guide & Clerk Google OAuth authentication.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  return (
    <ClerkProviderWrapper publishableKey={publishableKey}>
      <html lang="en" className="dark">
        <body className="bg-slate-950 text-slate-100 min-h-screen flex flex-col bg-grid-pattern antialiased">
          <div className="fixed inset-0 gradient-glow pointer-events-none" />
          <Navbar />
          <main className="flex-1 relative z-10">{children}</main>
          <footer className="border-t border-white/5 py-8 text-center text-slate-500 text-sm relative z-10">
            <div className="max-w-7xl mx-auto px-4">
              <p>© {new Date().getFullYear()} EcoSort AI Application. Built with Next.js App Router, TypeScript & Clerk Authentication.</p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProviderWrapper>
  );
}
