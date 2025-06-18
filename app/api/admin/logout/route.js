import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true });

  // Clear the secure cookie
  response.cookies.set('admin_token', '', {
    httpOnly: true,
    path: '/',
    maxAge: 0,
  });

  return response;
}
