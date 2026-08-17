// Route guard emitted by configure_auth (write-if-absent: if your app already has a
// middleware.ts, configure_auth does NOT overwrite it - merge this guard logic in manually).
//
// OPTIMISTIC redirect only: getSessionCookie checks cookie PRESENCE, not validity - full
// session validation needs the database (pg), which cannot run in edge middleware. Real
// authorization must stay server-side (auth.api.getSession in your server code).
import { NextResponse, type NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);
  if (!sessionCookie) {
    const signInUrl = new URL("/sign-in", request.url);
    signInUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }
  return NextResponse.next();
}

export const config = {
  // Guard the signed-in area. Extend the matcher when you add more protected sections.
  matcher: ["/dashboard/:path*"],
};
