// middleware.js
import { NextResponse } from 'next/server';

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // Allow access to login page
  if (pathname === '/jewe-adm/login') {
    return NextResponse.next();
  }

  // Protect all /admin routes
  if (pathname.startsWith('/jewe-adm')) {
    const token = req.cookies.get('admin_token')?.value;

    if (!token) {
      const loginUrl = new URL('/jewe-adm/login', req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/jewe-adm/:path*'],
};
