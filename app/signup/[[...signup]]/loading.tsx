import AuthSkeleton from "@/components/AuthSkeleton";
import { UserPlus } from "lucide-react";
import Link from "next/link";

export default function SignUpLoading() {
  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col justify-center items-center px-4 py-12">
      <div className="w-full max-w-md space-y-6 flex flex-col items-center">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 mb-2">
            <UserPlus className="w-6 h-6 animate-pulse" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Create Your Account
          </h1>
          <p className="text-slate-400 text-sm">
            Sign up using Google OAuth or your email address
          </p>
        </div>

        <AuthSkeleton title="Create Your Account" isSignUp={true} />

        <div className="text-center pt-2">
          <Link href="/" className="text-slate-500 hover:text-slate-400 text-xs transition-colors">
            ← Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
