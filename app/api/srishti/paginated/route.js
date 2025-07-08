// app/api/srishti/paginated/route.js
import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = 12;
    const offset = (page - 1) * limit;

    const [countRows] = await db.query('SELECT COUNT(*) AS total FROM srishti');
    const total = countRows[0].total;

    const [rows] = await db.query(
      'SELECT * FROM srishti ORDER BY id DESC LIMIT ? OFFSET ?',
      [limit, offset]
    );

    return NextResponse.json({
      items: rows,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error('❌ Srishti Pagination Error:', err);
    return NextResponse.json({ error: 'Failed to load srishti items' }, { status: 500 });
  }
}
