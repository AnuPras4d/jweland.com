import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(req) {
  try {
    const { pathname } = req.nextUrl;

    // ✅ Allow access to admin login page
    if (pathname === '/admin/login') {
      return NextResponse.next();
    }

    // ✅ Match only /admin routes (excluding /admin/login)
    if (pathname.startsWith('/admin')) {
      const token = req.cookies.get('admin_token');

      // ✅ If token not found, redirect to login
      if (!token) {
        const loginUrl = new URL('/admin/login', req.url);
        return NextResponse.redirect(loginUrl);
      }
    }

    // ✅ Allow everything else
    return NextResponse.next();

  } catch (error) {
    console.error('❌ Middleware Error:', error.message);
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }
}

export const config = {
  matcher: ['/admin/:path*'],
};
