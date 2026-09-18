import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const publishableKey =
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ||
  "pk_test_YnVzeS1icmVhbS00NTY5LmNsZXJrLmFjY291bnRzLmRldiQ";
const secretKey =
  process.env.CLERK_SECRET_KEY ||
  "sk_test_aGmjaZ9APqPz1GjZ3iTnKH7tyUokqhOX0ROBcB9XKk";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

const clerkHandler = clerkMiddleware(
  async (auth, req) => {
    if (isProtectedRoute(req)) {
      try {
        const { userId } = await auth();
        if (!userId) {
          const loginUrl = new URL("/login", req.url);
          loginUrl.searchParams.set("redirect_url", req.url);
          return NextResponse.redirect(loginUrl);
        }
      } catch (err) {
        console.warn("Clerk auth check error:", err);
      }
    }
    return NextResponse.next();
  },
  {
    publishableKey,
    secretKey,
  }
);

export default async function middleware(req: NextRequest, event: any) {
  try {
    return await clerkHandler(req, event);
  } catch (err) {
    console.error("Clerk middleware error fallback:", err);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|json|webmanifest|ttf|woff2?|ico|csv|docx?|xlsx?|zip|svg)).*)",
    "/(api|trpc)(.*)",
  ],
};

