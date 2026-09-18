import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    const { userId } = await auth();
    if (!userId) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("redirect_url", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|json|webmanifest|ttf|woff2?|ico|csv|docx?|xlsx?|zip|svg)).*)",
    "/(api|trpc)(.*)",
  ],
};
