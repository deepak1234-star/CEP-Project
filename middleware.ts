import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const secretKey = process.env.CLERK_SECRET_KEY;
const isClerkConfigured =
  Boolean(secretKey &&
  secretKey.startsWith("sk_") &&
  !secretKey.includes("placeholder"));

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

const clerkHandler = isClerkConfigured
  ? clerkMiddleware(async (auth, req) => {
      if (isProtectedRoute(req)) {
        await auth.protect();
      }
    })
  : null;

export default function middleware(req: NextRequest, event: any) {
  if (!isClerkConfigured || !clerkHandler) {
    return NextResponse.next();
  }
  return clerkHandler(req, event);
}

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|json|webmanifest|ttf|woff2?|ico|csv|docx?|xlsx?|zip|svg)).*)",
    "/(api|trpc)(.*)",
  ],
};

