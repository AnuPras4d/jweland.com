import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    const [rows] = await pool.execute(
      'SELECT * FROM adminlogin WHERE username = ? AND password = ?',
      [username, password]
    );

    if (rows.length > 0) {
      const response = NextResponse.json({ success: true });

      // Set secure cookie for session
      response.cookies.set('admin_token', 'secure_token_value', {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24, // 1 day
      });

      return response;
    } else {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('❌ Login Error:', error.message);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}
