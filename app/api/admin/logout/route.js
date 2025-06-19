import { NextResponse } from 'next/server';

export function POST() {
  // ✅ Create a response object
  const response = NextResponse.json({ success: true });

  // ✅ Remove the cookie by setting maxAge to 0
  response.cookies.set('admin_token', '', {
    path: '/',
    maxAge: 0,
    sameSite: 'lax',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  });

  return response;
}
