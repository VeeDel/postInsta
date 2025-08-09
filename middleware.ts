import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value; // or use session logic

  // List of protected paths
  const protectedPaths = [
    "/",
    "/bookmarks",
    "/explore",
    "/followers",
    "/messages",
    "/notifications",
    "/posts",
    "/profile",
    "/profiles",
    "/settings",
    "/who-to-follow",
  ];

  const path = req.nextUrl.pathname;

  // Check if current path is protected
  const isProtected = protectedPaths.some((p) => path.startsWith(p));

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/entry", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/bookmarks/:path*",
    "/explore/:path*",
    "/followers/:path*",
    "/messages/:path*",
    "/notifications/:path*",
    "/posts/:path*",
    "/profile/:path*",
    "/profiles/:path*",
    "/settings/:path*",
    "/who-to-follow/:path*",
  ],
};
