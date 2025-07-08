// app/api/products/paginated/route.js
import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = 12;
    const offset = (page - 1) * limit;

    // Count total products
    const [countRows] = await db.query('SELECT COUNT(*) AS total FROM products');
    const total = countRows[0].total;

    // Get paginated products
    const [rows] = await db.query(
      'SELECT * FROM products ORDER BY id DESC LIMIT ? OFFSET ?',
      [limit, offset]
    );

    return NextResponse.json({
      products: rows,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error('❌ Pagination Error:', err);
    return NextResponse.json({ error: 'Failed to load paginated products' }, { status: 500 });
  }
}
