import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;

  const adminRoutes = ["/admin"];
  const isAdmin = adminRoutes.some(r => pathname.startsWith(r));

  if (isAdmin && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|api|sitemap.xml|robots.txt|ads.txt).*)"]
};
