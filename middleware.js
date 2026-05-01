import { NextResponse } from "next/server";

export function middleware(request) {

  const token = request.cookies.get("token")?.value;

  const pathname = request.nextUrl.pathname;

  const isHome = pathname === "/";
  const isLogin = pathname.startsWith("/login");
  const isRegister = pathname.startsWith("/register");

  // Permitir página inicial sem login
  if (isHome) {
    return NextResponse.next();
  }

  // Se não estiver logado e tentar acessar páginas internas
  if (!token && !isLogin && !isRegister) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Se já estiver logado e tentar acessar login
  if (token && isLogin) {
    return NextResponse.redirect(new URL("/opportunities", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"]
};
